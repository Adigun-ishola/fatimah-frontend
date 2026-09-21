export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_year: number;
  end_year: number | null;
  is_current: boolean;
  description: string;
  achievements: string[];
  certificate_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface LegalJourneyEntry {
  id: string;
  title: string;
  organization: string;
  role: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  highlights: string[];
  category: 'moot_court' | 'internship' | 'clinic' | 'competition' | 'volunteer' | 'other';
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date_received: string;
  description: string;
  category: 'leadership' | 'academic' | 'award' | 'certificate' | 'community';
  certificate_url: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  read_time_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  thumbnail_url: string;
  category: string;
  event_date: string | null;
  order_index: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  about_text: string;
  about_image_url: string;
  email: string;
  phone: string;
  linkedin_url: string;
  twitter_url: string;
  instagram_url: string;
  resume_url: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}