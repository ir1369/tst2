import type { LucideIcon } from 'lucide-react';

export interface Category {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  courses: number;
  students: string;
  level: string;
  color: string;
  bgColor: string;
  textColor: string;
  subcategories: string[];
  avgRating: number;
  image: string;
}

export type ViewMode = 'grid' | 'list';

export interface LevelOption {
  value: 'all' | 'beginner' | 'intermediate' | 'advanced';
  label: string;
}

