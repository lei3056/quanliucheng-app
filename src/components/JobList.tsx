import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Edit3,
  Building2,
  Search,
  Filter,
  FileText,
  ChevronRight,
  Check,
  Bookmark,
  ThumbsDown,
  ChevronDown,
} from "lucide-react";
import { examTypes, locationData } from "./FilterData";

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
  {
    id: "13",
    unit: "淄博市博山区中医医院",
    position: "肿瘤科",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "14",
    unit: "淄博市博山区中医医院",
    position: "介入",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "15",
    unit: "淄博市博山区中医医院",
    position: "中医科",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "16",
    unit: "淄博市博山区中医医院",
    position: "麻醉科",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "17",
    unit: "淄博市博山区中医医院",
    position: "医学影像诊断",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "18",
    unit: "淄博市博山区中医医院",
    position: "外科",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "19",
    unit: "淄博市博山区中医医院",
    position: "内科",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "20",
    unit: "淄博市博山区人民医院",
    position: "中医科",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "21",
    unit: "淄博市博山区人民医院",
    position: "眼科",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "22",
    unit: "淄博市博山区人民医院",
    position: "内科",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "23",
    unit: "淄博市博山区人民医院",
    position: "外科",
    location: "淄博市 - 博山区",
    time: "05/19 - 05/25",
    type: "医疗卫生招聘",
    status: "报名进行中",
  },
  {
    id: "1",
    unit: "营口市中心血站",
    position: "检验科检验师",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "2",
    unit: "营口市妇幼保健计划生育服务中心",
    position: "检验科检验师",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "3",
    unit: "营口市妇幼保健计划生育服务中心",
    position: "中医门诊医师",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "4",
    unit: "营口市第四人民医院",
    position: "医学影像医师",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "5",
    unit: "营口市第四人民医院",
    position: "检验医师",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "6",
    unit: "营口市第四人民医院",
    position: "精神科医生",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "7",
    unit: "营口市第三人民医院",
    position: "超声诊断医生",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "8",
    unit: "营口市第三人民医院",
    position: "医学检验",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "9",
    unit: "营口市第三人民医院",
    position: "内科医生",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "10",
    unit: "营口市第三人民医院",
    position: "药学",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "11",
    unit: "营口市疾病预防控制中心",
    position: "职业病防治",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
  {
    id: "12",
    unit: "营口市疾病预防控制中心",
    position: "传染病防治监督",
    location: "营口市",
    time: "05/16 - 05/16",
    type: "医疗卫生招聘",
    status: "报名未开始",
  },
];

