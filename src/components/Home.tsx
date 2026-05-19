import React, { useState, useRef, useEffect } from 'react';
import { Bookmark, Building2, CheckCircle2, CheckSquare, ChevronRight, Clock, Edit3, FileText, Flame, Loader2, MapPin, MoreHorizontal, MessageSquare, RefreshCw, Search, Star, Target, AlarmClock } from 'lucide-react';

export default function Home({ onNavigate, onTrack, onShowList }: { onNavigate?: (tab: 'home' | 'study' | 'schedule' | 'profile' | 'favorites' | 'targeted' | 'jobListing') => void; onTrack?: (title: string, status: any) => void; onShowList?: (title: string) => void }) {
  const [activeFilter, setActiveFilter] = useState<'overview' | 'focused' | 'favorites'>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [pullY, setPullY] = useState(0);
  const startY = useRef(0);

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

  const colorStyles: Record<string, { bg: string, text: string, badgeBg: string, badgeBorder: string }> = {
    teal: { bg: 'bg-teal-500', text: 'text-teal-600', badgeBg: 'bg-teal-50', badgeBorder: 'border-teal-100/50' },
    amber: { bg: 'bg-amber-500', text: 'text-amber-600', badgeBg: 'bg-amber-50', badgeBorder: 'border-amber-100/50' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', badgeBg: 'bg-blue-50', badgeBorder: 'border-blue-100/50' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', badgeBg: 'bg-indigo-50', badgeBorder: 'border-indigo-100/50' },
    slate: { bg: 'bg-slate-500', text: 'text-slate-600', badgeBg: 'bg-slate-50', badgeBorder: 'border-slate-100/50' },
  };

  const focusedItems = [
    { unit: '弥勒市元亨社会工作服务中心', position: '社工岗位', location: '红河', edu: '大专', special: '不限专业', deadline: '截止: 04-23', status: '进行中', statusColor: 'emerald', type: '事业单位', color: 'teal' },
    { unit: '反兴奋剂中心', position: '行政专员', location: '北京', edu: '本科', special: '党员', deadline: '截止: 04-23', status: '进行中', statusColor: 'emerald', type: '事业单位', color: 'teal' },
    { unit: '深圳市公安局', position: '勤务辅警', location: '深圳', edu: '大专', special: '退伍军人优先', deadline: '截止: 04-23', status: '进行中', statusColor: 'emerald', type: '事业单位', color: 'teal' },
    { unit: '柳北区民政局', position: '协助管理岗', location: '柳州', edu: '大专', special: '特困人员', deadline: '截止: 04-23', status: '进行中', statusColor: 'emerald', type: '公益性岗位', color: 'amber' },
    { unit: '成都市武侯区教育局', position: '数学教师 (事业编)', location: '成都', edu: '本科', special: '1:12竞考', deadline: '截止: 05-12', status: '进行中', statusColor: 'emerald', type: '事业编', color: 'teal' },
    { unit: '杭州市余杭区政府', position: '综合管理储备干部', location: '杭州', edu: '硕士', special: '无限制', deadline: '截止: 04-10', status: '已结束', statusColor: 'slate', type: '公务员', color: 'blue' },
    { unit: '绵阳经济技术开发区三江小学', position: '小学语文教师', location: '绵阳', edu: '本科', special: '无限制', deadline: '发布: 04-27', status: '报名未开始', statusColor: 'blue', type: '事业编', color: 'teal' },
    { unit: '吉安东管理中心', position: '文秘宣传岗', location: '吉安', edu: '本科', special: '校招', deadline: '截止: 05-06', status: '进行中', statusColor: 'amber', type: '国企', color: 'indigo' },
    { unit: '南昌市青云谱区卫健委', position: '公共卫生干事', location: '南昌', edu: '本科', special: '事业编', deadline: '截止: 05-15', status: '报名中', statusColor: 'amber', type: '事业编', color: 'teal' },
    { unit: '成都市某区税务局', position: '税务专员', location: '成都', edu: '本科', special: '应届生', deadline: '截止: 05-20', status: '报名未开始', statusColor: 'blue', type: '公务员', color: 'blue' },
    { unit: '杭州某知名研究机构', position: '研究助理', location: '杭州', edu: '硕士', special: '理工科专业', deadline: '截止: 05-30', status: '进行中', statusColor: 'emerald', type: '事业单位', color: 'teal' },
    { unit: '宁波市交通警察局', position: '交通辅警', location: '宁波', edu: '大专', special: '本地户口', deadline: '截止: 05-01', status: '进行中', statusColor: 'emerald', type: '辅警', color: 'slate' },
    { unit: '上海市人民法院', position: '法官助理', location: '上海', edu: '硕士', special: '需法考A证', deadline: '截止: 05-05', status: '进行中', statusColor: 'emerald', type: '公务员', color: 'blue' },
    { unit: '北京市东城区教委', position: '行政管理', location: '北京', edu: '本科', special: '京籍', deadline: '截止: 05-18', status: '报名未开始', statusColor: 'blue', type: '事业编', color: 'teal' },
    { unit: '广州市天河区税务局', position: '大厅服务人员', location: '广州', edu: '大专', special: '无限制', deadline: '截止: 05-10', status: '进行中', statusColor: 'emerald', type: '劳务派遣', color: 'slate' },
  ];

  const favoritesItems = [
    { unit: '成都市武侯区教育局', position: '数学教师 (事业编)', location: '成都', edu: '本科', special: '1:12竞考', deadline: '截止: 05-12', status: '进行中', statusColor: 'emerald', isHot: true },
    { unit: '杭州市余杭区政府', position: '综合管理储备干部', location: '杭州', edu: '硕士', special: '无限制', deadline: '截止: 04-10', status: '已结束', statusColor: 'slate', isHot: false },
    { unit: '绵阳经济技术开发区三江小学', position: '小学语文教师', location: '绵阳', edu: '本科', special: '无限制', deadline: '发布: 04-27', status: '报名未开始', statusColor: 'blue', isHot: true },
    { unit: '吉安东管理中心', position: '文秘宣传岗', location: '吉安', edu: '本科', special: '校招', deadline: '截止: 05-06', status: '进行中', statusColor: 'amber', isHot: true },
    { unit: '南昌市青云谱区卫健委', position: '公共卫生干事', location: '南昌', edu: '本科', special: '事业编', deadline: '截止: 05-15', status: '报名中', statusColor: 'amber', isHot: true },
    { unit: '弥勒市元亨社会工作服务中心', position: '综合岗位', location: '弥勒', edu: '本科', special: '事业编', deadline: '截止: 04-23', status: '已结束', statusColor: 'slate', isHot: false },
    { unit: '反兴奋剂中心', position: '宣传干事', location: '北京', edu: '硕士', special: '事业编', deadline: '截止: 04-23', status: '已结束', statusColor: 'slate', isHot: false },
    { unit: '深圳市公安局', position: '辅警', location: '深圳', edu: '大专', special: '事业编', deadline: '截止: 04-23', status: '已结束', statusColor: 'slate', isHot: false },
    { unit: '柳北区民政局', position: '社会救助协理员', location: '柳州', edu: '大专', special: '公益岗', deadline: '截止: 04-23', status: '已结束', statusColor: 'slate', isHot: false },
    { unit: '成都市某区税务局', position: '信息记录员', location: '成都', edu: '本科', special: '编外', deadline: '截止: 05-20', status: '报名中', statusColor: 'amber', isHot: true },
    { unit: '杭州某知名研究机构', position: '研究员助理', location: '杭州', edu: '硕士', special: '合同制', deadline: '截止: 05-30', status: '报名未开始', statusColor: 'blue', isHot: false },
    { unit: '宁波市交通警察局', position: '交通辅警', location: '宁波', edu: '大专', special: '编外', deadline: '截止: 05-01', status: '进行中', statusColor: 'emerald', isHot: false },
    { unit: '上海市人民法院', position: '书记员', location: '上海', edu: '本科', special: '法学', deadline: '截止: 05-05', status: '进行中', statusColor: 'emerald', isHot: true },
    { unit: '北京市东城区教委', position: '初中英语教师', location: '北京', edu: '本科', special: '师范', deadline: '截止: 05-18', status: '报名中', statusColor: 'amber', isHot: true },
    { unit: '广州市天河区税务局', position: '办税服务员', location: '广州', edu: '本科', special: '劳务', deadline: '截止: 05-10', status: '进行中', statusColor: 'emerald', isHot: false }
  ];

  return (
    <div 
      ref={scrollContainerRef}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="flex flex-col bg-[#F2F2F7] h-full font-sans overflow-y-auto pb-24"
    >
      {/* GitHub Style Header */}
      <div className="pt-12 pb-1.5 px-4 sticky top-0 bg-[#F2F2F7] z-20">
        <div className="flex justify-between items-center mb-1.5 px-1">
          <div className="w-8 h-8 flex items-center justify-center bg-slate-200/50 rounded-full">
            <Target className="text-slate-900" size={18} />
          </div>
          <button className="text-blue-500">
             <MessageSquare size={22} />
          </button>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex bg-slate-200/60 p-1 rounded-[10px] w-full mt-0">
          <button 
            onClick={() => setActiveFilter('overview')}
            className={`flex-1 py-1 text-[13px] font-medium rounded-[7px] transition-colors ${activeFilter === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            我的岗位
          </button>
          <button 
            onClick={() => setActiveFilter('focused')}
            className={`flex-1 py-1 text-[13px] font-medium rounded-[7px] transition-colors ${activeFilter === 'focused' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            重点关注
          </button>
          <button 
            onClick={() => setActiveFilter('favorites')}
            className={`flex-1 py-1 text-[13px] font-medium rounded-[7px] transition-colors ${activeFilter === 'favorites' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
             我的收藏
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {activeFilter === 'overview' && (
      <div className="px-4 mt-1.5 mb-1">
        <div className="bg-slate-200/70 rounded-[8px] flex items-center px-1.5 py-1 border border-slate-200/50 shadow-sm relative overflow-hidden group">
          <Search size={16} className="text-slate-500 mx-1 relative z-10" />
          <input 
            type="text" 
            placeholder="搜索职位、单位名称..." 
            className="bg-transparent text-slate-800 placeholder-slate-500 focus:outline-none w-full text-[14px] mx-1 relative z-10"
          />
        </div>
      </div>
      )}

      <div className="flex-1 mt-1">
        {/* Job Overview */}
        {activeFilter === 'overview' && (
          <div>
            <div className="flex justify-between items-center px-4 mt-3 mb-2">
              <h2 className="text-[16px] text-slate-900 tracking-tight">我的岗位</h2>
            </div>
            
            <div className="bg-white rounded-[10px] mx-4 overflow-hidden mb-6 shadow-sm border border-slate-200/40">
              <div 
                onClick={() => onShowList?.('本周推荐岗位')}
                className="flex items-center pl-4 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="w-[28px] h-[28px] rounded-[8px] bg-[#34d399] flex items-center justify-center shrink-0 mr-3 my-3">
                  <CheckSquare className="text-white" size={16} />
                </div>
                <div className="flex-1 flex items-center pr-4 py-3 border-b border-slate-100">
                  <span className="text-[14px] text-slate-900 flex-1">本周推荐岗位</span>
                  <span className="text-[13px] text-slate-500 pr-1">17,978</span>
                  <ChevronRight size={20} className="text-[#C7C7CC] shrink-0"/>
                </div>
              </div>

              <div 
                onClick={() => onShowList?.('三日内报名截止')}
                className="flex items-center pl-4 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="w-[28px] h-[28px] rounded-[8px] bg-[#60a5fa] flex items-center justify-center shrink-0 mr-3 my-3">
                  <AlarmClock className="text-white" size={16} />
                </div>
                <div className="flex-1 flex items-center pr-4 py-3 border-b border-slate-100">
                  <span className="text-[14px] text-slate-900 flex-1">三日内报名截止</span>
                  <span className="text-[13px] text-slate-500 pr-1">14,144</span>
                  <ChevronRight size={20} className="text-[#C7C7CC] shrink-0"/>
                </div>
              </div>

              <div 
                onClick={() => onShowList?.('已投递简历')}
                className="flex items-center pl-4 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="w-[28px] h-[28px] rounded-[8px] bg-[#a78bfa] flex items-center justify-center shrink-0 mr-3 my-3">
                  <CheckCircle2 className="text-white" size={16} />
                </div>
                <div className="flex-1 flex items-center pr-4 py-3 border-b border-slate-100">
                  <span className="text-[14px] text-slate-900 flex-1">已投递简历数量</span>
                  <span className="text-[13px] text-slate-500 pr-1">0</span>
                  <ChevronRight size={20} className="text-[#C7C7CC] shrink-0"/>
                </div>
              </div>

              <div 
                onClick={() => onShowList?.('关注岗位')}
                className="flex items-center pl-4 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="w-[28px] h-[28px] rounded-[8px] bg-[#fb923c] flex items-center justify-center shrink-0 mr-3 my-3">
                  <Star className="text-white" size={16} />
                </div>
                <div className="flex-1 flex items-center pr-4 py-3">
                  <span className="text-[14px] text-slate-900 flex-1">关注岗位数量</span>
                  <span className="text-[13px] text-slate-500 pr-1">0</span>
                  <ChevronRight size={20} className="text-[#C7C7CC] shrink-0"/>
                </div>
              </div>
            </div>

            {/* 今日新增 */}
            <div>
              <div className="flex justify-between items-end px-4 mt-3 mb-2">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[16px] text-slate-900 tracking-tight">今日新增</h2>
                  <span className="text-[13px] text-slate-500 font-normal">共 1187 个岗位</span>
                </div>
              </div>

              <div className="bg-white rounded-[10px] mx-4 overflow-hidden mb-6 shadow-sm border border-slate-200/40">
                {[
                  { name: '人才引进', count: 372, icon: '人', bg: '#a855f7' },
                  { name: '事业单位', count: 325, icon: '事', bg: '#2dd4bf' },
                  { name: '国企招聘', count: 188, icon: '国', bg: '#3b82f6' },
                  { name: '医疗卫生招聘', count: 151, icon: '医', bg: '#6366f1' },
                  { name: '教师招聘', count: 110, icon: '教', bg: '#c084fc' },
                  { name: '社区工作者', count: 29, icon: '社', bg: '#f97316' },
                  { name: '警法考试', count: 9, icon: '警', bg: '#10b981' },
                  { name: '公益性岗位', count: 2, icon: '公', bg: '#f59e0b' },
                  { name: '银行', count: 1, icon: '银', bg: '#60a5fa' },
                ].map((item, i, arr) => (
                  <div 
                    key={i} 
                    onClick={() => onShowList?.(item.name)}
                    className="flex items-center pl-4 bg-white hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
                  >
                     <div 
                       className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center shrink-0 mr-3 my-3"
                       style={{ backgroundColor: item.bg }}
                     >
                        <span className="text-white text-[14px] font-bold">{item.icon}</span>
                     </div>
                     <div className={`flex-1 flex items-center pr-4 py-3 ${i !== arr.length - 1 ? 'border-b border-slate-100' : ''}`}>
                       <span className="text-[14px] text-slate-900 flex-1">{item.name}</span>
                       <span className="text-[13px] text-slate-500 pr-1">{item.count}</span>
                       <ChevronRight size={20} className="text-[#C7C7CC] shrink-0"/>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Focused Items */}
        {activeFilter === 'focused' && (
          <div>
            {/* Pull to refresh visual */}
            <div className="flex justify-center items-center overflow-hidden transition-all duration-200"
                 style={{ height: isRefreshing ? '32px' : Math.min(pullY, 32) + 'px', opacity: isRefreshing || pullY > 0 ? 1 : 0 }}>
               {isRefreshing ? <RefreshCw className="animate-spin text-slate-400" size={16} /> : <span className="text-[12px] text-slate-400 font-medium">{pullY > 50 ? '释放刷新...' : '下拉刷新...'}</span>}
            </div>

            <div className="bg-white rounded-[10px] mx-4 overflow-hidden mb-6 shadow-sm border border-slate-200/40">
              {focusedItems.map((item, i, arr) => (
                <div key={i} className={`p-4 group active:bg-slate-50 transition-colors ${i !== arr.length - 1 ? 'border-b border-slate-100' : ''} ${item.status === '已结束' ? 'opacity-[0.65]' : ''}`}>
                  <div className="mb-2">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[15px] font-semibold text-slate-900 leading-snug group-active:text-blue-600 transition-colors">
                        {item.unit}
                      </h3>
                      <AlarmClock className={`text-${item.statusColor !== 'slate' ? 'blue' : 'slate'}-500 shrink-0 mt-0.5 ml-2`} size={16} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded cursor-default border border-blue-100/50">
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
                      className={`flex-1 ${item.status === '已结束' ? 'bg-slate-100 text-slate-400 border border-slate-200/50 cursor-not-allowed' : 'bg-[#EEF2FF] text-blue-600 active:bg-[#E0E7FF] border border-blue-100/50 shadow-sm'} py-2 rounded-[10px] font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors`}
                    >
                      <Edit3 size={14} />
                      状态
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center pb-4 h-12">
               {isLoadingMore ? <Loader2 className="animate-spin text-slate-400" size={16} /> : <span className="text-[13px] text-slate-500 font-medium pt-2">上拉加载更多...</span>}
            </div>
          </div>
        )}

        {/* Favorites */}
        {activeFilter === 'favorites' && (
          <div>
            <div className="bg-white rounded-[10px] mx-4 overflow-hidden mb-6 shadow-sm border border-slate-200/40">
              {favoritesItems.map((item, i, arr) => (
                <div key={i} className={`p-4 group active:bg-slate-50 transition-colors ${i !== arr.length - 1 ? 'border-b border-slate-100' : ''} ${item.status === '已结束' ? 'opacity-[0.65]' : ''}`}>
                  <div className="mb-2">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-[15px] font-semibold text-slate-900 leading-snug group-active:text-blue-600 transition-colors">
                        {item.unit}
                      </h3>
                      <Bookmark className={`text-${item.statusColor !== 'slate' ? 'blue' : 'slate'}-500 shrink-0 mt-0.5 ml-2`} size={16} fill="currentColor" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded cursor-default border border-blue-100/50">
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
                      className={`flex-1 ${item.status === '已结束' ? 'bg-slate-100 text-slate-400 border border-slate-200/50 cursor-not-allowed' : 'bg-[#EEF2FF] text-blue-600 active:bg-[#E0E7FF] border border-blue-100/50 shadow-sm'} py-2 rounded-[10px] font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors`}
                    >
                      <Edit3 size={14} />
                      状态
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
