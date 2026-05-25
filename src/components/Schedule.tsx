import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar as CalendarIcon, RefreshCw, Clock, Activity, ArrowUpDown, X, Check, MessageSquare } from 'lucide-react';

interface StatusLog {
  id: string;
  status: string;
  remark: string;
  timestamp: string;
}

interface ScheduleItem {
  id: number;
  dateLabel: string;
  endDateLabel?: string;
  unit: string;
  position: string;
  status: string;
  statusType: string;
  logs?: StatusLog[];
}

const initialScheduleItems: ScheduleItem[] = [
  { id: 1, dateLabel: '05-15', unit: '北京市人社局事业单位', position: '综合管理岗', status: '待笔试', statusType: '待笔试', logs: [{ id: 'init-1', status: '已缴费', remark: '笔试报名成功，已于05-15完成交费，准备笔试。', timestamp: '2026-05-15 10:24' }] },
  { id: 2, dateLabel: '05-18', endDateLabel: '05-22', unit: '上海市人民法院', position: '法官助理', status: '待缴费', statusType: '待缴费', logs: [{ id: 'init-2-1', status: '未报名', remark: '关注岗位，了解招生公告及各阶段时间安排', timestamp: '2026-05-18 09:00' }, { id: 'init-2-2', status: '已报名', remark: '通过政法系统统一报名渠道提交了岗位意愿，等待资格审核。', timestamp: '2026-05-18 14:35' }] },
  { id: 3, dateLabel: '05-20', unit: '杭州市余杭区政府', position: '综合管理储备干部', status: '待打印准考证', statusType: '待打印', logs: [{ id: 'init-3', status: '已缴费', remark: '费用已缴，预计05-20通道开放后可执行网上准考证打印', timestamp: '2026-05-12 11:15' }] },
  { id: 4, dateLabel: '05-01', endDateLabel: '05-07', unit: '绵阳经济技术开发区三江小学', position: '小学语文教师', status: '已缴费', statusType: '其他', logs: [{ id: 'init-4', status: '已缴费', remark: '缴费成功，首轮选录资格获取', timestamp: '2026-05-02 16:40' }] },
  { id: 5, dateLabel: '04-10', unit: '吉安东管理中心', position: '文秘宣传岗', status: '已结束', statusType: '已完成', logs: [{ id: 'init-5-1', status: '已报名', remark: '报名成功，提交个人简历与对应证件材料', timestamp: '2026-04-10 10:00' }, { id: 'init-5-2', status: '已进入面试', remark: '笔试资格通过，进入线下面试考核，发挥符合预期。', timestamp: '2026-04-28 15:30' }] },
  { id: 6, dateLabel: '05-18', endDateLabel: '05-24', unit: '国家税务总局浙江省税务局', position: '征收管理科一级行政执法员', status: '资格审核中', statusType: '其他' },
  { id: 7, dateLabel: '05-19', endDateLabel: '05-25', unit: '淄博市博山区中医医院', position: '肿瘤科（招1人）', status: '待缴报名费', statusType: '待缴费' },
  { id: 8, dateLabel: '05-19', endDateLabel: '05-25', unit: '淄博市博山区中医医院', position: '介入科主任助理', status: '准考证待打印', statusType: '待打印' },
  { id: 9, dateLabel: '05-25', unit: '淄博市博山区中医医院', position: '中医科中医师', status: '待参加笔试', statusType: '待笔试' },
  { id: 10, dateLabel: '05-12', unit: '淄博市博山区中医医院', position: '麻醉科医师', status: '考试已通过', statusType: '已完成', logs: [{ id: 'init-10', status: '已进入面试', remark: '面试成绩优秀，最终笔面试总成绩位居第一，顺利录取。', timestamp: '2026-05-20 17:00' }] },
  { id: 11, dateLabel: '05-19', endDateLabel: '05-25', unit: '淄博市博山区人民医院', position: '中医科骨干研发人', status: '笔试科目确认中', statusType: '待笔试' },
  { id: 12, dateLabel: '05-22', unit: '淄博市博山区人民医院', position: '眼科住院医师', status: '准考证下载中', statusType: '待打印' },
  { id: 13, dateLabel: '05-19', endDateLabel: '05-25', unit: '淄博市博山区人民医院', position: '心内科技术骨干', status: '待交审核服务费', statusType: '待缴费' },
  { id: 14, dateLabel: '05-24', unit: '淄博市博山区人民医院', position: '普外科临床医师', status: '考试已通过', statusType: '已完成', logs: [{ id: 'init-14', status: '已进入面试', remark: '面试成绩在录取名单内，顺利通过第二轮最终测试', timestamp: '2026-05-24 18:25' }] },
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

const renderDurationTrack = (item: ScheduleItem) => {
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
  const [items, setItems] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('schedule_items_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // use default
      }
    }
    return initialScheduleItems;
  });

  // Modal States
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [remark, setRemark] = useState<string>('');

  // Persist items to localStore whenever they change
  useEffect(() => {
    localStorage.setItem('schedule_items_v2', JSON.stringify(items));
  }, [items]);

  const handleOpenRecord = (item: ScheduleItem, defaultStatus?: string) => {
    setSelectedItem(item);
    
    // Map current status to corresponding status options for high fidelity loading
    let statusToSelect = '未报名';
    const cleanStatus = item.status || '';
    if (defaultStatus) {
      statusToSelect = defaultStatus;
    } else if (cleanStatus.includes('缴费')) {
      statusToSelect = '已缴费';
    } else if (cleanStatus.includes('笔试') || cleanStatus.includes('准考证') || cleanStatus.includes('打印')) {
      statusToSelect = '已报名';
    } else if (cleanStatus.includes('通过') || cleanStatus.includes('面试')) {
      statusToSelect = '已进入面试';
    } else if (cleanStatus.includes('结束') || cleanStatus.includes('放弃')) {
      statusToSelect = '已放弃';
    } else if (cleanStatus.includes('报名') || cleanStatus.includes('审核')) {
      statusToSelect = '已报名';
    }
    
    setSelectedStatus(statusToSelect);
    setRemark('');
    setModalOpen(true);
  };

  const handleConfirm = () => {
    if (!selectedItem) return;

    // Create log entry with formatted UTC date relative:
    const timestampStr = new Date().toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).replace(/\//g, '-'); // "05-25 15:30"

    const newLog: StatusLog = {
      id: String(Date.now()),
      status: selectedStatus,
      remark: remark.trim() || `${selectedStatus}: 已记录进展`,
      timestamp: timestampStr,
    };

    // Auto-map user choice back to status / statusType lists for consistent filtering
    let newStatusType = selectedItem.statusType;
    let newStatusText = selectedItem.status;

    if (selectedStatus === '未报名') {
      newStatusType = '其他';
      newStatusText = '未报名';
    } else if (selectedStatus === '已报名') {
      newStatusType = '其他';
      newStatusText = '资格审核中';
    } else if (selectedStatus === '已缴费') {
      newStatusType = '其他';
      newStatusText = '已缴费';
    } else if (selectedStatus === '已进入面试') {
      newStatusType = '已完成';
      newStatusText = '考试已通过';
    } else if (selectedStatus === '已放弃') {
      newStatusType = '已完成';
      newStatusText = '已放弃';
    }

    setItems(prevItems => {
      const updated = prevItems.map(item => {
        if (item.id === selectedItem.id) {
          const currentLogs = item.logs || [];
          return {
            ...item,
            status: newStatusText,
            statusType: newStatusType,
            logs: [newLog, ...currentLogs]
          };
        }
        return item;
      });
      return updated;
    });

    setModalOpen(false);
    setSelectedItem(null);
  };

  const [activeFilter, setActiveFilter] = useState('全部');
  const [subFilter, setSubFilter] = useState<null | 'today' | 'upcoming'>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
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

  const filters = ['全部', '待缴费', '待打印', '待考试', '已完成'];

  const filteredItems = items.filter(item => {
    // Top filter overrides sub-filter if it's not "全部"
    if (activeFilter !== '全部') {
      if (activeFilter === '待考试') {
        return item.statusType === '待笔试';
      }
      return item.statusType === activeFilter;
    }
    
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

  const renderActionBtn = (item: ScheduleItem) => {
    const type = item.statusType;
    if (type.includes('缴费')) {
      return <button onClick={(e) => { e.stopPropagation(); handleOpenRecord(item, '已缴费'); }} className="px-4 py-1.5 bg-blue-600 text-white rounded-[8px] text-[12px] font-bold active:bg-blue-700 transition-[#007AFF] shadow-sm transform active:scale-95 duration-75">去缴费</button>;
    }
    if (type.includes('打印')) {
      return <button onClick={(e) => { e.stopPropagation(); handleOpenRecord(item, '已缴费'); }} className="px-3 py-1.5 text-blue-600 bg-blue-50 border border-blue-100 font-medium text-[12px] active:bg-blue-100 rounded-[8px] transition-colors shadow-sm active:scale-95 duration-75">去打印准考证</button>;
    }
    if (type.includes('笔试')) {
      return <button onClick={(e) => { e.stopPropagation(); handleOpenRecord(item); }} className="px-3 py-1.5 text-slate-500 bg-slate-50 border border-slate-200 font-medium text-[12px] active:bg-slate-100 rounded-[8px] transition-colors shadow-sm active:scale-95 duration-75">记录状态</button>;
    }
    if (type.includes('完成')) {
      return <button onClick={(e) => { e.stopPropagation(); handleOpenRecord(item); }} className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-[8px] text-[12px] font-bold active:bg-slate-150 transition-colors">历史记录</button>;
    }
    return <button onClick={(e) => { e.stopPropagation(); handleOpenRecord(item); }} className="px-3 py-1.5 text-slate-500 bg-slate-50 border border-slate-200 font-medium text-[12px] active:bg-slate-100 rounded-[8px] transition-colors shadow-sm active:scale-95 duration-75">记录状态</button>;
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
        <h1 className="text-xl font-black text-slate-900 tracking-tight mb-4 px-2">提醒</h1>
        
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
                  const grouped: { [key: string]: ScheduleItem[] } = {};
                  filteredItems.forEach(item => {
                    if (!grouped[item.dateLabel]) grouped[item.dateLabel] = [];
                    grouped[item.dateLabel].push(item);
                  });
                  
                  // Sort dates by dynamic sortOrder (desc: from soonest/latest date to furthest, asc: earlier date to later)
                  const sortedDates = Object.keys(grouped).sort((a, b) => {
                    return sortOrder === 'desc' ? b.localeCompare(a) : a.localeCompare(b);
                  });
                  
                  return sortedDates.map((date, index) => {
                    const itemsInDate = grouped[date];
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
                        <div className="flex items-center justify-between mb-3 pl-3 select-none">
                          <div className="flex items-center gap-3">
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
                                  <span>共 {itemsInDate.length} 个提醒</span>
                                  {itemsInDate.some(item => item.statusType === '待缴费') && <span className="w-1.5 h-1.5 rounded-full bg-orange-400" title="待缴费" />}
                                  {itemsInDate.some(item => item.statusType === '待打印') && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title="待打印" />}
                                  {itemsInDate.some(item => item.statusType === '待笔试') && <span className="w-1.5 h-1.5 rounded-full bg-red-500" title="待考试" />}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Dynamic Sorting Label Toggle (Display only on the first item in the list) */}
                          {index === 0 && (
                            <button
                              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 active:scale-95 text-[#007AFF] hover:text-blue-700 rounded-full text-[11px] font-semibold border border-slate-200/85 shadow-sm transition-all cursor-pointer mr-0.5 shrink-0"
                            >
                              <ArrowUpDown size={11} className="text-[#007AFF]" />
                              <span>{sortOrder === 'desc' ? '时间：由近及远' : '时间：由远及近'}</span>
                            </button>
                          )}
                        </div>
                        
                        {/* Card of the Day */}
                        <div className="bg-white rounded-[14px] border border-slate-200/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-slate-100 flex flex-col">
                          {itemsInDate.map((item) => (
                            <div 
                              key={item.id} 
                              onClick={() => handleOpenRecord(item)}
                              className={`p-3.5 hover:bg-slate-50/50 active:bg-slate-100/60 transition-all duration-150 relative cursor-pointer hover:border-slate-350 group/item ${getBorderAccentClass(item.statusType)}`}
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
                                  {renderActionBtn(item)}
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
                  <div 
                    key={item.id} 
                    onClick={() => handleOpenRecord(item)}
                    className={`bg-white rounded-[14px] border border-slate-200/60 p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] active:bg-slate-50/80 hover:bg-slate-50/50 hover:border-slate-300 cursor-pointer transition-colors ${getBorderAccentClass(item.statusType)}`}
                  >
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
                        {renderActionBtn(item)}
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

      {/* State Recording In-App Bottom Sheet Modal */}
      <AnimatePresence>
        {modalOpen && selectedItem && (
          <div className="absolute inset-0 z-55 overflow-hidden flex flex-col justify-end">
            {/* Backdrop (constrained to the app container) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setModalOpen(false);
                setSelectedItem(null);
              }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1.5px]"
            />

            {/* Bottom Sheet Modal Box (Slides up beautifully from the bottom) */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full bg-white rounded-t-[24px] shadow-[0_-8px_32px_rgba(15,23,42,0.15)] border-t border-slate-100 flex flex-col z-10 max-h-[82%] overflow-hidden pb-safe"
            >
              {/* Native Grab/Drag Handle Visual */}
              <div className="w-12 h-1.5 bg-slate-200 hover:bg-slate-300 rounded-full mx-auto mt-3 select-none shrink-0 cursor-grab active:cursor-grabbing" />

              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-3 pb-4 border-b border-slate-50 select-none shrink-0">
                <div className="flex flex-col text-left">
                  <h3 className="text-[17px] font-black text-slate-900 tracking-tight flex items-center gap-2">
                    记录报名状态
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-1 max-w-[270px] truncate leading-none">
                    {selectedItem.unit} · {selectedItem.position}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedItem(null);
                  }}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-90"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="px-5 py-4 overflow-y-auto flex-1 flex flex-col space-y-4.5 font-sans text-left min-h-0">
                {/* Status Selection Buttons */}
                <div>
                  <span className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                    选择报名状态
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['未报名', '已报名', '已缴费', '已进入面试', '已放弃'].map((status) => {
                      const isActive = selectedStatus === status;
                      return (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setSelectedStatus(status)}
                          className={`px-3 py-1.5 text-[12.5px] font-bold rounded-[10px] transition-all flex items-center gap-1.5 cursor-pointer border ${
                            isActive
                              ? 'bg-blue-50/70 border-blue-450 text-blue-600 shadow-[0_2px_8px_rgba(0,122,255,0.08)]'
                              : 'bg-slate-50/80 border-slate-200 text-slate-600 hover:bg-slate-100 active:scale-95'
                          }`}
                        >
                          {isActive && <Check size={11} strokeWidth={3} className="text-blue-600 shrink-0" />}
                          {status}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Remarks Textarea */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                      备注 (选填)
                    </span>
                    <span className="text-[10px] font-bold font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-[4px]">
                      {remark.length}/200
                    </span>
                  </div>
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value.slice(0, 200))}
                    placeholder="在这里记录考试进展（如笔试分、心路历程等）..."
                    className="w-full h-20 px-3 py-2 text-[12.5px] text-slate-800 placeholder-slate-400/80 bg-slate-50 border border-slate-200 rounded-[12px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Vertical Change History Timeline List */}
                <div className="flex-1 flex flex-col min-h-[130px] overflow-hidden">
                  <span className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                    状态变更记录
                  </span>
                  <div className="bg-slate-50/50 rounded-[16px] border border-slate-200/60 flex-1 flex flex-col min-h-0 overflow-hidden">
                    <div className="overflow-y-auto px-4 py-3 flex-1 min-h-0">
                      {(!selectedItem.logs || selectedItem.logs.length === 0) ? (
                        <div className="py-7 text-center text-slate-400 text-[11px] font-medium italic">
                          暂无记录
                        </div>
                      ) : (
                        <div className="relative pl-4 space-y-3.5 py-1.5">
                          {/* Timeline vertical stem */}
                          <div className="absolute left-[3.5px] top-2 bottom-2.5 w-[1.5px] bg-slate-200" />
                          
                          {selectedItem.logs.map((log) => (
                            <div key={log.id} className="relative text-left flex flex-col">
                              {/* Glowing Dot indicator */}
                              <div className="absolute -left-[16.5px] top-[4px] w-1.5 h-1.5 rounded-full bg-blue-500 ring-2 ring-blue-500/15 shadow-sm" />
                              
                              <div className="flex items-center justify-between text-[10px] mb-0.5">
                                <span className="font-extrabold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-[4px] tracking-wide text-[9.5px]">
                                  {log.status}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 font-mono">
                                  {log.timestamp}
                                </span>
                              </div>
                              <p className="text-[12px] text-slate-600 font-normal leading-relaxed pl-0.5 break-words">
                                {log.remark}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-100 bg-slate-50/50 select-none shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedItem(null);
                  }}
                  className="px-4 py-1.5 font-bold text-[12px] text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 rounded-[10px] transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="px-5 py-1.5 font-black text-[12px] text-white bg-blue-600 hover:bg-blue-700 rounded-[10px] shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  确定
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