const FilterModal = ({
  isOpen,
  onClose,
  onApply,
  initialExam,
  initialLocation,
}: any) => {
  const [view, setView] = useState<
    "main" | "examType" | "province" | "city" | "county"
  >("main");
  const [examType, setExamType] = useState(initialExam);
  const [location, setLocation] = useState(initialLocation);

  const [selProv, setSelProv] = useState<number>(0);
  const [selCity, setSelCity] = useState<number>(0);

  React.useEffect(() => {
    if (isOpen) {
      setExamType(initialExam);
      setLocation(initialLocation);
      setView("main");
    }
  }, [isOpen, initialExam, initialLocation]);

  const renderHeader = () => {
    if (view === "main") {
      return (
        <div className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-slate-200/60 relative">
          <button
            onClick={onClose}
            className="text-primary-600 text-[17px] active:opacity-50"
          >
            取消
          </button>
          <span className="font-semibold text-[17px] text-slate-900 absolute left-1/2 -translate-x-1/2">
            筛选
          </span>
          <button
            onClick={() => onApply(examType, location)}
            className="text-primary-600 font-semibold text-[17px] active:opacity-50"
          >
            完成
          </button>
        </div>
      );
    }

    // For subscreens
    let title = "";
    if (view === "examType") title = "考试类型";
    if (view === "province") title = "选择省份";
    if (view === "city") title = "选择城市";
    if (view === "county") title = "选择区县";

    return (
      <div className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-slate-200/60 relative">
        <button
          onClick={() => {
            if (view === "examType" || view === "province") setView("main");
            if (view === "city") setView("province");
            if (view === "county") setView("city");
          }}
          className="text-primary-600 flex items-center -ml-1.5 active:opacity-50 z-10"
        >
          <ChevronLeft size={26} strokeWidth={2.5} />
          <span className="text-[17px] -ml-0.5">返回</span>
        </button>
        <span className="font-semibold text-[17px] text-slate-900 absolute left-1/2 -translate-x-1/2">
          {title}
        </span>
        <div className="w-12"></div>
      </div>
    );
  };

  const renderContent = () => {
    if (view === "main") {
      return (
        <div className="p-4 bg-[#F2F2F7] flex-1">
          <div className="bg-white rounded-[10px] overflow-hidden">
            <button
              onClick={() => setView("examType")}
              className="w-full flex items-center justify-between px-6 py-3.5 bg-white active:bg-slate-50 border-b border-slate-100 transition-colors"
            >
              <span className="text-[17px] text-slate-900">考试类型</span>
              <div className="flex items-center gap-1">
                <span className="text-[17px] text-slate-500">{examType}</span>
                <ChevronRight size={20} className="text-[#3C3C43]/30" />
              </div>
            </button>
            <button
              onClick={() => setView("province")}
              className="w-full flex items-center justify-between px-6 py-3.5 bg-white active:bg-slate-50 transition-colors"
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

    if (view === "examType") {
      return (
        <div className="flex-1 overflow-y-auto bg-white mb-8">
          <button
            onClick={() => {
              setExamType("全部");
              setView("main");
            }}
            className="w-full px-6 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
          >
            <span className="text-[17px] text-slate-900">全部</span>
            {examType === "全部" && (
              <Check size={20} className="text-primary-600" />
            )}
          </button>
          {examTypes.map((t) => (
            <button
              key={t}
              onClick={() => {
                setExamType(t);
                setView("main");
              }}
              className="w-full px-6 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
            >
              <span className="text-[17px] text-slate-900">{t}</span>
              {examType === t && <Check size={20} className="text-primary-600" />}
            </button>
          ))}
        </div>
      );
    }

    if (view === "province") {
      return (
        <div className="flex-1 overflow-y-auto bg-white mb-8">
          <button
            onClick={() => {
              setLocation("全部");
              setView("main");
            }}
            className="w-full px-6 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
          >
            <span className="text-[17px] text-slate-900">全部</span>
            {location === "全部" && (
              <Check size={20} className="text-primary-600" />
            )}
          </button>
          {locationData.map((prov, i) => (
            <button
              key={prov.province}
              onClick={() => {
                setSelProv(i);
                setView("city");
              }}
              className="w-full px-6 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
            >
              <span className="text-[17px] text-slate-900">
                {prov.province}
              </span>
              <div className="flex items-center gap-1">
                <ChevronRight size={20} className="text-[#3C3C43]/30" />
              </div>
            </button>
          ))}
        </div>
      );
    }

    if (view === "city") {
      const cities = locationData[selProv].cities;
      return (
        <div className="flex-1 overflow-y-auto bg-white mb-8">
          <button
            onClick={() => {
              setLocation(locationData[selProv].province);
              setView("main");
            }}
            className="w-full px-6 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50 bg-[#F2F2F7]/50"
          >
            <span className="text-[17px] text-slate-900 font-medium">
              全{locationData[selProv].province}
            </span>
          </button>
          {cities.map((c, i) => (
            <button
              key={c.city}
              onClick={() => {
                setSelCity(i);
                setView("county");
              }}
              className="w-full px-6 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
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

    if (view === "county") {
      const counties = locationData[selProv].cities[selCity].counties;
      return (
        <div className="flex-1 overflow-y-auto bg-white mb-8">
          <button
            onClick={() => {
              setLocation(locationData[selProv].cities[selCity].city);
              setView("main");
            }}
            className="w-full px-6 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50 bg-[#F2F2F7]/50"
          >
            <span className="text-[17px] text-slate-900 font-medium">
              全{locationData[selProv].cities[selCity].city}
            </span>
          </button>
          {counties.map((c) => {
            const locName = `${locationData[selProv].cities[selCity].city} - ${c}`;
            return (
              <button
                key={c}
                onClick={() => {
                  setLocation(locName);
                  setView("main");
                }}
                className="w-full px-6 py-3.5 border-b border-slate-100 flex justify-between items-center active:bg-slate-50"
              >
                <span className="text-[17px] text-slate-900">{c}</span>
                {location === locName && (
                  <Check size={20} className="text-primary-600" />
                )}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
  const [searchQuery, setSearchQuery] = useState("");

  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("全部");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedExamType, setAppliedExamType] = useState("全部");
  const [appliedLocation, setAppliedLocation] = useState("全部");

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [lastHiddenId, setLastHiddenId] = useState<string | null>(null);
  const [showUndoToast, setShowUndoToast] = useState(false);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const hideJob = (id: string) => {
    setHiddenIds((prev) => [...prev, id]);
    setLastHiddenId(id);
    setShowUndoToast(true);
  };

  const undoLastHide = () => {
    if (lastHiddenId) {
      setHiddenIds((prev) => prev.filter((id) => id !== lastHiddenId));
      setLastHiddenId(null);
      setShowUndoToast(false);
    }
  };

  React.useEffect(() => {
    if (showUndoToast) {
      const timer = setTimeout(() => {
        setShowUndoToast(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [showUndoToast, lastHiddenId]);

  const filteredJobs = mockJobs.filter((job) => {
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchUnit = job.unit.toLowerCase().includes(q);
      const matchPos = job.position.toLowerCase().includes(q);
      if (!matchUnit && !matchPos) return false;
    }
    if (appliedExamType !== "全部") {
      const cleanExam = appliedExamType.replace(/类|招聘/g, "");
      const match =
        job.type.toLowerCase().includes(cleanExam.toLowerCase()) ||
        job.unit.toLowerCase().includes(cleanExam.toLowerCase()) ||
        appliedExamType.toLowerCase().includes(job.type.toLowerCase());
      if (!match) return false;
    }
    if (appliedLocation !== "全部") {
      const cleanLoc = appliedLocation.split(" - ").pop() || "";
      const match =
        job.location.includes(cleanLoc) || cleanLoc.includes(job.location);
      if (!match) return false;
    }
    return true;
  });

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
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
      <div className="bg-white border-b border-slate-200/60 sticky top-0 z-30 pt-12 pb-3 px-6 h-[116px] flex flex-col justify-end">
        {!isSearchMode ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <button
                onClick={onBack}
                className="flex items-center text-primary-600 font-medium"
              >
                <ChevronLeft size={28} strokeWidth={2.5} className="-ml-1.5" />
                <span className="text-[14px] ml-0.5">返回</span>
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsSearchMode(true)}
                  className="text-primary-600"
                >
                  <Search size={22} />
                </button>
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="text-primary-600"
                >
                  <Filter size={22} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h1 className="text-[20px] font-bold text-slate-900 tracking-tight leading-tight px-1">
                {title}
              </h1>
              <div className="relative">
                <button
                  onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                  className="flex items-center gap-1.5 text-[13px] bg-white border border-slate-200/60 pl-2.5 pr-2 py-1.5 rounded-[8px] active:bg-slate-50 shadow-sm transition-colors"
                >
                  <span className="text-slate-500 font-medium">报名时间</span>
                  <div className="flex items-center gap-0.5 border-l border-slate-200/80 pl-1.5 text-slate-800">
                    <span className="font-semibold">{selectedTimeFilter}</span>
                    <ChevronDown
                      size={14}
                      className={`text-slate-400 transition-transform ${isTimeDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isTimeDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsTimeDropdownOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-[110%] w-[110px] bg-white border border-slate-200/60 rounded-[10px] shadow-lg z-50 py-1 overflow-hidden origin-top-right"
                      >
                        {["全部", "今日", "三日内", "七日内"].map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSelectedTimeFilter(option);
                              setIsTimeDropdownOpen(false);
                            }}
                            className={`w-full text-center px-6 py-2.5 text-[14px] transition-colors ${
                              selectedTimeFilter === option
                                ? "text-primary-600 font-bold bg-primary-50/70"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault(); /* implement search logic if needed, currently list filters on the fly or just mock */
            }}
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
                className="text-primary-600 font-medium text-[17px] active:opacity-50 whitespace-nowrap"
              >
                搜索
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsSearchMode(false);
                setSearchQuery("");
              }}
              className="text-primary-600 text-[17px] active:opacity-50 whitespace-nowrap"
            >
              取消
            </button>
          </form>
        )}
      </div>

      {/* List Container */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="mt-4 px-6 font-sans">
          <div className="bg-white rounded-[12px] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.05)] border border-slate-200/60 overflow-hidden">
            {filteredJobs.filter((job) => !hiddenIds.includes(job.id))
              .length === 0 ? (
              <div className="py-12 px-4 text-center">
                <Search size={32} className="text-slate-300 mx-auto mb-2" />
                <p className="text-[15px] text-slate-500 font-medium mb-1">
                  未找到符合条件的岗位
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setAppliedExamType("全部");
                    setAppliedLocation("全部");
                    setHiddenIds([]);
                  }}
                  className="text-primary-600 text-[13px] font-semibold active:opacity-50 mt-1"
                >
                  清除所有筛选
                </button>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {filteredJobs
                  .filter((job) => !hiddenIds.includes(job.id))
                  .map((job, index, arr) => (
                    <motion.div
                      key={job.id}
                      layout
                      initial={{ opacity: 1, x: 0, height: "auto" }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      exit={{
                        opacity: 0,
                        x: -250,
                        height: 0,
                        transition: {
                          x: { type: "spring", damping: 25, stiffness: 200 },
                          opacity: { duration: 0.15 },
                          height: { delay: 0.08, duration: 0.2 },
                        },
                      }}
                      onClick={() =>
                        onTrack?.(`${job.unit} - ${job.position}`, "已投递")
                      }
                      className={`group select-none cursor-pointer transition-all duration-150 active:scale-[0.985] active:bg-slate-100/80 hover:bg-slate-50/40 relative overflow-hidden ${index !== arr.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                      <div className="p-4 pr-12 relative">
                        <div className="mb-2 pr-4">
                          <h3 className="text-[15px] font-semibold text-slate-900 mb-1 leading-snug group-active:text-primary-600 transition-colors">
                            {job.unit}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded cursor-default border border-primary-100/50">
                              {job.position}
                            </span>
                            <span className="text-[12px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50">
                              {job.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2.5 mb-1 text-slate-500 text-left">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            <span className="text-[12px] font-medium text-slate-600">
                              {job.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={13} className="text-[#94A3B8]" />
                            <span className="text-[12px] font-sans text-slate-500">
                              {job.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={13} className="text-[#94A3B8]" />
                            <span className="text-[12px] font-sans text-slate-500">
                              {job.time}
                            </span>
                          </div>
                        </div>

                        {/* Top Right Actions Stack */}
                        <div className="absolute top-4 right-3.5 flex flex-col items-center gap-2.5 z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(job.id);
                            }}
                            className="p-1 rounded-full hover:bg-slate-100 active:scale-110 transition-transform flex items-center justify-center text-[#8E8E93]"
                          >
                            <Bookmark
                              size={18}
                              className={
                                bookmarkedIds.includes(job.id)
                                  ? "text-primary-600 fill-primary-600"
                                  : ""
                              }
                            />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              hideJob(job.id);
                            }}
                            className="p-1 rounded-full hover:bg-slate-100 active:scale-110 transition-transform flex items-center justify-center text-[#8E8E93]"
                          >
                            <ThumbsDown
                              size={18}
                              className="hover:text-[#FF3B30]"
                            />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            )}
          </div>

          <div className="py-8 text-center">
            <p className="text-[13px] text-slate-400 font-medium">
              查看完整数据由官方提供支持
            </p>
          </div>
        </div>
      </div>

      {/* iOS Style Undo Toast Bar */}
      <AnimatePresence>
        {showUndoToast && (
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            className="absolute bottom-10 left-6 right-6 bg-[#1C1C1E]/95 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/10 flex items-center justify-between z-50 overflow-hidden"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-[#3A3A3C] rounded-full flex items-center justify-center">
                <ThumbsDown size={11} className="text-white fill-current" />
              </div>
              <span className="text-[14px] font-medium text-slate-200">
                已隐藏此岗位
              </span>
            </div>
            <button
              onClick={undoLastHide}
              className="text-[#0A84FF] text-[14px] font-bold tracking-wide hover:brightness-125 px-2 py-0.5 select-none active:opacity-50"
            >
              撤销
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
