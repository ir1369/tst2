import type { LucideIcon } from 'lucide-react';

export interface StatItem {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  color: string;
}

export interface UpcomingClassItem {
  day: string;
  date: string;
  title: string;
  time: string;
  instructor: string;
  color: string;
}

export type ActivityStatus = 'completed' | 'watched' | 'quiz' | 'certificate';

export interface RecentActivityItem {
  action: string;
  item: string;
  course: string;
  time: string;
  status: ActivityStatus;
  icon: LucideIcon;
}

export interface CourseProgressItem {
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  color: string;
}

export type ResourceType = 'pdf' | 'doc' | 'video';

export interface BookmarkedResourceItem {
  name: string;
  course: string;
  size: string;
  addedTime: string;
  type: ResourceType;
}

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  badge?: string;
}

