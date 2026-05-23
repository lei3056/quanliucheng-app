import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, RefreshCw, Clock, Activity } from 'lucide-react';

const scheduleItems = [
  { id: 1, dateLabel: '05-15', unit: '北京市人社局事业单位', position: '综合管理岗', status: '待笔试', statusType: '待笔试' },
  { id: 2, dateLabel: '05-18', endDateLabel: '05-22', unit: '上海市人民法院', position: '法官助理', status: '待缴费', statusType: '待缴费' },
  { id: 3, dateLabel: '05-20', unit: '杭州市余杭区政府', position: '综合管理储备干部', status: '待打印准考证', statusType: '待打印' },
  { id: 4, dateLabel: '05-01', endDateLabel: '05-07', unit: '绵阳经济技术开发区三江小学', position: '小学语文教师', status: '已缴费', statusType: '其他' },
  { id: 5, dateLabel: '04-10', unit: '吉安东管理中心', position: '文秘宣传岗', status: '已结束', statusType: '已完成' },
  { id: 6, dateLabel: '05-18', endDateLabel: '05-24', unit: '国家税务总局浙江省税务局', position: '征收管理科一级行政执法员', status: '资格审核中', statusType: '其他' },
  { id: 7, dateLabel: '05-19', endDateLabel: '05-25', unit: '淄博市博山区中医医院', position: '肿瘤科（招1人）', status: '待缴报名费', statusType: '待缴费' },
  { id: 8, dateLabel: '05-19', endDateLabel: '05-25', unit: '淄博市博山区中医医院', position: '介入科主任助理', status: '准考证待打印', statusType: '待打印' },
  { id: 9, dateLabel: '05-25', unit: '淄博市博山区中医医院', position: '中医科中医师', status: '待参加笔试', statusType: '待笔试' },
  { id: 10, dateLabel: '05-12', unit: '淄博市博山区中医医院', position: '麻醉科医师', status: '招录考核已完成', statusType: '已完成' },
  { id: 11, dateLabel: '05-19', endDateLabel: '05-25', unit: '淄博市博山区人民医院', position: '中医科骨干研发人', status: '笔试科目确认中', statusType: '待笔试' },
  { id: 12, dateLabel: '05-22', unit: '淄博市博山区人民医院', position: '眼科住院医师', status: '准考证下载中', statusType: '待打印' },
  { id: 13, dateLabel: '05-19', endDateLabel: '05-25', unit: '淄博市博山区人民医院', position: '心内科技术骨干', status: '待交审核服务费', statusType: '待缴费' },
  { id: 14, dateLabel: '05-24', unit: '淄博市博山区人民医院', position: '普外科临床医师', status: '考核已通过', statusType: '已完成' },
];

const getProgressInfo = (startStr: string, endStrStr?: string) => {
  if (!endStrStr) return null;
  const todayStr = '05-18'; // fixed today date in our dataset
  const [sm, sd] = startStr.split('-').map(Number);
  const [em, ed] = endStrStr.split('-').map(Number);
  const [tm, td] = todayStr.split('-').map(Number);

  const startDayCount = (sm === 4 ? 30 : 0) + sd;
  const endDayCount = (em === 4 ? 30 : 0) + ed;
  const todayDayCount = (tm === 4 ? 30 : 0) + td;

  const totalDays = endDayCount - startDayCount + 1;
  const elapsedDays = todayDayCount - startDayCount + 1;

  if (todayDayCount < startDayCount) {
    return {
      status: 'upcoming',
      progress: 0,
      text: `即将开始 (共 ${totalDays} 天)`,
      remaining: totalDays,
    };
  } else if (todayDayCount > endDayCount) {
    return {
      status: 'ended',
      progress: 100,
      text: '已结束',
      remaining: 0,
    };
  } else {
    const progress = Math.min(100, Math.round((elapsedDays / totalDays) * 100));
    const remaining = endDayCount - todayDayCount;
    return {
      status: 'active',
      progress,
      text: `进行中 · 剩 ${remaining === 0 ? '今日截止' : remaining + ' 天截止'}`,
      remaining,
    };
  }
};

