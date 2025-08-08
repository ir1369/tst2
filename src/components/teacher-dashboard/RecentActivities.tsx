import { MoreHorizontal } from 'lucide-react';
import type { RecentActivityItem } from '@/types/teacherDashboard';

interface RecentActivitiesProps {
  activities: ReadonlyArray<RecentActivityItem>;
}

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
              <img
                src={activity.avatar}
                alt={activity.user}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                  <span className="text-emerald-600">"{activity.item}"</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
              {index === 0 && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">مشاهده همه فعالیت‌ها</button>
        </div>
      </div>
    </div>
  );
}

