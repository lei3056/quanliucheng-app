import { motion } from 'motion/react';
import { ChevronLeft, Target, Clock, Building2, ChevronRight, Bookmark } from 'lucide-react';

interface TargetedProps {
  onBack: () => void;
}

export default function Targeted({ onBack }: TargetedProps) {
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
          <h1 className="text-base font-bold text-slate-900">重点关注</h1>
          <p className="text-[10px] text-slate-400 font-semibold"></p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 pb-32">
        {/* Item 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
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
             <button className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-colors flex items-center gap-1">
                跟进状态 <ChevronRight size={12}/>
             </button>
          </div>
        </div>

        {/* Item 2 */}
         <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
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
             <button className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-colors flex items-center gap-1">
                跟进状态 <ChevronRight size={12}/>
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
