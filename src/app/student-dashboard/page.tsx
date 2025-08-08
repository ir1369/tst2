'use client';

import { useState } from 'react';
import { StatsGrid } from '@/components/student-dashboard/StatsGrid';
import { UpcomingClasses } from '@/components/student-dashboard/UpcomingClasses';
import { RecentActivities } from '@/components/student-dashboard/RecentActivities';
import { CourseProgress } from '@/components/student-dashboard/CourseProgress';
import { BookmarkedResources } from '@/components/student-dashboard/BookmarkedResources';
import { Sidebar } from '@/components/student-dashboard/Sidebar';
import { HeaderBar } from '@/components/student-dashboard/HeaderBar';
import {
  stats,
  upcomingClasses,
  recentActivities,
  courseProgress,
  bookmarkedResources,
  menuItems
} from '@/data/studentDashboard';

export default function StudentDashboard() {
  const [selectedCourse, setSelectedCourse] = useState('all');

  

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar menuItems={menuItems} />
      <div className="flex-1 overflow-auto">
        <HeaderBar />
        <div className="p-6">
          <StatsGrid items={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <UpcomingClasses classes={upcomingClasses} />
            <RecentActivities activities={recentActivities} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CourseProgress
              selectedCourse={selectedCourse}
              onSelectedCourseChange={setSelectedCourse}
              items={courseProgress}
            />
            <BookmarkedResources items={bookmarkedResources} />
          </div>
        </div>
      </div>
    </div>
  );
}