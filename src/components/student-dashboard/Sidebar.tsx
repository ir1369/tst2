import { MoreHorizontal } from 'lucide-react';
import type { MenuItem } from '@/types/studentDashboard';
import { BookOpen } from 'lucide-react';

interface SidebarProps {
  menuItems: ReadonlyArray<MenuItem>;
}

export function Sidebar({ menuItems }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-sm border-l">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">آکادمی دانش</h2>
            <p className="text-sm text-gray-500">پنل دانشجو</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-4">
          منوی اصلی
        </div>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-emerald-50 text-emerald-700 border-l-2 border-emerald-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 w-64 p-4 border-t">
        <div className="flex items-center space-x-3 space-x-reverse">
          <img
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
            alt="سارا احمدی"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">سارا احمدی</p>
            <p className="text-xs text-gray-500">دانشجوی فعال</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

