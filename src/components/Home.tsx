import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bell, Clock, Building2, Flame, ThumbsUp, Tag, Bookmark, Target, PenTool, Edit3, X, FileText, CheckSquare, AlarmClock, CheckCircle2, Star, ChevronRight, MapPin, RefreshCw, Loader2 } from 'lucide-react';

export default function Home({ onNavigate, onTrack }: { onNavigate?: (tab: 'favorites' | 'targeted') => void; onTrack?: (title: string, status: any) => void }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'overview' | 'focused' | 'favorites'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [pullY, setPullY] = useState(0);
  const startY = useRef(0);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current?.scrollTop === 0 && activeFilter === 'focused') {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current > 0 && activeFilter === 'focused') {
      const y = e.touches[0].clientY - startY.current;
      if (y > 0 && y < 100) {
        setPullY(y);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullY > 50 && activeFilter === 'focused') {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1500);
    }
    startY.current = 0;
    setPullY(0);
  };

  const handleScroll = () => {
    if (activeFilter === 'focused' && scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoadingMore) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setIsLoadingMore(false);
        }, 1500);
      }
    }
  };

  return (
    <motion.div 
      ref={scrollContainerRef}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col gap-6 pb-24 bg-slate-50 h-full overflow-y-auto"
    >
      {/* Header */}
      <div className="flex flex-col px-6 pt-6 pb-3 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-20 justify-center">
        <div className="flex items-center justify-between relative h-10 w-full">
          <AnimatePresence>
            {!isSearchExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center absolute left-0 right-[88px]"
              >
                <div className="flex bg-slate-100 p-1 rounded-xl w-full">
                  <button 
                    onClick={() => setActiveFilter('overview')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeFilter === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    岗位概览
                  </button>
                  <button 
                    onClick={() => setActiveFilter('focused')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeFilter === 'focused' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    重点关注
                  </button>
                  <button 
                    onClick={() => setActiveFilter('favorites')}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${activeFilter === 'favorites' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    我的收藏
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isSearchExpanded && (
              <motion.div 
                initial={{ opacity: 0, width: 40 }}
                animate={{ opacity: 1, width: '100%' }}
                exit={{ opacity: 0, width: 40 }}
                className="absolute right-0 top-0 bottom-0 flex items-center w-full z-10"
              >
                <div className="bg-slate-50 rounded-xl flex items-center px-4 py-2 border border-slate-200 w-full h-full shadow-inner">
                  <Search size={16} className="text-slate-400 mr-3 shrink-0" />
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="搜索职位、单位名称..." 
                    className="bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none w-full text-sm font-medium h-full"
                  />
                  <button 
                    onClick={() => setIsSearchExpanded(false)}
                    className="ml-2 text-slate-400 hover:text-slate-600 transition-colors shrink-0 p-1 rounded-full hover:bg-slate-200/50"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isSearchExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-2 absolute right-0"
              >
                <button 
                  onClick={() => setIsSearchExpanded(true)}
                  className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 transition-colors"
                >
                  <Search size={18} />
                </button>
                <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 transition-colors">
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Job Overview */}
      {activeFilter === 'overview' && (
      <div className="px-6 space-y-4">
        <h2 className="text-sm font-black text-slate-400 flex items-center gap-2 tracking-tighter">
          <div className="w-1 h-4 bg-teal-500"></div> 岗位概览
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                <CheckSquare size={16} />
              </div>
              <div>
                <div className="text-xl font-black text-blue-600 mb-0.5">17978</div>
                <div className="text-[10px] font-bold text-slate-500">本周推荐岗位</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <AlarmClock size={16} />
              </div>
              <div>
                <div className="text-xl font-black text-rose-600 mb-0.5">14144</div>
                <div className="text-[10px] font-bold text-slate-500">三日内报名截止</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                <CheckCircle2 size={16} />
              </div>
              <div>
                <div className="text-xl font-black text-emerald-600 mb-0.5">0</div>
                <div className="text-[10px] font-bold text-slate-500">已投递简历数量</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                <Star size={16} />
              </div>
              <div>
                <div className="text-xl font-black text-amber-600 mb-0.5">0</div>
                <div className="text-[10px] font-bold text-slate-500">关注岗位数量</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Focused Items */}
      {activeFilter === 'focused' && (
      <div className="px-6 space-y-3 mt-2">
        <div 
          className="flex justify-center items-center overflow-hidden transition-all duration-200"
          style={{ 
            height: isRefreshing ? '32px' : Math.min(pullY, 32) + 'px',
            opacity: isRefreshing || pullY > 0 ? 1 : 0
          }}
        >
           {isRefreshing ? <RefreshCw className="animate-spin text-slate-400" size={16} /> : <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{pullY > 50 ? '释放刷新' : '下拉刷新'}</span>}
        </div>
        
        <div className="flex flex-col gap-3">
          {[
            { unit: '弥勒市元亨社会工作服务中心', type: '事业单位', color: 'teal', deadline: '04/23' },
            { unit: '反兴奋剂中心', type: '事业单位', color: 'teal', deadline: '04/23' },
            { unit: '深圳市公安局', type: '事业单位', color: 'teal', deadline: '04/23' },
            { unit: '柳北区民政局', type: '公益性岗位', color: 'amber', deadline: '04/23' },
            { unit: '成都市武侯区教育局', type: '事业编', color: 'teal', deadline: '05/12' },
            { unit: '杭州市余杭区政府', type: '公务员', color: 'blue', deadline: '04/10' },
            { unit: '绵阳经济技术开发区三江小学', type: '事业编', color: 'teal', deadline: '04/27' },
            { unit: '吉安东管理中心', type: '国企', color: 'indigo', deadline: '05/06' },
            { unit: '南昌市青云谱区卫健委', type: '事业编', color: 'teal', deadline: '05/15' },
            { unit: '成都市某区税务局', type: '公务员', color: 'blue', deadline: '05/20' },
            { unit: '杭州某知名研究机构', type: '事业单位', color: 'teal', deadline: '05/30' },
            { unit: '宁波市交通警察局', type: '辅警', color: 'slate', deadline: '05/01' },
            { unit: '上海市人民法院', type: '公务员', color: 'blue', deadline: '05/05' },
            { unit: '北京市东城区教委', type: '事业编', color: 'teal', deadline: '05/18' },
            { unit: '广州市天河区税务局', type: '劳务派遣', color: 'slate', deadline: '05/10' },
          ].map((item, index) => (
             <div key={index} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-3 relative overflow-hidden group hover:border-slate-300 transition-colors">
               <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-slate-300 transition-colors"></div>
               <div className="flex items-start gap-2">
                 <div className="mt-0.5 text-rose-500"><AlarmClock size={14} /></div>
                 <h3 className="text-sm font-bold text-slate-900 leading-tight flex-1">- {item.unit}</h3>
               </div>
               <div className="flex items-center gap-2 pl-6">
                 <span className={`text-[10px] font-bold text-${item.color}-600 px-2 py-0.5 bg-${item.color}-50 rounded border border-${item.color}-100`}>{item.type}</span>
                 <span className="text-[10px] font-bold text-rose-600">截止 {item.deadline}</span>
               </div>
             </div>
          ))}
        </div>
        <div className="flex justify-center py-4 h-12">
           {isLoadingMore ? <Loader2 className="animate-spin text-slate-400" size={16} /> : <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">上拉加载更多</span>}
        </div>
      </div>
      )}

      {/* New Jobs Today */}
      {activeFilter === 'overview' && (
      <div className="px-6 space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-black text-slate-400 flex items-center gap-2 tracking-tighter">
            <div className="w-1 h-4 bg-teal-500"></div> 今日新增岗位
          </h2>
          <span className="text-[11px] font-bold text-slate-400">共 1187 个岗位</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: '人才引进', count: 372, icon: '人', color: 'bg-purple-100 text-purple-600' },
            { title: '事业单位', count: 325, icon: '事', color: 'bg-teal-100 text-teal-600' },
            { title: '国企招聘', count: 188, icon: '国', color: 'bg-blue-100 text-blue-600' },
            { title: '医疗卫生招聘', count: 151, icon: '医', color: 'bg-indigo-100 text-indigo-600' },
            { title: '教师招聘', count: 110, icon: '教', color: 'bg-violet-100 text-violet-600' },
            { title: '社区工作者', count: 29, icon: '社', color: 'bg-orange-100 text-orange-600' },
            { title: '警法考试', count: 9, icon: '警', color: 'bg-emerald-100 text-emerald-600' },
            { title: '公益性岗位', count: 2, icon: '公', color: 'bg-amber-100 text-amber-600' },
            { title: '银行', count: 1, icon: '银', color: 'bg-blue-100 text-blue-600' }
          ].map((item, index) => (
            <div key={index} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${item.color}`}>
                {item.icon}
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-600 mb-0.5">{item.title}</span>
                <span className="text-sm font-black text-slate-900 leading-none">{item.count}</span>
                <span className="text-[9px] text-slate-400 mt-0.5">个岗位</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}




      {/* Favorites */}
      {activeFilter === 'favorites' && (
        <div className="px-6 flex flex-col gap-4 mt-2">
          {[
            {
              unit: '成都市武侯区教育局',
              position: '数学教师 (事业编)',
              location: '成都',
              edu: '本科',
              special: '1:12竞考',
              deadline: '截止: 05-12',
              status: '进行中',
              statusColor: 'emerald',
              isHot: true
            },
            {
              unit: '杭州市余杭区政府',
              position: '综合管理储备干部',
              location: '杭州',
              edu: '硕士',
              special: '无限制',
              deadline: '截止: 04-10',
              status: '已结束',
              statusColor: 'slate',
              isHot: false
            },
            {
              unit: '绵阳经济技术开发区三江小学',
              position: '小学语文教师',
              location: '绵阳',
              edu: '本科',
              special: '无限制',
              deadline: '发布: 04-27',
              status: '报名未开始',
              statusColor: 'primary',
              isHot: true
            },
            {
              unit: '吉安东管理中心',
              position: '文秘宣传岗',
              location: '吉安',
              edu: '本科',
              special: '校招',
              deadline: '截止: 05-06',
              status: '进行中',
              statusColor: 'amber',
              isHot: true
            },
            {
              unit: '南昌市青云谱区卫健委',
              position: '公共卫生干事',
              location: '南昌',
              edu: '本科',
              special: '事业编',
              deadline: '截止: 05-15',
              status: '报名中',
              statusColor: 'amber',
              isHot: true
            },
            {
              unit: '弥勒市元亨社会工作服务中心',
              position: '综合岗位',
              location: '弥勒',
              edu: '本科',
              special: '事业编',
              deadline: '截止: 04-23',
              status: '已结束',
              statusColor: 'slate',
              isHot: false
            },
            {
              unit: '反兴奋剂中心',
              position: '宣传干事',
              location: '北京',
              edu: '硕士',
              special: '事业编',
              deadline: '截止: 04-23',
              status: '已结束',
              statusColor: 'slate',
              isHot: false
            },
            {
              unit: '深圳市公安局',
              position: '辅警',
              location: '深圳',
              edu: '大专',
              special: '事业编',
              deadline: '截止: 04-23',
              status: '已结束',
              statusColor: 'slate',
              isHot: false
            },
            {
              unit: '柳北区民政局',
              position: '社会救助协理员',
              location: '柳州',
              edu: '大专',
              special: '公益岗',
              deadline: '截止: 04-23',
              status: '已结束',
              statusColor: 'slate',
              isHot: false
            },
            {
              unit: '成都市某区税务局',
              position: '信息记录员',
              location: '成都',
              edu: '本科',
              special: '编外',
              deadline: '截止: 05-20',
              status: '报名中',
              statusColor: 'amber',
              isHot: true
            },
            {
              unit: '杭州某知名研究机构',
              position: '研究员助理',
              location: '杭州',
              edu: '硕士',
              special: '合同制',
              deadline: '截止: 05-30',
              status: '报名未开始',
              statusColor: 'primary',
              isHot: false
            },
            {
              unit: '宁波市交通警察局',
              position: '交通辅警',
              location: '宁波',
              edu: '大专',
              special: '编外',
              deadline: '截止: 05-01',
              status: '进行中',
              statusColor: 'emerald',
              isHot: false
            },
            {
              unit: '上海市人民法院',
              position: '书记员',
              location: '上海',
              edu: '本科',
              special: '法学',
              deadline: '截止: 05-05',
              status: '进行中',
              statusColor: 'emerald',
              isHot: true
            },
            {
              unit: '北京市东城区教委',
              position: '初中英语教师',
              location: '北京',
              edu: '本科',
              special: '师范',
              deadline: '截止: 05-18',
              status: '报名中',
              statusColor: 'amber',
              isHot: true
            },
            {
              unit: '广州市天河区税务局',
              position: '办税服务员',
              location: '广州',
              edu: '本科',
              special: '劳务',
              deadline: '截止: 05-10',
              status: '进行中',
              statusColor: 'emerald',
              isHot: false
            }
          ].map((item, index) => (
            <div key={index} className={`${item.isHot ? 'bg-primary-50/30 border-primary-200' : 'bg-white border-slate-200'} ${item.status === '已结束' ? 'opacity-75' : ''} p-5 rounded-2xl shadow-sm border relative overflow-hidden`}>
              {item.isHot && <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{item.unit}</h3>
                  <p className={`text-[11px] font-bold ${item.isHot ? 'text-primary-600' : 'text-slate-500'} mb-3`}>{item.position}</p>
                </div>
                <button className="text-primary-500 bg-primary-50 p-2 rounded-lg border border-primary-100 shadow-sm cursor-default">
                  <Bookmark size={14} className="fill-current" />
                </button>
              </div>
              <div className="flex gap-2 mb-4">
                 <span className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${item.isHot ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100'} px-2 py-1 rounded-md flex items-center gap-1`}><MapPin size={10}/> {item.location}</span>
                 <span className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${item.isHot ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100'} px-2 py-1 rounded-md`}>{item.edu}</span>
                 <span className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${item.isHot ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100'} px-2 py-1 rounded-md`}>{item.special}</span>
              </div>
              <div className={`flex flex-col gap-3 border-t ${item.isHot ? 'border-primary-100' : 'border-slate-100'} pt-4`}>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-400 flex items-center gap-1"><Clock size={10}/> {item.deadline}</span>
                  <span className={`text-${item.statusColor}-600 px-2 py-1 bg-${item.statusColor}-50 rounded-md border border-${item.statusColor}-100`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className={`flex-[4] ${item.isHot ? 'bg-white hover:bg-slate-50 border-slate-200' : 'bg-slate-50 hover:bg-slate-100 border-slate-200'} text-slate-600 py-2 rounded-xl border shadow-sm transition-colors flex justify-center items-center gap-1 font-bold text-[11px]`}>
                    <FileText size={14} /> 公告详情
                  </button>
                  <button 
                    onClick={() => item.status !== '已结束' && onTrack?.(`${item.unit} - ${item.position}`, '未报名')}
                    className={`flex-[5] ${item.status === '已结束' ? 'bg-slate-100 text-slate-500 cursor-not-allowed border-slate-200' : (item.isHot ? 'bg-white text-primary-600 hover:bg-primary-50 border-primary-200' : 'bg-slate-50 text-slate-600 hover:text-primary-600 hover:bg-primary-50 border-slate-200 hover:border-primary-200')} py-2 rounded-xl border shadow-sm transition-colors flex justify-center items-center gap-1 font-bold text-[11px]`}
                    disabled={item.status === '已结束'}
                  >
                    <Edit3 size={14} /> 更新状态
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
