import { Filter, Grid3X3, List, Search } from 'lucide-react';
import type { LevelOption, ViewMode } from '@/types/categories';

interface FiltersBarProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedLevel: string;
  onSelectedLevelChange: (value: string) => void;
  levels: ReadonlyArray<LevelOption>;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  resultsCount: number;
}

export function FiltersBar({
  searchTerm,
  onSearchTermChange,
  selectedLevel,
  onSelectedLevelChange,
  levels,
  viewMode,
  onViewModeChange,
  resultsCount
}: FiltersBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="جستجو در دسته‌بندی‌ها..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedLevel}
              onChange={(e) => onSelectedLevelChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {levels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">{resultsCount} دسته‌بندی یافت شد</div>
    </div>
  );
}

