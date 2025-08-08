import type { LucideIcon } from 'lucide-react';

export interface CategorySummary {
  id: number;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  textColor: string;
  totalCourses: number;
  totalStudents: string;
  image: string;
}

export interface CourseItem {
  id: number;
  title: string;
  instructor: string;
  description: string;
  price: string;
  originalPrice: string;
  duration: string;
  students: string;
  rating: number;
  reviews: number;
  level: string;
  image: string;
  tags: string[];
  bestseller: boolean;
  updated: string;
}

export type ViewMode = 'grid' | 'list';

export interface Option<T extends string> {
  value: T;
  label: string;
}

export type LevelValue = 'all' | 'beginner' | 'intermediate' | 'advanced';
export type PriceValue = 'all' | 'free' | 'under2m' | '2m-3m' | 'over3m';
export type RatingValue = 'all' | '4+' | '4.5+';
export type SortValue = 'popular' | 'rating' | 'price-low' | 'price-high' | 'newest';



