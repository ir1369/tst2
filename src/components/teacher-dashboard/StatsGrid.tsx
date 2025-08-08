import { MoreHorizontal } from 'lucide-react';
import type { StatItem } from '@/types/teacherDashboard';

interface StatsGridProps {
  items: ReadonlyArray<StatItem>;
}

export function StatsGrid({ items }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {items.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
          <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
          <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</p>
        </div>
      ))}
    </div>
  );
}

