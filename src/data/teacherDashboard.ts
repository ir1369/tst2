import { 
  Users,
  BookOpen,
  TrendingUp,
  FileText,
  BarChart3,
  Settings,
  Activity
} from 'lucide-react';
import type {
  StatItem,
  UpcomingClassItem,
  RecentActivityItem,
  PerformanceData,
  ResourceItem,
  MenuItem
} from '@/types/teacherDashboard';

export const stats: StatItem[] = [
  {
    title: 'دانشجویان فعال',
    value: '248',
    change: '+12% از ماه گذشته',
    changeType: 'positive',
    icon: Users,
    color: 'bg-blue-500'
  },
  {
    title: 'دوره‌های فعال',
    value: '12',
    change: '3 دوره جدید این ترم',
    changeType: 'positive',
    icon: BookOpen,
    color: 'bg-emerald-500'
  },
  {
    title: 'میانگین مشارکت',
    value: '87%',
    change: '+5% از هفته گذشته',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-purple-500'
  },
  {
    title: 'منابع آموزشی',
    value: '156',
    change: '8 مورد جدید اضافه شده',
    changeType: 'positive',
    icon: FileText,
    color: 'bg-orange-500'
  }
];

export const upcomingClasses: UpcomingClassItem[] = [
  {
    day: 'دوشنبه',
    date: '24',
    title: 'فیزیک 101: مقدمه‌ای بر مکانیک',
    time: '9:00 صبح - 10:30 صبح',
    room: 'کلاس 203',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    day: 'سه‌شنبه',
    date: '25',
    title: 'شیمی: ترکیبات آلی',
    time: '11:00 صبح - 12:30 ظهر',
    room: 'کلاس 105',
    color: 'bg-green-100 text-green-600'
  },
  {
    day: 'چهارشنبه',
    date: '26',
    title: 'زیست‌شناسی: ساختار و عملکرد سلول',
    time: '2:00 ظهر - 3:30 ظهر',
    room: 'کلاس 302',
    color: 'bg-purple-100 text-purple-600'
  }
];

export const recentActivities: RecentActivityItem[] = [
  {
    user: 'امیر احمدی',
    action: 'تکلیف ارسال کرد',
    item: 'گزارش آزمایش فیزیک',
    time: '10 دقیقه پیش',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
  },
  {
    user: 'سارا کریمی',
    action: 'سوال پرسید در',
    item: 'شیمی 102',
    time: '45 دقیقه پیش',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
  },
  {
    user: 'علی رضایی',
    action: 'ویدیو مشاهده کرد',
    item: 'مقدمه‌ای بر ژنتیک',
    time: '2 ساعت پیش',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
  },
  {
    user: 'شما',
    action: 'کوییز جدید منتشر کردید',
    item: 'کوییز زیست‌شناسی 101',
    time: '3 ساعت پیش',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
  }
];

export const performanceData: PerformanceData = {
  classAverage: '82%',
  highestScore: '98%',
  lowestScore: '65%',
  participation: '94%'
};

export const resources: ResourceItem[] = [
  {
    name: 'کتاب درسی فیزیک.pdf',
    size: '12.5 مگابایت',
    addedTime: 'دیروز اضافه شده',
    type: 'pdf'
  },
  {
    name: 'نمودار مفاهیم شیمی.xlsx',
    size: '2.1 مگابایت',
    addedTime: '2 روز پیش اضافه شده',
    type: 'excel'
  },
  {
    name: 'ویدیو آزمایش زیست.mp4',
    size: '45.8 مگابایت',
    addedTime: 'هفته گذشته اضافه شده',
    type: 'video'
  }
];

export const menuItems: MenuItem[] = [
  { icon: BarChart3, label: 'داشبورد', active: true },
  { icon: BookOpen, label: 'نمای کلی دوره‌ها' },
  { icon: Users, label: 'تعامل با دانشجویان', badge: '3' },
  { icon: Activity, label: 'معیارهای عملکرد' },
  { icon: FileText, label: 'کتابخانه منابع' },
  { icon: Settings, label: 'تنظیمات' }
];