const renderDurationTrack = (item: typeof scheduleItems[number]) => {
  if (!item.endDateLabel) return null;
  const progressInfo = getProgressInfo(item.dateLabel, item.endDateLabel);
  if (!progressInfo) return null;

  return (
    <div className="mt-3 pt-2.5 pb-1 border-t border-slate-100 select-none">
      <div className="flex items-center justify-between mb-1.5 text-[11px] font-medium">
        <span className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded-[4px] font-bold ${
          progressInfo.status === 'ended'
            ? 'text-slate-500 bg-slate-100'
            : progressInfo.status === 'upcoming'
              ? 'text-blue-500 bg-blue-50'
              : 'text-[#34C759] bg-[#34C759]/10'
        }`}>
          <Clock size={11} className={`${progressInfo.status === 'active' ? 'animate-pulse' : ''}`} />
          时段 · {progressInfo.text}
        </span>
        <span className="text-slate-400 font-mono font-semibold">
          {item.dateLabel} 至 {item.endDateLabel}
        </span>
      </div>
      
      {/* Visual Progress bar with current position */}
      <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden mt-2 border border-slate-200/20">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            progressInfo.status === 'ended' 
              ? 'bg-slate-400' 
              : progressInfo.status === 'upcoming' 
                ? 'bg-slate-200' 
                : 'bg-gradient-to-r from-[#007AFF] to-[#34C759]'
          }`}
          style={{ width: `${progressInfo.progress}%` }}
        />
        {progressInfo.status === 'active' && progressInfo.progress > 0 && progressInfo.progress < 100 && (
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full border-[1.5px] border-[#007AFF] shadow-sm"
            style={{ left: `calc(${progressInfo.progress}% - 4px)` }}
          />
        )}
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 font-medium font-mono mt-1 px-0.5">
        <span>开始 ({item.dateLabel})</span>
        {progressInfo.status === 'active' && (
          <span className="text-[#007AFF] font-sans font-semibold">
            今天
          </span>
        )}
        <span>截止 ({item.endDateLabel})</span>
      </div>
    </div>
  );
};

