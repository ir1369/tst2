import { Edit, MoreHorizontal, Video } from 'lucide-react';
import type { UpcomingClassItem } from '@/types/teacherDashboard';

interface UpcomingClassesProps {
  classes: ReadonlyArray<UpcomingClassItem>;
}

export function UpcomingClasses({ classes }: UpcomingClassesProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">کلاس‌های آینده</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {classes.map((class_, index) => (
            <div key={index} className="flex items-center space-x-4 space-x-reverse">
              <div className={`w-12 h-12 ${class_.color} rounded-lg flex flex-col items-center justify-center`}>
                <span className="text-xs font-medium">{class_.day}</span>
                <span className="text-lg font-bold">{class_.date}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{class_.title}</h3>
                <p className="text-sm text-gray-500">{class_.time} • {class_.room}</p>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">مشاهده همه کلاس‌ها</button>
        </div>
      </div>
    </div>
  );
}

