import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MapPin, Clock, Edit3, Building2, Search, Filter } from 'lucide-react';

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

export default function JobList({ title, onBack, onTrack }: JobListProps) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="absolute inset-0 bg-[#F2F2F7] z-50 flex flex-col h-full overflow-hidden"
    >
      {/* GitHub Style Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 pt-12 pb-3 px-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-blue-600 font-medium"
          >
            <ChevronLeft size={24} />
            <span className="text-[17px] -ml-1">返回</span>
          </button>
          <div className="flex gap-4">
            <button className="text-blue-600"><Search size={22} /></button>
            <button className="text-blue-600"><Filter size={22} /></button>
          </div>
        </div>
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight px-1">{title}</h1>
        </div>
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
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 mr-4">
                      <h3 className="text-[15px] font-semibold text-slate-900 mb-1 leading-snug group-active:text-blue-600 transition-colors">
                        {job.unit}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded cursor-default border border-blue-100/50">
                          {job.position}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        {job.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 mt-3 mb-4">
                    <div className="flex items-center text-slate-500 gap-1.5">
                      <MapPin size={14} className="text-slate-400" />
                      <span className="text-[12px]">{job.location}</span>
                    </div>
                    <div className="flex items-center text-slate-500 gap-1.5">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-[12px]">{job.time}</span>
                    </div>
                    <div className="flex items-center text-slate-500 gap-1.5 col-span-2">
                      <Building2 size={14} className="text-slate-400" />
                      <span className="text-[12px]">{job.type}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => onTrack?.(`${job.unit} - ${job.position}`, '已投递')}
                      className="flex-1 bg-[#EEF2FF] text-blue-600 py-2.5 rounded-[10px] font-bold text-[13px] flex items-center justify-center gap-1.5 active:bg-[#E0E7FF] transition-colors border border-blue-100/50 shadow-sm"
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
