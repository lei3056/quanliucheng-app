import { motion } from 'motion/react';
import { ChevronLeft, Bookmark, Clock, MapPin, Target, Edit3 } from 'lucide-react';

interface FavoritesProps {
  onBack: () => void;
  onTrack?: (title: string, status: any) => void;
}

export default function Favorites({ onBack, onTrack }: FavoritesProps) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="absolute inset-0 bg-slate-50 z-50 flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-8 pb-4 bg-white border-b border-slate-200 shrink-0">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors">
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="text-base font-bold text-slate-900">我的收藏夹</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold"></p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 pb-32">
        {/* Item 1 */}
        <div className="bg-primary-50/30 p-5 rounded-2xl shadow-sm border border-primary-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">成都市武侯区教育局</h3>
              <p className="text-[11px] font-bold text-primary-600 mb-3">数学教师 (事业编)</p>
            </div>
            <button className="text-primary-500 bg-primary-50 p-2 rounded-lg border border-primary-100 shadow-sm cursor-default">
              <Bookmark size={14} className="fill-current" />
            </button>
          </div>
          <div className="flex gap-2 mb-4">
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md flex items-center gap-1"><MapPin size={10}/> 成都</span>
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md">本科</span>
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md">1:12竞考</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold border-t border-primary-100 pt-4 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 px-2 py-1 bg-emerald-50 rounded-md border border-emerald-100">进行中</span>
              <span className="text-slate-400 flex items-center gap-1"><Clock size={10}/> 截止: 05-12</span>
            </div>
            <button 
              onClick={() => onTrack?.('成都市武侯区教育局 - 数学教师 (事业编)', '未报名')}
              className="bg-white text-primary-600 px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 border border-primary-200 hover:bg-primary-50 transition-colors shadow-sm"
            >
              <Edit3 size={12} /> 状态
            </button>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative opacity-75">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">杭州市余杭区政府</h3>
              <p className="text-[11px] font-bold text-slate-500 mb-3">综合管理储备干部</p>
            </div>
            <button className="text-primary-500 bg-primary-50 p-2 rounded-lg border border-primary-100 shadow-sm cursor-default">
              <Bookmark size={14} className="fill-current" />
            </button>
          </div>
          <div className="flex gap-2 mb-4">
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md flex items-center gap-1"><MapPin size={10}/> 杭州</span>
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">硕士</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold border-t border-slate-100 pt-4 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 px-2 py-1 bg-slate-100 rounded-md border border-slate-200">已结束</span>
              <span className="text-slate-400 flex items-center gap-1"><Clock size={10}/> 截止: 04-10</span>
            </div>
            <button 
              onClick={() => onTrack?.('杭州市余杭区政府 - 综合管理储备干部', '未报名')}
              className="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 border border-slate-200 hover:bg-slate-200 transition-colors cursor-not-allowed"
              disabled
            >
              <Edit3 size={12} /> 状态
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
