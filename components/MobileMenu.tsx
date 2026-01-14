import React from 'react';
import { View } from '../types';

interface MobileMenuProps {
    isOpen: boolean;
    currentView: View;
    onViewChange: (view: View) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, currentView, onViewChange }) => {
    if (!isOpen) return null;

    return (
        <div className="lg:hidden fixed top-14 left-0 w-full bg-white border-b border-slate-200 z-40 p-4 shadow-lg">
            <div className="flex flex-col gap-2">
                <button
                    onClick={() => onViewChange('CALCULATOR')}
                    className={`p-3 rounded-lg text-left ${currentView === 'CALCULATOR' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'}`}
                >
                    Calculator
                </button>
                <button
                    onClick={() => onViewChange('METHODOLOGY')}
                    className={`p-3 rounded-lg text-left ${currentView === 'METHODOLOGY' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'}`}
                >
                    Methodology
                </button>
                <button
                    onClick={() => onViewChange('SETTINGS')}
                    className={`p-3 rounded-lg text-left ${currentView === 'SETTINGS' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'}`}
                >
                    Settings
                </button>
                <button
                    onClick={() => onViewChange('HELP')}
                    className={`p-3 rounded-lg text-left ${currentView === 'HELP' ? 'bg-brand-50 text-brand-700' : 'text-slate-600'}`}
                >
                    Help & FAQ
                </button>
            </div>
        </div>
    );
};
