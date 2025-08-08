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
  room: string;
  color: string;
}

export interface RecentActivityItem {
  user: string;
  action: string;
  item: string;
  time: string;
  avatar: string;
}

export interface PerformanceData {
  classAverage: string;
  highestScore: string;
  lowestScore: string;
  participation: string;
}

export type ResourceType = 'pdf' | 'excel' | 'video';

export interface ResourceItem {
  name: string;
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

