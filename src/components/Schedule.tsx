import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, RefreshCw } from 'lucide-react';

const scheduleItems = [
  { id: 1, dateLabel: '05-15 周四', unit: '北京市人社局事业单位', position: '综合管理岗', status: '待笔试', statusType: '待笔试' },
  { id: 2, dateLabel: '05-18 周日', unit: '上海市人民法院', position: '法官助理', status: '待缴费', statusType: '待缴费' },
  { id: 3, dateLabel: '05-20 周二', unit: '杭州市余杭区政府', position: '综合管理储备干部', status: '待打印准考证', statusType: '待打印' },
  { id: 4, dateLabel: '05-01 周四', unit: '绵阳经济技术开发区三江小学', position: '小学语文教师', status: '报名阶段', statusType: '其他' },
  { id: 5, dateLabel: '04-10 周三', unit: '吉安东管理中心', position: '文秘宣传岗', status: '已结束', statusType: '已完成' },
];

export default function Schedule() {
  const [activeFilter, setActiveFilter] = useState('全部');
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
    if (activeFilter === '全部') return true;
    return item.statusType === activeFilter;
  });

  const getStatusStyle = (type: string) => {
    if (type.includes('缴费')) return 'text-orange-600 bg-orange-50 border-orange-100';
    if (type.includes('打印')) return 'text-blue-600 bg-blue-50 border-blue-100';
    if (type.includes('笔试')) return 'text-red-600 bg-red-50 border-red-100';
    if (type.includes('完成')) return 'text-slate-500 bg-slate-100 border-slate-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  const renderActionBtn = (type: string) => {
    if (type.includes('缴费')) {
      return <button className="px-5 py-[7px] bg-blue-600 text-white rounded-[8px] text-[13px] font-bold active:bg-blue-700 transition-colors">去缴费</button>;
    }
    if (type.includes('打印')) {
      return <button className="px-3 py-[7px] text-blue-600 font-medium text-[13px] active:bg-blue-50 rounded-[8px] transition-colors">去打印准考证</button>;
    }
    if (type.includes('笔试')) {
      return <button className="px-3 py-[7px] text-slate-500 font-medium text-[13px] active:bg-slate-100 rounded-[8px] transition-colors">设置提醒</button>;
    }
    if (type.includes('完成')) {
      return <button disabled className="px-5 py-[7px] bg-slate-100 text-slate-400 rounded-[8px] text-[13px] font-medium cursor-not-allowed">已结束</button>;
    }
    return <button className="px-3 py-[7px] text-slate-500 font-medium text-[13px] active:bg-slate-100 rounded-[8px] transition-colors">查看详情</button>;
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
        <h1 className="text-[16px] font-bold text-slate-900 text-center tracking-tight mb-4">日程</h1>
        
        {/* Filters */}
        <div className="flex justify-between gap-1.5 pb-1 w-full">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-1 py-1.5 rounded-full text-[12px] font-medium transition-colors border text-center whitespace-nowrap px-1 ${
                activeFilter === filter 
                ? 'bg-blue-600 text-white border-blue-600' 
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
          <div className="flex gap-2.5 mb-4 max-w-full">
            <div className="flex-1 bg-red-50/80 rounded-[8px] p-2.5 flex items-center gap-1.5 border border-red-100/60 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></div>
              <span className="text-[12px] text-red-600 truncate"><span className="font-bold">今日待办：</span>1 项</span>
            </div>
            <div className="flex-1 bg-orange-50/80 rounded-[8px] p-2.5 flex items-center gap-1.5 border border-orange-100/60 min-w-0">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></div>
              <span className="text-[12px] text-orange-600 truncate"><span className="font-bold">即将截止：</span>3 项</span>
            </div>
          </div>

          {/* Schedule List */}
          {filteredItems.length > 0 ? (
            <div className="flex flex-col gap-3">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-[10px] border border-slate-200/60 p-3.5 shadow-sm active:bg-slate-50/80 transition-colors">
                  {/* Card Header: Date */}
                  <div className="text-[12px] text-slate-500 mb-2.5">
                    {item.dateLabel}
                  </div>
                  
                  {/* Card Body */}
                  <div className="mb-4">
                    <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-1">{item.unit}</h3>
                    <p className="text-[14px] text-slate-600 mb-2.5">{item.position}</p>
                    <div className="flex">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${getStatusStyle(item.statusType)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Footer */}
                  <div className="flex justify-end pt-3 border-t border-slate-100/80">
                    {renderActionBtn(item.statusType)}
                  </div>
                </div>
              ))}
            </div>
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
