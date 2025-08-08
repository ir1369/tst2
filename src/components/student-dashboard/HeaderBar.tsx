import { Bell, MessageCircle, Search } from 'lucide-react';

export function HeaderBar() {
  return (
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">داشبورد</h1>
          <p className="text-gray-600">خوش برگشتی، سارا!</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="جستجو..."
              className="pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

