import axios from "axios";
import { API_BASE_URL } from "./constants";
import type {
  Education,
  LegalJourneyEntry,
  Achievement,
  Article,
  GalleryImage,
  ContactMessage,
  SiteSettings,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to all requests automatically
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ===== PUBLIC API =====
export const publicApi = {
  // Site Settings
  getSettings: () => api.get<ApiResponse<SiteSettings>>("/settings"),

  // Education
  getEducation: () => api.get<ApiResponse<Education[]>>("/education"),

  // Legal Journey
  getLegalJourney: () => api.get<ApiResponse<LegalJourneyEntry[]>>("/legal-journey"),

  // Achievements
  getAchievements: (category?: string) =>
    api.get<ApiResponse<Achievement[]>>("/achievements", {
      params: category ? { category } : {},
    }),

  // Articles (Published only)
  getArticles: (page = 1, perPage = 10) =>
    api.get<PaginatedResponse<Article>>("/articles", {
      params: { page, per_page: perPage },
    }),

  getArticleBySlug: (slug: string) =>
    api.get<ApiResponse<Article>>(`/articles/${slug}`),

  // Gallery
  getGallery: (category?: string) =>
    api.get<ApiResponse<GalleryImage[]>>("/gallery", {
      params: category ? { category } : {},
    }),

  // Contact
  sendMessage: (data: Omit<ContactMessage, "id" | "is_read" | "created_at">) =>
    api.post<ApiResponse<ContactMessage>>("/contact", data),
};

// ===== ADMIN API =====
export const adminApi = {
  // Auth
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ token: string }>>("/admin/login", { email, password }),

  // Education CRUD
  createEducation: (data: Partial<Education>) =>
    api.post<ApiResponse<Education>>("/admin/education", data),

  updateEducation: (id: string, data: Partial<Education>) =>
    api.put<ApiResponse<Education>>(`/admin/education/${id}`, data),

  deleteEducation: (id: string) =>
    api.delete<ApiResponse<null>>(`/admin/education/${id}`),

  // Legal Journey CRUD
  createJourneyEntry: (data: Partial<LegalJourneyEntry>) =>
    api.post<ApiResponse<LegalJourneyEntry>>("/admin/legal-journey", data),

  updateJourneyEntry: (id: string, data: Partial<LegalJourneyEntry>) =>
    api.put<ApiResponse<LegalJourneyEntry>>(`/admin/legal-journey/${id}`, data),

  deleteJourneyEntry: (id: string) =>
    api.delete<ApiResponse<null>>(`/admin/legal-journey/${id}`),

  // Achievements CRUD
  createAchievement: (data: Partial<Achievement>) =>
    api.post<ApiResponse<Achievement>>("/admin/achievements", data),

  updateAchievement: (id: string, data: Partial<Achievement>) =>
    api.put<ApiResponse<Achievement>>(`/admin/achievements/${id}`, data),

  deleteAchievement: (id: string) =>
    api.delete<ApiResponse<null>>(`/admin/achievements/${id}`),

  // Articles CRUD (Fetches all articles including drafts)
  getArticles: (page = 1, perPage = 50) =>
    api.get<ApiResponse<Article[]>>("/admin/articles/all"),

  createArticle: (data: Partial<Article>) =>
    api.post<ApiResponse<Article>>("/admin/articles", data),

  updateArticle: (id: string, data: Partial<Article>) =>
    api.put<ApiResponse<Article>>(`/admin/articles/${id}`, data),

  deleteArticle: (id: string) =>
    api.delete<ApiResponse<null>>(`/admin/articles/${id}`),

  // Gallery CRUD
  addGalleryImage: (data: Partial<GalleryImage>) =>
    api.post<ApiResponse<GalleryImage>>("/admin/gallery", data),

  deleteGalleryImage: (id: string) =>
    api.delete<ApiResponse<null>>(`/admin/gallery/${id}`),

  // Messages
  getMessages: (page = 1) =>
    api.get<PaginatedResponse<ContactMessage>>("/admin/messages", {
      params: { page },
    }),

  markMessageRead: (id: string) =>
    api.patch<ApiResponse<null>>(`/admin/messages/${id}/read`),

  // Settings
  updateSettings: (data: Partial<SiteSettings>) =>
    api.put<ApiResponse<SiteSettings>>("/admin/settings", data),

  // Image Upload to Cloudinary
  uploadImage: (file: File, folder: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    return api.post<ApiResponse<{ url: string; thumbnail_url: string }>>(
      "/admin/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  },
};

export default api;