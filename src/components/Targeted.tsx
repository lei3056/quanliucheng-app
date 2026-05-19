import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Target, Clock, Building2, ChevronRight, Bookmark, Edit3, Search, SlidersHorizontal, X } from 'lucide-react';

interface TargetedProps {
  onBack: () => void;
  onTrack?: (title: string, status: any) => void;
}

export default function Targeted({ onBack, onTrack }: TargetedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [examType, setExamType] = useState('');
  const [locationType, setLocationType] = useState('');

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="absolute inset-0 bg-[#F2F2F7] z-50 flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 pt-12 pb-3 bg-white border-b border-slate-200/60 shrink-0 sticky top-0 z-20">
        <div className="flex items-center mb-3 relative">
          <button onClick={onBack} className="absolute left-0 p-1 -ml-1 text-[#007AFF] active:opacity-50 flex items-center">
            <ChevronLeft size={24} />
            <span className="text-[17px] -ml-1">返回</span>
          </button>
          <h1 className="text-[17px] font-semibold text-slate-900 flex-1 text-center">重点关注</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center bg-[#767680]/15 rounded-[10px] px-2 h-9">
            <Search size={16} className="text-[#3C3C43]/60 mr-1.5" />
            <input 
              type="text" 
              placeholder="搜索岗位..." 
              className="flex-1 bg-transparent border-none outline-none text-[17px] text-slate-900 placeholder:text-[#3C3C43]/60 min-w-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="text-[#007AFF] p-1 active:opacity-50"
          >
            <SlidersHorizontal size={22} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 pb-32">
        {/* Item 1 */}
        <div className="bg-primary-50/30 p-5 rounded-2xl shadow-sm border border-primary-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
          <div className="flex justify-between items-start">
             <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 text-sm">江西省交投数据科技</h3>
                <span className="bg-primary-50 text-primary-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-primary-100">高优先级</span>
              </div>
              <p className="text-[11px] font-bold text-primary-600 mb-3">研发工程岗</p>
            </div>
            <button className="text-primary-500 bg-primary-50 p-2 rounded-lg border border-primary-100 shadow-sm">
              <Bookmark size={14} className="fill-current" />
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mb-4 flex items-center gap-1">
            <Building2 size={12} /> 央国企 · 匹配度 92%
          </p>
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
             <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">下一步</span>
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1"><Clock size={12} className="text-amber-500"/> 即将开始报名</span>
             </div>
             <button 
               onClick={() => onTrack?.('江西省交投数据科技 - 研发工程岗', '已报名')}
               className="bg-white border border-slate-200 text-primary-600 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-colors flex items-center gap-1 shadow-sm"
             >
                <Edit3 size={12}/> 报名状态 
             </button>
          </div>
        </div>

        {/* Item 2 */}
         <div className="bg-emerald-50/30 p-5 rounded-2xl shadow-sm border border-emerald-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <div className="flex justify-between items-start">
             <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 text-sm">软州市林业局</h3>
                <span className="bg-emerald-50 text-emerald-600 text-[9px] font-bold px-1.5 py-0.5 rounded border border-emerald-100">积极跟进中</span>
              </div>
              <p className="text-[11px] font-bold text-emerald-600 mb-3">业务股工作人员</p>
            </div>
            <button className="text-emerald-500 bg-emerald-50 p-2 rounded-lg border border-emerald-100 shadow-sm cursor-default">
              <Bookmark size={14} className="fill-current" />
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mb-4 flex items-center gap-1">
            <Building2 size={12} /> 政府机关 · 匹配度 88%
          </p>
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
             <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold tracking-wider">下一步</span>
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1"><Clock size={12} className="text-primary-500"/> 04/20 09:00 准考证打印</span>
             </div>
             <button 
               onClick={() => onTrack?.('软州市林业局 - 业务股工作人员', '未报名')}
               className="bg-white border border-slate-200 text-primary-600 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-colors flex items-center gap-1 shadow-sm"
             >
                <Edit3 size={12}/> 报名状态 
             </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showFilterModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilterModal(false)}
              className="absolute inset-0 bg-black/40 z-[60]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-[#F2F2F7] z-[70] rounded-t-[10px] pb-8"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-white rounded-t-[10px]">
                <button onClick={() => setShowFilterModal(false)} className="text-[#007AFF] text-[17px] active:opacity-50">取消</button>
                <h2 className="text-[17px] font-semibold text-slate-900">筛选</h2>
                <button onClick={() => setShowFilterModal(false)} className="text-[#007AFF] font-semibold text-[17px] active:opacity-50">完成</button>
              </div>
              
              <div className="px-4 py-6">
                <div className="bg-white rounded-[10px] overflow-hidden">
                  {/* Row 1 */}
                  <div className="flex items-center justify-between pl-4 pr-3 py-3 border-b border-[#3C3C43]/10 relative">
                    <span className="text-[17px] text-slate-900">考试类型</span>
                    <div className="flex items-center justify-end flex-1 pl-4">
                      <select 
                        className="appearance-none bg-transparent text-[17px] text-[#3C3C43]/60 outline-none pr-5 text-right w-full font-medium"
                        value={examType}
                        onChange={(e) => setExamType(e.target.value)}
                        dir="rtl"
                      >
                        <option value="">全部</option>
                        <option value="事业单位">事业单位</option>
                        <option value="公务员">公务员</option>
                        <option value="国企">国企</option>
                      </select>
                      <ChevronRight size={16} className="text-[#3C3C43]/30 absolute right-3 pointer-events-none" />
                    </div>
                  </div>
                  {/* Row 2 */}
                  <div className="flex items-center justify-between pl-4 pr-3 py-3 relative">
                    <span className="text-[17px] text-slate-900">工作地点</span>
                    <div className="flex items-center justify-end flex-1 pl-4">
                      <select 
                        className="appearance-none bg-transparent text-[17px] text-[#3C3C43]/60 outline-none pr-5 text-right w-full font-medium"
                        value={locationType}
                        onChange={(e) => setLocationType(e.target.value)}
                        dir="rtl"
                      >
                        <option value="">全部</option>
                        <option value="北京">北京</option>
                        <option value="上海">上海</option>
                        <option value="杭州">杭州</option>
                        <option value="南昌">南昌</option>
                      </select>
                      <ChevronRight size={16} className="text-[#3C3C43]/30 absolute right-3 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
