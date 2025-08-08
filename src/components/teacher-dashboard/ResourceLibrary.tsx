import { BarChart3, Download, FileText, Plus, Video } from 'lucide-react';
import type { ResourceItem } from '@/types/teacherDashboard';

interface ResourceLibraryProps {
  resources: ReadonlyArray<ResourceItem>;
}

export function ResourceLibrary({ resources }: ResourceLibraryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">کتابخانه منابع</h2>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 space-x-reverse">
            <Plus className="w-4 h-4" />
            <span>افزودن جدید</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <div key={index} className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                {resource.type === 'pdf' && <FileText className="w-5 h-5 text-blue-600" />}
                {resource.type === 'excel' && <BarChart3 className="w-5 h-5 text-green-600" />}
                {resource.type === 'video' && <Video className="w-5 h-5 text-purple-600" />}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{resource.name}</h3>
                <p className="text-sm text-gray-500">{resource.size} • {resource.addedTime}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

