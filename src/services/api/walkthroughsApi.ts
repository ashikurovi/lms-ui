import { apiFetch } from "./apiClient";

export interface WalkthroughItem {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const walkthroughsApi = {
  getAllWalkthroughs: async () => {
    return apiFetch<WalkthroughItem[]>("/walkthroughs");
  },

  getWalkthroughById: async (id: string) => {
    return apiFetch<WalkthroughItem>(`/walkthroughs/${id}`);
  },

  createWalkthrough: async (data: Partial<WalkthroughItem>) => {
    return apiFetch<WalkthroughItem>("/walkthroughs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateWalkthrough: async (id: string, data: Partial<WalkthroughItem>) => {
    return apiFetch<WalkthroughItem>(`/walkthroughs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deleteWalkthrough: async (id: string) => {
    return apiFetch<void>(`/walkthroughs/${id}`, {
      method: "DELETE",
    });
  },
};

