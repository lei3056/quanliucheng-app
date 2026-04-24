import { motion } from 'motion/react';
import { Calendar as CalendarIcon, CheckCircle2, CircleDashed, Clock, ChevronRight } from 'lucide-react';

export default function Schedule() {
  const days = [
    { day: '一', date: '15', active: false },
    { day: '二', date: '16', active: false },
    { day: '三', date: '17', active: true },
    { day: '四', date: '18', active: false },
    { day: '五', date: '19', active: false },
    { day: '六', date: '20', active: false },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col h-full bg-slate-50 pb-24 overflow-y-auto"
    >
      {/* Header & Mini Calendar */}
      <div className="bg-white px-6 pt-8 pb-6 border-b border-slate-200 z-10 shrink-0">
        <h1 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
          <span>日程追踪</span>
          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500">
            <CalendarIcon size={16} />
          </div>
        </h1>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-black text-slate-800 uppercase tracking-widest">2026 / 04</span>
          <span className="text-[10px] font-bold text-primary-700 px-3 py-1 bg-primary-50 border border-primary-100 rounded-md uppercase tracking-widest">回到今天</span>
        </div>
        <div className="flex justify-between mt-4">
          {days.map((d, i) => (
            <div key={i} className={`flex flex-col items-center justify-center p-2 rounded-xl w-11 h-14 transition-all border ${d.active ? 'bg-primary-600 border-primary-700 text-white shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
              <span className={`text-[10px] font-bold mb-1 ${d.active ? 'opacity-80' : ''}`}>{d.day}</span>
              <span className={`text-sm font-black ${d.active ? '' : 'text-slate-800'}`}>{d.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="flex-1 px-6 pt-8 pb-8">
        
        {/* Urgent Section */}
        <div className="mb-10">
          <h2 className="text-sm font-black text-slate-400 mb-6 flex items-center gap-2 tracking-tighter">
            <div className="w-1 h-4 bg-amber-400"></div> 待办事项
          </h2>
          
          <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
            
            {/* Urgent Item */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-[18px] h-[18px] rounded-full bg-white border-[4px] border-amber-400 z-10 ring-4 ring-slate-50"></span>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="text-[10px] font-bold text-amber-600 mb-2 flex items-center gap-1 uppercase tracking-wider bg-amber-50 w-fit px-2 py-1 rounded-md border border-amber-100">
                  <Clock size={12} /> 今天 14:00 截止
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">吉安车管中心-宣传统筹岗位</h3>
                <p className="text-[11px] text-slate-500 mb-4 leading-relaxed font-medium">若未按时缴费将视为自动放弃报名资格。</p>
                <button className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors flex justify-center items-center gap-2">
                  前往缴费平台 <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Upcoming Item */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1 w-[18px] h-[18px] rounded-full bg-slate-50 border-[4px] border-primary-400 z-10 ring-4 ring-slate-50"></span>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider mb-2 text-primary-700 bg-primary-50 border border-primary-100 w-fit px-2 py-1 rounded-md">
                  <Clock size={12} /> 04/20 09:00 开启
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-sm">软州市林业局-业务股工作人员</h3>
                <p className="text-[11px] text-slate-500 mb-4 leading-relaxed font-medium">准考证打印系统开启，请提前准备设备并下载。</p>
                <button className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors">
                  设置日历提醒
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Completed Section */}
        <div>
           <h2 className="text-sm font-black text-slate-400 mb-6 flex items-center gap-2 tracking-tighter">
            <div className="w-1 h-4 bg-emerald-500"></div> 已完成节点
          </h2>

          <div className="relative pl-6 border-l-2 border-slate-200 border-dashed space-y-6">
            
            <div className="relative opacity-60">
              <span className="absolute -left-[31px] top-1 w-[18px] h-[18px] rounded-full bg-slate-100 border-[4px] border-emerald-500 z-10 ring-4 ring-slate-50 flex items-center justify-center"></span>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">04-10 / 16:30</div>
                <h3 className="font-bold text-slate-700 text-[11px]">提交报名申请 (江西省交投数据)</h3>
              </div>
            </div>

            <div className="relative opacity-50 pb-8">
              <span className="absolute -left-[31px] top-1 w-[18px] h-[18px] rounded-full bg-slate-100 border-[4px] border-emerald-500 z-10 ring-4 ring-slate-50 flex items-center justify-center"></span>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">04-05 / 09:12</div>
                <h3 className="font-bold text-slate-700 text-[11px]">完成简历 AI 托管诊断</h3>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
}
