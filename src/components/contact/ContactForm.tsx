"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { contactApi } from "@/services/api/contactApi";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.create(formData);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }, 4000);
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-[#002b5b] tracking-tight">
          Send a Message
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Fill out the form below and we will get back to you as soon as possible.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center space-y-2 animate-in fade-in duration-300">
          <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-bold text-emerald-700">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span>Thank you! Your message has been sent.</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-600">Our support team will get in touch with you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Tanvir Hossain"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase">Email Address *</label>
              <input
                type="email"
                required
                placeholder="e.g. tanvir@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
              />
            </div>
          </div>

          {/* Row 2: Phone */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase">Phone Number *</label>
            <input
              type="tel"
              required
              placeholder="e.g. 01712345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all"
            />
          </div>

          {/* Row 3: Message Textarea */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 uppercase">Message *</label>
            <textarea
              rows={5}
              required
              placeholder="Write your message or inquiry here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0077b6] transition-all resize-y"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0077b6] to-[#002b5b] hover:from-[#005a8c] hover:to-[#001f42] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Message</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
