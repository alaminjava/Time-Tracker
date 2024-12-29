import React from 'react';
import { User } from 'lucide-react';

export default function UserProfile() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
          <User className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Local User</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">All data is stored locally</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your activity data is stored securely in your browser's local storage.
          Use the export function to backup your data.
        </p>
      </div>
    </div>
  );
}