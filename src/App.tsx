import { useState } from 'react';
import { Compass, Calendar as CalendarIcon, User, Crown } from 'lucide-react';
import Home from './components/Home';
import Schedule from './components/Schedule';
import Profile from './components/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'profile'>('home');

  const navItems = [
    { id: 'home', icon: Compass, label: '发现' },
    { id: 'schedule', icon: CalendarIcon, label: '日程' },
    { id: 'profile', icon: User, label: '档案' },
  ] as const;

  return (
    <div className="bg-slate-900 min-h-screen flex justify-center items-center font-sans sm:p-4">
      <div className="w-full sm:w-[390px] h-screen sm:h-[844px] bg-slate-50 sm:rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col sm:border-[8px] sm:border-slate-800">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'home' && <Home />}
          {activeTab === 'schedule' && <Schedule />}
          {activeTab === 'profile' && <Profile />}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full bg-white border-t border-slate-200 px-6 py-4 pb-safe flex justify-around items-center z-50 rounded-b-[24px]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col items-center gap-1.5 transition-all ${isActive ? 'text-primary-600 scale-105' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <div className={`relative flex items-center justify-center w-10 h-8 rounded-lg transition-colors ${isActive ? 'bg-primary-50 border border-primary-100' : ''}`}>
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[10px] uppercase font-black tracking-widest`}>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
