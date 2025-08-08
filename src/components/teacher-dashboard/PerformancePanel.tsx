import type { PerformanceData } from '@/types/teacherDashboard';

interface PerformancePanelProps {
  selectedCourse: string;
  onSelectedCourseChange: (value: string) => void;
  data: PerformanceData;
}

export function PerformancePanel({ selectedCourse, onSelectedCourseChange, data }: PerformancePanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">عملکرد دانشجویان</h2>
          <select
            value={selectedCourse}
            onChange={(e) => onSelectedCourseChange(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">همه دوره‌ها</option>
            <option value="physics">فیزیک 101</option>
            <option value="chemistry">شیمی 102</option>
            <option value="biology">زیست‌شناسی 201</option>
          </select>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">میانگین کلاس</p>
            <p className="text-2xl font-bold text-gray-900">{data.classAverage}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">بالاترین نمره</p>
            <p className="text-2xl font-bold text-green-600">{data.highestScore}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">پایین‌ترین نمره</p>
            <p className="text-2xl font-bold text-red-600">{data.lowestScore}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">مشارکت</p>
            <p className="text-2xl font-bold text-blue-600">{data.participation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

