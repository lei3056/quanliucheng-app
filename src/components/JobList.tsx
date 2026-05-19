import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, MapPin, Clock, Edit3, Building2, Search, Filter, FileText, ChevronRight, Check } from 'lucide-react';
import { examTypes, locationData } from './FilterData';

interface JobItem {
  id: string;
  unit: string;
  position: string;
  location: string;
  time: string;
  type: string;
  status: string;
}

interface JobListProps {
  title: string;
  onBack: () => void;
  onTrack?: (title: string, status: any) => void;
}

const mockJobs: JobItem[] = [
  { id: '1', unit: '营口市中心血站', position: '检验科检验师', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '2', unit: '营口市妇幼保健计划生育服务中心', position: '检验科检验师', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '3', unit: '营口市妇幼保健计划生育服务中心', position: '中医门诊医师', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '4', unit: '营口市第四人民医院', position: '医学影像医师', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '5', unit: '营口市第四人民医院', position: '检验医师', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '6', unit: '营口市第四人民医院', position: '精神科医生', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '7', unit: '营口市第三人民医院', position: '超声诊断医生', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '8', unit: '营口市第三人民医院', position: '医学检验', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '9', unit: '营口市第三人民医院', position: '内科医生', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '10', unit: '营口市第三人民医院', position: '药学', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '11', unit: '营口市疾病预防控制中心', position: '职业病防治', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
  { id: '12', unit: '营口市疾病预防控制中心', position: '传染病防治监督', location: '营口市', time: '05/16 - 05/16', type: '医疗卫生招聘', status: '报名未开始' },
];

const FilterModal = ({ isOpen, onClose, onApply, initialExam, initialLocation }: any) => {
  const [view, setView] = useState<'main' | 'examType' | 'province' | 'city' | 'county'>('main');
  const [examType, setExamType] = useState(initialExam);
  const [location, setLocation] = useState(initialLocation);
  
  const [selProv, setSelProv] = useState<number>(0);
  const [selCity, setSelCity] = useState<number>(0);

  React.useEffect(() => {
    if (isOpen) {
      setExamType(initialExam);
      setLocation(initialLocation);
      setView('main');
    }
  }, [isOpen, initialExam, initialLocation]);

  const renderHeader = () => {
    if (view === 'main') {
      return (
        <div className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-slate-200/60 relative">
          <button onClick={onClose} className="text-[#007AFF] text-[17px] active:opacity-50">取消</button>
          <span className="font-semibold text-[17px] text-slate-900 absolute left-1/2 -translate-x-1/2">筛选</span>
          <button 
            onClick={() => onApply(examType, location)} 
            className="text-[#007AFF] font-semibold text-[17px] active:opacity-50"
          >
            完成
          </button>
        </div>
      );
    }
    
    // For subscreens
    let title = '';
    if (view === 'examType') title = '考试类型';
    if (view === 'province') title = '选择省份';
    if (view === 'city') title = '选择城市';
    if (view === 'county') title = '选择区县';

    return (
      <div className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-slate-200/60 relative">
        <button 
          onClick={() => {
            if (view === 'examType' || view === 'province') setView('main');
            if (view === 'city') setView('province');
            if (view === 'county') setView('city');
          }} 
          className="text-[#007AFF] flex items-center -ml-1.5 active:opacity-50 z-10"
        >
          <ChevronLeft size={26} strokeWidth={2.5} />
          <span className="text-[17px] -ml-0.5">返回</span>
        </button>
        <span className="font-semibold text-[17px] text-slate-900 absolute left-1/2 -translate-x-1/2">{title}</span>
        <div className="w-12"></div>
      </div>
    );
  };

  const renderContent = () => {
    if (view === 'main') {
      return (
        <div className="p-4 bg-[#F2F2F7] flex-1">
          <div className="bg-white rounded-[10px] overflow-hidden">
            <button 
              onClick={() => setView('examType')}
              className="w-full flex items-center justify-between px-4 py-3.5 bg-white active:bg-slate-50 border-b border-slate-100 transition-colors"
            >
              <span className="text-[17px] text-slate-900">考试类型</span>
              <div className="flex items-center gap-1">
                <span className="text-[17px] text-slate-500">{examType}</span>
                <ChevronRight size={20} className="text-[#3C3C43]/30" />
              </div>
            </button>
            <button 
              onClick={() => setView('province')}
              className="w-full flex items-center justify-between px-4 py-3.5 bg-white active:bg-slate-50 transition-colors"
            >
              <span className="text-[17px] text-slate-900">工作地点</span>
              <div className="flex items-center gap-1">
                <span className="text-[17px] text-slate-500">{location}</span>
                <ChevronRight size={20} className="text-[#3C3C43]/30" />
              </div>
            </button>
          </div>
        </div>
      );
    }
    
    if (view === 'examType') {
      return (
        <div className="flex-1 overflow-y-auto bg-white mb-8">
          <button 
            onClick={() => { setExamType('全部'); setView('main'); }}
            className="w-full px-4 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
          >
            <span className="text-[17px] text-slate-900">全部</span>
            {examType === '全部' && <Check size={20} className="text-[#007AFF]" />}
          </button>
          {examTypes.map((t) => (
            <button 
              key={t}
              onClick={() => { setExamType(t); setView('main'); }}
              className="w-full px-4 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
            >
              <span className="text-[17px] text-slate-900">{t}</span>
              {examType === t && <Check size={20} className="text-[#007AFF]" />}
            </button>
          ))}
        </div>
      );
    }

    if (view === 'province') {
      return (
        <div className="flex-1 overflow-y-auto bg-white mb-8">
          <button 
            onClick={() => { setLocation('全部'); setView('main'); }}
            className="w-full px-4 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
          >
            <span className="text-[17px] text-slate-900">全部</span>
            {location === '全部' && <Check size={20} className="text-[#007AFF]" />}
          </button>
          {locationData.map((prov, i) => (
            <button 
              key={prov.province}
              onClick={() => { setSelProv(i); setView('city'); }}
              className="w-full px-4 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
            >
              <span className="text-[17px] text-slate-900">{prov.province}</span>
              <div className="flex items-center gap-1">
                <ChevronRight size={20} className="text-[#3C3C43]/30" />
              </div>
            </button>
          ))}
        </div>
      );
    }

    if (view === 'city') {
      const cities = locationData[selProv].cities;
      return (
        <div className="flex-1 overflow-y-auto bg-white mb-8">
          <button 
            onClick={() => { setLocation(locationData[selProv].province); setView('main'); }}
            className="w-full px-4 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50 bg-[#F2F2F7]/50"
          >
            <span className="text-[17px] text-slate-900 font-medium">全{locationData[selProv].province}</span>
          </button>
          {cities.map((c, i) => (
            <button 
              key={c.city}
              onClick={() => { setSelCity(i); setView('county'); }}
              className="w-full px-4 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
            >
              <span className="text-[17px] text-slate-900">{c.city}</span>
              <div className="flex items-center gap-1">
                <ChevronRight size={20} className="text-[#3C3C43]/30" />
              </div>
            </button>
          ))}
        </div>
      );
    }

    if (view === 'county') {
      const counties = locationData[selProv].cities[selCity].counties;
      return (
        <div className="flex-1 overflow-y-auto bg-white mb-8">
          <button 
            onClick={() => { setLocation(locationData[selProv].cities[selCity].city); setView('main'); }}
            className="w-full px-4 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50 bg-[#F2F2F7]/50"
          >
            <span className="text-[17px] text-slate-900 font-medium">全{locationData[selProv].cities[selCity].city}</span>
          </button>
          {counties.map((c) => {
            const locName = `${locationData[selProv].cities[selCity].city} - ${c}`;
            return (
              <button 
                key={c}
                onClick={() => { setLocation(locName); setView('main'); }}
                className="w-full px-4 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
              >
                <span className="text-[17px] text-slate-900">{c}</span>
                {location === locName && <Check size={20} className="text-[#007AFF]" />}
              </button>
            );
          })}
        </div>
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute inset-x-0 bottom-0 top-[8vh] bg-[#F2F2F7] z-[70] rounded-t-[12px] flex flex-col shadow-2xl overflow-hidden"
          >
            {renderHeader()}
            {renderContent()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function JobList({ title, onBack, onTrack }: JobListProps) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedExamType, setAppliedExamType] = useState('全部');
  const [appliedLocation, setAppliedLocation] = useState('全部');

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="absolute inset-0 bg-[#F2F2F7] z-50 flex flex-col h-full overflow-hidden"
    >
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        initialExam={appliedExamType}
        initialLocation={appliedLocation}
        onApply={(exam: string, loc: string) => {
          setAppliedExamType(exam);
          setAppliedLocation(loc);
          setIsFilterOpen(false);
        }}
      />
      
      {/* GitHub Style Header */}
      <div className="bg-white border-b border-slate-200/60 sticky top-0 z-30 pt-12 pb-3 px-4 h-[116px] flex flex-col justify-end">
        {!isSearchMode ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <button 
                onClick={onBack}
                className="flex items-center text-[#007AFF] font-medium"
              >
                <ChevronLeft size={28} strokeWidth={2.5} className="-ml-1.5" />
                <span className="text-[14px] ml-0.5">返回</span>
              </button>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsSearchMode(true)} 
                  className="text-[#007AFF]"
                >
                  <Search size={22} />
                </button>
                <button 
                  onClick={() => setIsFilterOpen(true)} 
                  className="text-[#007AFF]"
                >
                  <Filter size={22} />
                </button>
              </div>
            </div>
            <div>
              <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight px-1">{title}</h1>
            </div>
          </>
        ) : (
          <form 
            onSubmit={(e) => { e.preventDefault(); /* implement search logic if needed, currently list filters on the fly or just mock */ }}
            className="flex items-center gap-3 pb-2 pt-2"
          >
            <div className="flex-1 flex items-center bg-[#767680]/15 rounded-[10px] px-2 h-9">
              <Search size={16} className="text-[#3C3C43]/60 mr-1.5" />
              <input 
                autoFocus
                type="search" 
                placeholder="搜索岗位..." 
                className="flex-1 bg-transparent border-none outline-none text-[17px] text-slate-900 placeholder:text-[#3C3C43]/60 min-w-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery.length > 0 && (
              <button 
                type="submit"
                className="text-[#007AFF] font-medium text-[17px] active:opacity-50 whitespace-nowrap"
              >
                搜索
              </button>
            )}
            <button 
              type="button"
              onClick={() => { setIsSearchMode(false); setSearchQuery(''); }}
              className="text-[#007AFF] text-[17px] active:opacity-50 whitespace-nowrap"
            >
              取消
            </button>
          </form>
        )}
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="mt-4 px-4">
          <div className="bg-white rounded-[12px] shadow-sm border border-slate-200/60 overflow-hidden">
            {mockJobs.map((job, index) => (
              <div 
                key={job.id}
                className={`group active:bg-slate-50 transition-colors ${index !== mockJobs.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="text-[15px] font-semibold text-slate-900 mb-1 leading-snug group-active:text-blue-600 transition-colors">
                      {job.unit}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded cursor-default border border-blue-100/50">
                        {job.position}
                      </span>
                      <span className="text-[12px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50">
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-3 mb-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/50">
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center text-slate-500 gap-1.5">
                      <MapPin size={14} className="text-slate-400" />
                      <span className="text-[12px]">{job.location}</span>
                    </div>
                    <div className="flex items-center text-slate-500 gap-1.5">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-[12px]">{job.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 text-sm">
                    <button className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-[10px] font-bold text-[13px] text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm">
                      <FileText size={14} /> 详情
                    </button>
                    <button 
                      onClick={() => onTrack?.(`${job.unit} - ${job.position}`, '已投递')}
                      className="flex-1 bg-[#EEF2FF] text-blue-600 py-2 rounded-[10px] font-bold text-[13px] flex items-center justify-center gap-1.5 active:bg-[#E0E7FF] transition-colors border border-blue-100/50 shadow-sm"
                    >
                      <Edit3 size={14} />
                      记录报名状态
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="py-8 text-center">
            <p className="text-[13px] text-slate-400 font-medium">查看完整数据由官方提供支持</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
