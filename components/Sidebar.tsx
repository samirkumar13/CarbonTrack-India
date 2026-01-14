import React from 'react';
import { LayoutDashboard, BookOpen, Settings, Leaf } from 'lucide-react';
import { View } from '../types';

interface Props {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<Props> = ({ currentView, onViewChange }) => {
  const getLinkClass = (view: View) => {
    const isActive = currentView === view;
    return `w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left ${isActive
        ? 'bg-brand-50 text-brand-700'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`;
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0 no-print">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="bg-brand-600 p-2 rounded-lg">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-slate-900 text-lg leading-tight">CarbonTrack</h1>
          <p className="text-xs text-slate-500 font-medium">India Edition</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <button
          onClick={() => onViewChange('CALCULATOR')}
          className={getLinkClass('CALCULATOR')}
        >
          <LayoutDashboard className="w-5 h-5" />
          Calculator
        </button>
        <button
          onClick={() => onViewChange('METHODOLOGY')}
          className={getLinkClass('METHODOLOGY')}
        >
          <BookOpen className="w-5 h-5" />
          Methodology
        </button>
        <button
          onClick={() => onViewChange('SETTINGS')}
          className={getLinkClass('SETTINGS')}
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </nav>

      <div className="p-6 border-t border-slate-100">
        <div className="bg-slate-900 rounded-xl p-4 text-center">
          <p className="text-slate-400 text-xs mb-2">Have questions?</p>
          <button
            onClick={() => onViewChange('HELP')}
            className="text-white text-sm font-medium hover:text-slate-200 underline underline-offset-2"
          >
            Help & FAQ
          </button>
        </div>
      </div>
    </aside>
  );
};
