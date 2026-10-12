"use client";

import { apiFetch, ApiResponse } from "./apiClient";

export interface UploadResponseData {
  url: string;
  filename: string;
}

// ImgBB API Key from environment or default
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "";

export const uploadApi = {
  async uploadFile(file: File): Promise<ApiResponse<UploadResponseData>> {
    // 1. If ImgBB API Key is provided, upload directly to ImgBB
    if (IMGBB_API_KEY) {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: "POST",
          body: formData,
        });

        const json = await res.json();
        if (json && json.success && json.data?.url) {
          return {
            statusCode: 200,
            data: {
              url: json.data.url,
              filename: file.name,
            },
          };
        } else {
          console.error("ImgBB upload failed, trying backend fallback:", json);
        }
      } catch (err) {
        console.error("ImgBB network error, falling back to backend:", err);
      }
    }

    // 2. Fallback to backend /upload
    const formData = new FormData();
    formData.append("file", file);

    const res = await apiFetch<UploadResponseData>("/upload", {
      method: "POST",
      body: formData,
    });

    if (res.statusCode === 201) {
      res.statusCode = 200;
    }

    return res;
  },
};
