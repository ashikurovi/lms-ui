"use client";

import { apiFetch, ApiResponse } from "./apiClient";

import { CouponItem } from "@/types/dashboard";

export interface PaginatedCoupons {
  items: CouponItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ValidateCouponPayload {
  code: string;
  courseId?: string;
  batchId?: string;
}

export interface ValidatedCouponData {
  id?: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number | string;
  discount_amount?: number;
  [key: string]: any;
}

export const couponsApi = {
  async getAllCoupons(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedCoupons | CouponItem[]>> {
    const sp = new URLSearchParams();
    if (params?.page) sp.set("page", params.page.toString());
    if (params?.limit) sp.set("limit", params.limit.toString());
    if (params?.search) sp.set("search", params.search);
    const qs = sp.toString();
    return apiFetch<PaginatedCoupons | CouponItem[]>(`/coupons${qs ? `?${qs}` : ""}`);
  },

  async getCouponById(id: string): Promise<ApiResponse<CouponItem>> {
    return apiFetch<CouponItem>(`/coupons/${id}`);
  },

  async validateCoupon(payload: ValidateCouponPayload): Promise<ApiResponse<ValidatedCouponData>> {
    return apiFetch<ValidatedCouponData>("/coupons/validate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async createCoupon(payload: Partial<CouponItem>): Promise<ApiResponse<CouponItem>> {
    return apiFetch<CouponItem>("/coupons", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateCoupon(id: string, payload: Partial<CouponItem>): Promise<ApiResponse<CouponItem>> {
    return apiFetch<CouponItem>(`/coupons/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  async deleteCoupon(id: string): Promise<ApiResponse<{ id: string }>> {
    return apiFetch<{ id: string }>(`/coupons/${id}`, {
      method: "DELETE",
    });
  },
};
