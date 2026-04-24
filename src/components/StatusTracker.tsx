import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Clock, Edit3, MessageSquare } from 'lucide-react';

export type JobStatus = '未报名' | '已报名' | '已缴费' | '已进入面试' | '已放弃';

interface StatusRecord {
  id: string;
  status: JobStatus;
  note: string;
  date: string;
}

interface StatusTrackerProps {
  jobTitle: string;
  initialStatus?: JobStatus;
  onClose: () => void;
}

const statusOptions: { label: JobStatus; color: string }[] = [
  { label: '未报名', color: 'slate' },
  { label: '已报名', color: 'primary' },
  { label: '已缴费', color: 'emerald' },
  { label: '已进入面试', color: 'amber' },
  { label: '已放弃', color: 'rose' },
];

export default function StatusTracker({ jobTitle, initialStatus = '未报名', onClose }: StatusTrackerProps) {
  const [history, setHistory] = useState<StatusRecord[]>([
    {
      id: '1',
      status: initialStatus,
      note: '初次关注此职位，准备了解详情。',
      date: new Date(Date.now() - 86400000).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [selectedStatus, setSelectedStatus] = useState<JobStatus>(initialStatus);
  const [note, setNote] = useState('');

  const currentStatus = history[0].status;

  const handleUpdate = () => {
    if (selectedStatus === currentStatus && !note.trim()) return;

    const newRecord: StatusRecord = {
      id: Date.now().toString(),
      status: selectedStatus,
      note: note.trim() || '更新了状态进度',
      date: new Date().toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    };

    setHistory([newRecord, ...history]);
    setNote('');
  };

  const getStatusColorCls = (status: JobStatus, type: 'bg' | 'text' | 'border' | 'ring') => {
    const opt = statusOptions.find(o => o.label === status);
    const color = opt ? opt.color : 'slate';
    if (type === 'bg') return `bg-${color}-500`;
    if (type === 'text') return `text-${color}-600`;
    if (type === 'border') return `border-${color}-200`;
    if (type === 'ring') return `ring-${color}-500`;
    return '';
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
      />
      
      {/* Bottom Sheet */}
      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 w-full bg-white z-[101] rounded-t-3xl sm:rounded-[2rem] sm:rounded-b-none flex flex-col max-h-[85vh] shadow-2xl"
      >
        {/* Handle */}
        <div className="w-full flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-6 pb-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-lg font-black text-slate-900 mb-1">{jobTitle}</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">进度追踪</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border bg-slate-50 ${getStatusColorCls(currentStatus, 'text')} ${getStatusColorCls(currentStatus, 'border')}`}>
                当前: {currentStatus}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          
          {/* Update Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <Edit3 size={16} className="text-primary-500" /> 记录新进展
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(opt => (
                <button
                  key={opt.label}
                  onClick={() => setSelectedStatus(opt.label)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all border ${
                    selectedStatus === opt.label 
                      ? `bg-${opt.color}-500 text-white border-${opt.color}-600 shadow-sm shadow-${opt.color}-200` 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <MessageSquare size={14} className="absolute left-3 top-3.5 text-slate-400" />
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="添加备注信息 (如: 笔试感觉不错, 等待面试通知...)"
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-sm font-medium focus:border-primary-500 focus:bg-white outline-none transition-colors resize-none"
              />
            </div>

            <button 
              onClick={handleUpdate}
              disabled={selectedStatus === currentStatus && !note.trim()}
              className="w-full bg-slate-900 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
            >
              提交更新
            </button>
          </div>

          {/* History Timeline */}
          <div>
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6">
              <Clock size={16} className="text-primary-500" /> 状态时间轴
            </h3>
            
            <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-[19px] before:w-0.5 before:bg-slate-100">
              {history.map((record, idx) => (
                <div key={record.id} className="relative flex items-start gap-4">
                  <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 relative z-10 border-2 border-white ring-2 ${getStatusColorCls(record.status, 'ring')} ${getStatusColorCls(record.status, 'bg')}`} />
                  <div className="flex-1 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[11px] font-bold ${getStatusColorCls(record.status, 'text')}`}>
                        变更状态: {record.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{record.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {record.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </>
  );
}
