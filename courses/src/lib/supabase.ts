import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const ADMIN_CREDENTIALS = {
  userId: 'stemspherecontent',
  key: '445566778899'
};

export const authService = {
  login: (userId: string, key: string): boolean => {
    return userId === ADMIN_CREDENTIALS.userId && key === ADMIN_CREDENTIALS.key;
  },

  isAuthenticated: (): boolean => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  },

  setAuthenticated: (value: boolean): void => {
    if (value) {
      sessionStorage.setItem('admin_authenticated', 'true');
    } else {
      sessionStorage.removeItem('admin_authenticated');
    }
  },

  logout: (): void => {
    sessionStorage.removeItem('admin_authenticated');
  }
};

export type Lesson = {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string;
  content: string;
  author: string;
  author_role: string;
  published_date: string;
  read_time: number;
  category: string;
  image_url: string | null;
  created_at: string;
  day_number: number;
  programming_language: string;
  code_blocks: string | null;
};

export type BlogPost = Lesson;
