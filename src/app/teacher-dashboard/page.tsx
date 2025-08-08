'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/teacher-dashboard/Sidebar';
import { HeaderBar } from '@/components/teacher-dashboard/HeaderBar';
import { StatsGrid } from '@/components/teacher-dashboard/StatsGrid';
import { UpcomingClasses } from '@/components/teacher-dashboard/UpcomingClasses';
import { RecentActivities } from '@/components/teacher-dashboard/RecentActivities';
import { PerformancePanel } from '@/components/teacher-dashboard/PerformancePanel';
import { ResourceLibrary } from '@/components/teacher-dashboard/ResourceLibrary';
import {
  stats,
  upcomingClasses,
  recentActivities,
  performanceData,
  resources,
  menuItems
} from '@/data/teacherDashboard';

export default function TeacherDashboard() {
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
            <PerformancePanel
              selectedCourse={selectedCourse}
              onSelectedCourseChange={setSelectedCourse}
              data={performanceData}
            />
            <ResourceLibrary resources={resources} />
          </div>
        </div>
      </div>
    </div>
  );
}