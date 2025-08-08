import type { LucideIcon } from 'lucide-react';

export interface FeaturedCourse {
  id: number;
  title: string;
  instructor: string;
  duration: string;
  students: string;
  rating: number;
  price: string;
  image: string;
}

export interface HomeStat {
  icon: LucideIcon;
  number: string;
  label: string;
}

export interface CategoryItem {
  icon: LucideIcon;
  title: string;
  description: string;
  courses: string;
  color: string;
}

