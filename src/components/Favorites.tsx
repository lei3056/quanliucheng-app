import { motion } from 'motion/react';
import { ChevronLeft, Bookmark, Clock, MapPin, Target, Edit3, FileText } from 'lucide-react';

interface FavoritesProps {
  onBack: () => void;
  onTrack?: (title: string, status: any) => void;
}

const favoritesItems = [
  { unit: '成都市武侯区教育局', position: '数学教师 (事业编)', location: '成都', edu: '本科', special: '1:12竞考', deadline: '截止: 05-12', status: '进行中', statusColor: 'emerald', isHot: true },
  { unit: '杭州市余杭区政府', position: '综合管理储备干部', location: '杭州', edu: '硕士', special: '无限制', deadline: '截止: 04-10', status: '已结束', statusColor: 'slate', isHot: false },
  { unit: '绵阳经济技术开发区三江小学', position: '小学语文教师', location: '绵阳', edu: '本科', special: '无限制', deadline: '发布: 04-27', status: '报名未开始', statusColor: 'primary', isHot: true },
  { unit: '吉安东管理中心', position: '文秘宣传岗', location: '吉安', edu: '本科', special: '校招', deadline: '截止: 05-06', status: '进行中', statusColor: 'amber', isHot: true },
  { unit: '南昌市青云谱区卫健委', position: '公共卫生干事', location: '南昌', edu: '本科', special: '事业编', deadline: '截止: 05-15', status: '报名中', statusColor: 'amber', isHot: true },
];

export default function Favorites({ onBack, onTrack }: FavoritesProps) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="absolute inset-0 bg-[#F2F2F7] z-50 flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 pt-12 pb-3 px-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-primary-600 font-medium"
          >
            <ChevronLeft size={28} strokeWidth={2.5} className="-ml-1.5" />
            <span className="text-[14px] ml-0.5">返回</span>
          </button>
        </div>
        <div>
          <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight px-1">我的收藏夹</h1>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="mt-4 px-4">
          <div className="bg-white rounded-[12px] shadow-sm border border-slate-200/60 overflow-hidden">
            {favoritesItems.map((item, i, arr) => (
              <div key={i} className={`p-4 group active:bg-slate-50 transition-colors ${i !== arr.length - 1 ? 'border-b border-slate-100' : ''} ${item.status === '已结束' ? 'opacity-[0.65]' : ''}`}>
                <div className="mb-2">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-[15px] font-semibold text-slate-900 leading-snug group-active:text-primary-600 transition-colors">
                      {item.unit}
                    </h3>
                    <Bookmark className={`text-${item.statusColor !== 'slate' ? 'primary' : 'slate'}-500 shrink-0 mt-0.5 ml-2`} size={16} fill="currentColor" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded cursor-default border border-primary-100/50">
                      {item.position}
                    </span>
                    <span className="text-[12px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50">
                      考试类型
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] font-bold uppercase tracking-wider text-${item.statusColor}-600 bg-${item.statusColor}-50 px-1.5 py-0.5 rounded border border-${item.statusColor}-100`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center text-slate-500 gap-1.5">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-[12px]">{item.location}</span>
                  </div>
                  <div className="flex items-center text-slate-500 gap-1.5">
                    <Clock size={14} className="text-slate-400" />
                    <span className="text-[12px]">{item.deadline.replace('截止: ', '').replace('发布: ', '')}</span>
                  </div>
                </div>

                <div className="flex gap-2 text-sm">
                  <button className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-[10px] font-bold text-[13px] text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                    <FileText size={14} /> 详情
                  </button>
                  <button 
                    disabled={item.status === '已结束'}
                    onClick={() => item.status !== '已结束' && onTrack?.(`${item.unit} - ${item.position}`, '未报名')}
                    className={`flex-1 ${item.status === '已结束' ? 'bg-slate-100 text-slate-400 border border-slate-200/50 cursor-not-allowed' : 'bg-primary-50 text-primary-600 active:bg-primary-100 border border-primary-100/50 shadow-sm'} py-2 rounded-[10px] font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors`}
                  >
                    <Edit3 size={14} />
                    状态
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
