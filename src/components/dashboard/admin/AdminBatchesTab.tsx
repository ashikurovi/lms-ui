"use client";

import React, { useState, useEffect } from "react";
import { Layers, Plus, BookOpen, Search, Edit, Eye, Trash2, Users } from "lucide-react";
import AdminAddBatchView from "./AdminAddBatchView";
import AdminBatchDetails from "./AdminBatchDetails";
import AdminEditBatchModal from "./AdminEditBatchModal";
import AdminDeleteConfirmModal from "./AdminDeleteConfirmModal";
import AdminAlertModal, { AlertModalType } from "./AdminAlertModal";
import { batchesApi, BatchItem, CreateBatchPayload } from "@/services/api/batchesApi";

export default function AdminBatchesTab() {
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [isAddingBatch, setIsAddingBatch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingBatch, setEditingBatch] = useState<BatchItem | null>(null);
  const [deletingBatch, setDeletingBatch] = useState<BatchItem | null>(null);

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    type: AlertModalType;
    title: string;
    message: string;
    statusCode?: number | string;
    confirmText?: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const res = await batchesApi.getAllBatches({ limit: 100, search });
      if (res.statusCode === 200 && res.data?.items) {
        setBatches(res.data.items);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, [search]);

  const handleCreateBatch = (newBatch: CreateBatchPayload) => {
    fetchBatches();
    setIsAddingBatch(false);
  };

  const handleUpdateBatch = async (id: string, payload: Partial<CreateBatchPayload>) => {
    try {
      const res = await batchesApi.updateBatch(id, payload);
      if (res.statusCode >= 400) {
        throw new Error(res.message || res.error || "Failed to update batch");
      }
      fetchBatches();
      setAlertModal({
        isOpen: true,
        type: "success",
        statusCode: res.statusCode || 200,
        title: "Batch Updated Successfully",
        message: `Batch details have been saved. Code: ${res.data?.code || payload.code || "Updated"}`,
        confirmText: "OK",
        onConfirm: () => setAlertModal((p) => ({ ...p, isOpen: false })),
      });
    } catch (err: any) {
      setAlertModal({
        isOpen: true,
        type: "error",
        statusCode: 400,
        title: "Update Failed",
        message: err?.message || "Could not update batch.",
        confirmText: "Dismiss",
        onConfirm: () => setAlertModal((p) => ({ ...p, isOpen: false })),
      });
      throw err;
    }
  };

  const handleDeleteBatchConfirm = async () => {
    if (!deletingBatch) return;
    try {
      const res = await batchesApi.deleteBatch(deletingBatch.id);
      fetchBatches();
      if (selectedBatchId === deletingBatch.id) {
        setSelectedBatchId(null);
      }
      const deletedName = deletingBatch.name;
      const deletedCode = deletingBatch.code;
      setDeletingBatch(null);
      setAlertModal({
        isOpen: true,
        type: "success",
        statusCode: res.statusCode || 200,
        title: "Batch Deleted Successfully",
        message: `Batch "${deletedName}" (${deletedCode}) has been removed.`,
        confirmText: "OK",
        onConfirm: () => setAlertModal((p) => ({ ...p, isOpen: false })),
      });
    } catch (err: any) {
      setAlertModal({
        isOpen: true,
        type: "error",
        statusCode: 500,
        title: "Delete Failed",
        message: err?.message || "An error occurred while deleting the batch.",
        confirmText: "Dismiss",
        onConfirm: () => setAlertModal((p) => ({ ...p, isOpen: false })),
      });
    }
  };

  if (selectedBatchId) {
    return (
      <>
        <AdminBatchDetails 
          batchId={selectedBatchId} 
          onBack={() => setSelectedBatchId(null)} 
          onEdit={(b) => setEditingBatch(b)}
          onDelete={(b) => setDeletingBatch(b)}
        />
        <AdminEditBatchModal
          isOpen={!!editingBatch}
          batch={editingBatch}
          onClose={() => setEditingBatch(null)}
          onUpdate={handleUpdateBatch}
        />
        <AdminDeleteConfirmModal
          isOpen={!!deletingBatch}
          title="Delete Batch"
          itemName={deletingBatch ? `${deletingBatch.name} (${deletingBatch.code})` : undefined}
          message="Are you sure you want to delete this batch? All enrollments and class records will be affected."
          onClose={() => setDeletingBatch(null)}
          onConfirm={handleDeleteBatchConfirm}
        />
        <AdminAlertModal
          isOpen={alertModal.isOpen}
          type={alertModal.type}
          title={alertModal.title}
          message={alertModal.message}
          statusCode={alertModal.statusCode}
          confirmText={alertModal.confirmText}
          onClose={() => setAlertModal((p) => ({ ...p, isOpen: false }))}
          onConfirm={alertModal.onConfirm}
        />
      </>
    );
  }

  if (isAddingBatch) {
    return <AdminAddBatchView onBack={() => setIsAddingBatch(false)} onAdd={handleCreateBatch} />;
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-7 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-[#0077b6]" />
            <span>Course Batch & Intake Manager</span>
          </h3>
          <p className="text-sm text-slate-500 mt-1">Manage all intakes, active students, and schedules.</p>
        </div>
        <button onClick={() => setIsAddingBatch(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#002b5b] to-[#0077b6] hover:from-[#001830] hover:to-[#005a8c] text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 shrink-0">
          <Plus className="w-4 h-4 text-sky-300" />
          <span>Launch New Batch</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search batches by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0077b6] focus:outline-none font-medium bg-slate-50 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Info</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stats</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">Loading batches...</td>
              </tr>
            ) : batches.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">No batches found. Create one to get started!</td>
              </tr>
            ) : (
              batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{batch.name}</div>
                    <div className="text-xs text-slate-500 font-semibold mt-0.5">{batch.code} • {batch.mode} • {batch.class_type}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-sky-500" />
                      {batch.course?.title || "Unknown Course"}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm font-bold text-slate-700">{batch.enrolled_count || 0} / {batch.capacity || 0}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                      batch.status === 'upcoming' ? 'bg-sky-100 text-sky-700' :
                      batch.status === 'ongoing' ? 'bg-emerald-100 text-emerald-700' :
                      batch.status === 'completed' ? 'bg-purple-100 text-purple-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {batch.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedBatchId(batch.id)} className="p-2 text-slate-400 hover:text-[#0077b6] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditingBatch(batch)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer" title="Edit Batch">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => setDeletingBatch(batch)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer" title="Delete Batch">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminEditBatchModal
        isOpen={!!editingBatch}
        batch={editingBatch}
        onClose={() => setEditingBatch(null)}
        onUpdate={handleUpdateBatch}
      />

      <AdminDeleteConfirmModal
        isOpen={!!deletingBatch}
        title="Delete Batch"
        itemName={deletingBatch ? `${deletingBatch.name} (${deletingBatch.code})` : undefined}
        message="Are you sure you want to delete this batch? All enrollments and class records will be affected."
        onClose={() => setDeletingBatch(null)}
        onConfirm={handleDeleteBatchConfirm}
      />

      <AdminAlertModal
        isOpen={alertModal.isOpen}
        type={alertModal.type}
        title={alertModal.title}
        message={alertModal.message}
        statusCode={alertModal.statusCode}
        confirmText={alertModal.confirmText}
        onClose={() => setAlertModal((p) => ({ ...p, isOpen: false }))}
        onConfirm={alertModal.onConfirm}
      />
    </div>
  );
}