export default function Schedule() {
  const [activeFilter, setActiveFilter] = useState('全部');
  const [subFilter, setSubFilter] = useState<null | 'today' | 'upcoming'>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [pullY, setPullY] = useState(0);
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scrollContainerRef.current?.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current > 0) {
      const y = e.touches[0].clientY - startY.current;
      if (y > 0 && y < 100) {
        setPullY(y);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullY > 50) {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        setPullY(0);
      }, 1500);
    } else {
      setPullY(0);
    }
    startY.current = 0;
  };

  const filters = ['全部', '待缴费', '待打印', '待笔试', '已完成'];

  const filteredItems = scheduleItems.filter(item => {
    // Top filter overrides sub-filter if it's not "全部"
    if (activeFilter !== '全部') return item.statusType === activeFilter;
    
    // If we are in "全部", check for sub-filters
    if (subFilter === 'today') {
      return item.dateLabel.includes('05-18');
    }
    if (subFilter === 'upcoming') {
      // 3 days range: 05-18, 05-19, 05-20
      return item.dateLabel.includes('05-18') || item.dateLabel.includes('05-19') || item.dateLabel.includes('05-20');
    }
    
    return true;
  });

  const handleTopFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setSubFilter(null); // Reset sub-filter when switching main categories
  };

  const handleSubFilterClick = (filter: 'today' | 'upcoming') => {
    if (subFilter === filter) {
      setSubFilter(null); // Toggle off if clicked again
    } else {
      setSubFilter(filter);
    }
  };

  const getStatusStyle = (type: string) => {
    if (type.includes('缴费')) return 'text-orange-600 bg-orange-50 border-orange-100';
    if (type.includes('打印')) return 'text-blue-600 bg-blue-50 border-blue-100';
    if (type.includes('笔试')) return 'text-red-600 bg-red-50 border-red-100';
    if (type.includes('完成')) return 'text-slate-500 bg-slate-100 border-slate-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  const getBorderAccentClass = (type: string) => {
    if (type.includes('缴费')) return 'border-l-[4px] border-l-orange-500';
    if (type.includes('打印')) return 'border-l-[4px] border-l-blue-500';
    if (type.includes('笔试')) return 'border-l-[4px] border-l-red-500';
    if (type.includes('完成')) return 'border-l-[4px] border-l-slate-350';
    return 'border-l-[4px] border-l-indigo-400';
  };

  const renderActionBtn = (type: string) => {
    if (type.includes('缴费')) {
      return <button className="px-4 py-1.5 bg-blue-600 text-white rounded-[8px] text-[12px] font-bold active:bg-blue-700 transition-colors shadow-sm">去缴费</button>;
    }
    if (type.includes('打印')) {
      return <button className="px-3 py-1.5 text-blue-600 bg-blue-50 border border-blue-100 font-medium text-[12px] active:bg-blue-100 rounded-[8px] transition-colors shadow-sm">去打印准考证</button>;
    }
    if (type.includes('笔试')) {
      return <button className="px-3 py-1.5 text-slate-500 bg-slate-50 border border-slate-200 font-medium text-[12px] active:bg-slate-100 rounded-[8px] transition-colors shadow-sm">设置提醒</button>;
    }
    if (type.includes('完成')) {
      return <button disabled className="px-4 py-1.5 bg-slate-100 text-slate-400 rounded-[8px] text-[12px] font-medium cursor-not-allowed">已结束</button>;
    }
    return <button className="px-3 py-1.5 text-slate-500 bg-slate-50 border border-slate-200 font-medium text-[12px] active:bg-slate-100 rounded-[8px] transition-colors shadow-sm">查看详情</button>;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col h-full bg-[#f6f7f9] pb-24"
    >
      {/* Header */}
      <div className="bg-white pt-12 pb-3 px-4 border-b border-slate-200/60 sticky top-0 z-30 shrink-0">
        <h1 className="text-[16px] font-bold text-slate-900 text-center tracking-tight mb-4">提醒</h1>
        
        {/* Filters */}
        <div className="flex justify-between gap-1.5 pb-1 w-full">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleTopFilterClick(filter)}
              className={`flex-1 py-1.5 rounded-full text-[12px] font-medium transition-colors border text-center whitespace-nowrap px-1 ${
                activeFilter === filter 
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Area */}
      <div 
        className="flex-1 overflow-y-auto"
        ref={scrollContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull to refresh visual */}
        <div className="flex justify-center items-center overflow-hidden transition-all duration-200"
             style={{ height: isRefreshing ? '40px' : Math.min(pullY, 40) + 'px', opacity: isRefreshing || pullY > 0 ? 1 : 0 }}>
           {isRefreshing ? <RefreshCw className="animate-spin text-slate-400" size={16} /> : <span className="text-[12px] text-slate-400 font-medium">{pullY > 50 ? '释放刷新...' : '下拉刷新...'}</span>}
        </div>

        <div className="pt-4 px-4 pb-6">
          {/* Highlight Notification Bar */}
          {activeFilter === '全部' && (
            <div className="flex gap-2.5 mb-4 max-w-full">
              <button 
                onClick={() => handleSubFilterClick('today')}
                className={`flex-1 rounded-[8px] p-2.5 flex items-center gap-1.5 border transition-all active:scale-[0.98] min-w-0 ${
                  subFilter === 'today' 
                  ? 'bg-red-100/50 border-red-300 ring-1 ring-red-300 shadow-inner' 
                  : 'bg-red-50/80 border-red-100/60 shadow-sm'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
                <span className="text-[12px] text-red-600 truncate"><span className="font-bold">今日待办：</span>1 项</span>
              </button>
              <button 
                onClick={() => handleSubFilterClick('upcoming')}
                className={`flex-1 rounded-[8px] p-2.5 flex items-center gap-1.5 border transition-all active:scale-[0.98] min-w-0 ${
                  subFilter === 'upcoming' 
                  ? 'bg-orange-100/50 border-orange-300 ring-1 ring-orange-300 shadow-inner' 
                  : 'bg-orange-50/80 border-orange-100/60 shadow-sm'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></div>
                <span className="text-[12px] text-orange-600 truncate"><span className="font-bold">即将截止：</span>3 项</span>
              </button>
            </div>
          )}

          {/* Schedule List */}
          {filteredItems.length > 0 ? (
            activeFilter === '全部' ? (
              <div className="relative pl-6 pr-0.5 font-sans">
                {/* Vertical Line on left of items */}
                <div className="absolute left-[10px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#007AFF] via-slate-200 to-slate-100/60 rounded-full" />
                
                {(() => {
                  // Group items by dateLabel
                  const grouped: { [key: string]: typeof scheduleItems } = {};
                  filteredItems.forEach(item => {
                    if (!grouped[item.dateLabel]) grouped[item.dateLabel] = [];
                    grouped[item.dateLabel].push(item);
                  });
                  
                  // Sort dates descending
                  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
                  
                  return sortedDates.map((date) => {
                    const items = grouped[date];
                    const isToday = date === '05-18'; 
                    const parts = date.split('-');
                    const monthNum = parts[0] ? parseInt(parts[0], 10) : 5;
                    const dayNum = parts[1] || date;
                    
                    return (
                      <div key={date} className="relative mb-8 last:mb-2 group/day">
                        {/* Dot on Timeline */}
                        <div className={`absolute -left-[21px] top-[14px] w-4 h-4 rounded-full flex items-center justify-center z-10 transition-transform duration-205 group-hover/day:scale-110 ${
                          isToday 
                            ? 'bg-[#007AFF] text-white shadow-md shadow-blue-500/20 ring-4 ring-[#007AFF]/15' 
                            : 'bg-white border-2 border-slate-300'
                        }`}>
                          {isToday ? (
                            <Activity size={8} className="animate-pulse" />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          )}
                        </div>
                        
                        {/* Day Info Header Bar */}
                        <div className="flex items-center gap-3 mb-3 pl-3 select-none">
                          {/* Mini Calendar Widget Card */}
                          <div className={`flex flex-col items-center justify-center rounded-[8px] bg-white border ${
                            isToday 
                              ? 'border-blue-500 shadow-[0_2px_8px_rgba(0,122,255,0.12)] ring-1 ring-blue-500/10' 
                              : 'border-slate-200/85 shadow-sm'
                          } w-[38px] h-[40px] overflow-hidden shrink-0`}>
                            <div className={`text-[8px] font-extrabold tracking-wider text-center w-full py-0.5 ${
                              isToday ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 border-b border-slate-150'
                            }`}>
                              {isToday ? 'TODAY' : `${monthNum}月`}
                            </div>
                            <div className="text-[13px] font-black leading-none py-1 text-slate-800 tracking-tight">
                              {dayNum}
                            </div>
                          </div>

                          {/* Info Labels */}
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <h4 className={`text-[13px] font-bold tracking-tight ${
                                isToday ? 'text-blue-600' : 'text-slate-800'
                              }`}>
                                {isToday ? '今日提醒' : `${monthNum}月${parseInt(dayNum, 10)}日提醒`}
                              </h4>
                              {isToday && (
                                <span className="text-[9px] font-bold text-white bg-emerald-500 px-1.5 py-0.5 rounded-[4px]">
                                  今天
                                </span>
                              )}
                            </div>
                            {isToday && (
                              <span className="text-[11px] text-slate-400 font-medium select-none mt-0.5 flex items-center gap-1">
                                <span>共 {items.length} 个提醒</span>
                                {items.some(item => item.statusType === '待缴费') && <span className="w-1.5 h-1.5 rounded-full bg-orange-400" title="待缴费" />}
                                {items.some(item => item.statusType === '待打印') && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title="待打印" />}
                                {items.some(item => item.statusType === '待笔试') && <span className="w-1.5 h-1.5 rounded-full bg-red-500" title="待笔试" />}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Card of the Day */}
                        <div className="bg-white rounded-[14px] border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-slate-100 flex flex-col">
                          {items.map((item) => (
                            <div 
                              key={item.id} 
                              className={`p-3.5 hover:bg-slate-50/50 active:bg-slate-100/60 transition-all duration-150 relative cursor-default group/item ${getBorderAccentClass(item.statusType)}`}
                            >
                              <h3 className="text-[14px] font-bold text-slate-900 leading-snug mb-1 group-hover/item:text-blue-600 transition-colors">
                                {item.unit}
                              </h3>
                              <p className="text-[13px] text-slate-600 mb-2.5 font-normal">{item.position}</p>
                              
                              <div className="flex justify-between items-center">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-[4px] border ${getStatusStyle(item.statusType)}`}>
                                  {item.status}
                                </span>
                                <div>
                                  {renderActionBtn(item.statusType)}
                                </div>
                              </div>
                              {renderDurationTrack(item)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {filteredItems.map(item => (
                  <div key={item.id} className={`bg-white rounded-[14px] border border-slate-200/60 p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] active:bg-slate-50/80 transition-colors ${getBorderAccentClass(item.statusType)}`}>
                    <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-1">{item.unit}</h3>
                    <p className="text-[14px] text-slate-600 mb-3">{item.position}</p>
                    <div className="flex justify-between items-center mt-1">
                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getStatusStyle(item.statusType)}`}>
                          {item.status}
                        </span>
                        <span className="text-[12px] text-slate-400 font-medium">{item.dateLabel}</span>
                      </div>
                      <div>
                        {renderActionBtn(item.statusType)}
                      </div>
                    </div>
                    {renderDurationTrack(item)}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 border border-slate-200/50">
                <CalendarIcon size={28} className="text-slate-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-[15px] font-medium text-slate-700 mb-1.5">暂无考试日程</h3>
              <p className="text-[13px] text-slate-500">去首页添加岗位，自动生成日程</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
