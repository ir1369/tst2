import { MoreHorizontal } from 'lucide-react';
import type { RecentActivityItem } from '@/types/studentDashboard';

interface RecentActivitiesProps {
  activities: ReadonlyArray<RecentActivityItem>;
}

const statusToColors: Record<RecentActivityItem['status'], { bg: string; text: string }> = {
  completed: { bg: 'bg-green-100', text: 'text-green-600' },
  watched: { bg: 'bg-blue-100', text: 'text-blue-600' },
  quiz: { bg: 'bg-purple-100', text: 'text-purple-600' },
  certificate: { bg: 'bg-orange-100', text: 'text-orange-600' }
};

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">فعالیت‌های اخیر</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 space-x-reverse">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusToColors[activity.status].bg}`}>
                <activity.icon className={`w-4 h-4 ${statusToColors[activity.status].text}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  {activity.action} <span className="text-emerald-600">&quot;{activity.item}&quot;</span>
                </p>
                <p className="text-xs text-gray-500">{activity.course} • {activity.time}</p>
              </div>
              {index === 0 && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
            مشاهده همه فعالیت‌ها
          </button>
        </div>
      </div>
    </div>
  );
}

