import React, { useState, useRef, useEffect } from "react";
import {
  Bookmark,
  Building2,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  Clock,
  Edit3,
  FileText,
  Flame,
  Loader2,
  MapPin,
  MoreHorizontal,
  MessageSquare,
  RefreshCw,
  Search,
  Star,
  Target,
  AlarmClock,
  ThumbsDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Home({
  onNavigate,
  onTrack,
  onShowList,
}: {
  onNavigate?: (
    tab:
      | "home"
      | "study"
      | "schedule"
      | "profile"
      | "favorites"
      | "targeted"
      | "jobListing",
  ) => void;
  onTrack?: (title: string, status: any) => void;
  onShowList?: (title: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<
    "overview" | "focused" | "favorites"
  >("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [pullY, setPullY] = useState(0);
  const startY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (
      scrollContainerRef.current?.scrollTop === 0 &&
      activeFilter === "focused"
    ) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current > 0 && activeFilter === "focused") {
      const y = e.touches[0].clientY - startY.current;
      if (y > 0 && y < 100) {
        setPullY(y);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullY > 50 && activeFilter === "focused") {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1500);
    }
    startY.current = 0;
    setPullY(0);
  };

  const handleScroll = () => {
    if (activeFilter === "focused" && scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20 && !isLoadingMore) {
        setIsLoadingMore(true);
        setTimeout(() => {
          setIsLoadingMore(false);
        }, 1500);
      }
    }
  };

  const colorStyles: Record<
    string,
    { bg: string; text: string; badgeBg: string; badgeBorder: string }
  > = {
    teal: {
      bg: "bg-teal-500",
      text: "text-teal-600",
      badgeBg: "bg-teal-50",
      badgeBorder: "border-teal-100/50",
    },
    amber: {
      bg: "bg-amber-500",
      text: "text-amber-600",
      badgeBg: "bg-amber-50",
      badgeBorder: "border-amber-100/50",
    },
    primary: {
      bg: "bg-primary-500",
      text: "text-primary-600",
      badgeBg: "bg-primary-50",
      badgeBorder: "border-primary-100/50",
    },
    indigo: {
      bg: "bg-indigo-500",
      text: "text-indigo-600",
      badgeBg: "bg-indigo-50",
      badgeBorder: "border-indigo-100/50",
    },
    slate: {
      bg: "bg-slate-500",
      text: "text-slate-600",
      badgeBg: "bg-slate-50",
      badgeBorder: "border-slate-100/50",
    },
  };

  const focusedItems = [
    {
      unit: "弥勒市元亨社会工作服务中心",
      position: "社工岗位",
      location: "红河",
      edu: "大专",
      special: "不限专业",
      deadline: "截止: 04-23",
      status: "进行中",
      statusColor: "emerald",
      type: "事业单位",
      color: "teal",
    },
    {
      unit: "反兴奋剂中心",
      position: "行政专员",
      location: "北京",
      edu: "本科",
      special: "党员",
      deadline: "截止: 04-23",
      status: "进行中",
      statusColor: "emerald",
      type: "事业单位",
      color: "teal",
    },
    {
      unit: "深圳市公安局",
      position: "勤务辅警",
      location: "深圳",
      edu: "大专",
      special: "退伍军人优先",
      deadline: "截止: 04-23",
      status: "进行中",
      statusColor: "emerald",
      type: "事业单位",
      color: "teal",
    },
    {
      unit: "柳北区民政局",
      position: "协助管理岗",
      location: "柳州",
      edu: "大专",
      special: "特困人员",
      deadline: "截止: 04-23",
      status: "进行中",
      statusColor: "emerald",
      type: "公益性岗位",
      color: "amber",
    },
    {
      unit: "成都市武侯区教育局",
      position: "数学教师 (事业编)",
      location: "成都",
      edu: "本科",
      special: "1:12竞考",
      deadline: "截止: 05-12",
      status: "进行中",
      statusColor: "emerald",
      type: "事业编",
      color: "teal",
    },
    {
      unit: "杭州市余杭区政府",
      position: "综合管理储备干部",
      location: "杭州",
      edu: "硕士",
      special: "无限制",
      deadline: "截止: 04-10",
      status: "已结束",
      statusColor: "slate",
      type: "公务员",
      color: "primary",
    },
    {
      unit: "绵阳经济技术开发区三江小学",
      position: "小学语文教师",
      location: "绵阳",
      edu: "本科",
      special: "无限制",
      deadline: "发布: 04-27",
      status: "报名未开始",
      statusColor: "primary",
      type: "事业编",
      color: "teal",
    },
    {
      unit: "吉安东管理中心",
      position: "文秘宣传岗",
      location: "吉安",
      edu: "本科",
      special: "校招",
      deadline: "截止: 05-06",
      status: "进行中",
      statusColor: "amber",
      type: "国企",
      color: "indigo",
    },
    {
      unit: "南昌市青云谱区卫健委",
      position: "公共卫生干事",
      location: "南昌",
      edu: "本科",
      special: "事业编",
      deadline: "截止: 05-15",
      status: "报名中",
      statusColor: "amber",
      type: "事业编",
      color: "teal",
    },
    {
      unit: "成都市某区税务局",
      position: "税务专员",
      location: "成都",
      edu: "本科",
      special: "应届生",
      deadline: "截止: 05-20",
      status: "报名未开始",
      statusColor: "primary",
      type: "公务员",
      color: "primary",
    },
    {
      unit: "杭州某知名研究机构",
      position: "研究助理",
      location: "杭州",
      edu: "硕士",
      special: "理工科专业",
      deadline: "截止: 05-30",
      status: "进行中",
      statusColor: "emerald",
      type: "事业单位",
      color: "teal",
    },
    {
      unit: "宁波市交通警察局",
      position: "交通辅警",
      location: "宁波",
      edu: "大专",
      special: "本地户口",
      deadline: "截止: 05-01",
      status: "进行中",
      statusColor: "emerald",
      type: "辅警",
      color: "slate",
    },
    {
      unit: "上海市人民法院",
      position: "法官助理",
      location: "上海",
      edu: "硕士",
      special: "需法考A证",
      deadline: "截止: 05-05",
      status: "进行中",
      statusColor: "emerald",
      type: "公务员",
      color: "primary",
    },
    {
      unit: "北京市东城区教委",
      position: "行政管理",
      location: "北京",
      edu: "本科",
      special: "京籍",
      deadline: "截止: 05-18",
      status: "报名未开始",
      statusColor: "primary",
      type: "事业编",
      color: "teal",
    },
    {
      unit: "广州市天河区税务局",
      position: "大厅服务人员",
      location: "广州",
      edu: "大专",
      special: "无限制",
      deadline: "截止: 05-10",
      status: "进行中",
      statusColor: "emerald",
      type: "劳务派遣",
      color: "slate",
    },
  ];

  const favoritesItems = [
    {
      unit: "成都市武侯区教育局",
      position: "数学教师 (事业编)",
      location: "成都",
      edu: "本科",
      special: "1:12竞考",
      deadline: "截止: 05-12",
      status: "进行中",
      statusColor: "emerald",
      isHot: true,
    },
    {
      unit: "杭州市余杭区政府",
      position: "综合管理储备干部",
      location: "杭州",
      edu: "硕士",
      special: "无限制",
      deadline: "截止: 04-10",
      status: "已结束",
      statusColor: "slate",
      isHot: false,
    },
    {
      unit: "绵阳经济技术开发区三江小学",
      position: "小学语文教师",
      location: "绵阳",
      edu: "本科",
      special: "无限制",
      deadline: "发布: 04-27",
      status: "报名未开始",
      statusColor: "primary",
      isHot: true,
    },
    {
      unit: "吉安东管理中心",
      position: "文秘宣传岗",
      location: "吉安",
      edu: "本科",
      special: "校招",
      deadline: "截止: 05-06",
      status: "进行中",
      statusColor: "amber",
      isHot: true,
    },
    {
      unit: "南昌市青云谱区卫健委",
      position: "公共卫生干事",
      location: "南昌",
      edu: "本科",
      special: "事业编",
      deadline: "截止: 05-15",
      status: "报名中",
      statusColor: "amber",
      isHot: true,
    },
    {
      unit: "弥勒市元亨社会工作服务中心",
      position: "综合岗位",
      location: "弥勒",
      edu: "本科",
      special: "事业编",
      deadline: "截止: 04-23",
      status: "已结束",
      statusColor: "slate",
      isHot: false,
    },
    {
      unit: "反兴奋剂中心",
      position: "宣传干事",
      location: "北京",
      edu: "硕士",
      special: "事业编",
      deadline: "截止: 04-23",
      status: "已结束",
      statusColor: "slate",
      isHot: false,
    },
    {
      unit: "深圳市公安局",
      position: "辅警",
      location: "深圳",
      edu: "大专",
      special: "事业编",
      deadline: "截止: 04-23",
      status: "已结束",
      statusColor: "slate",
      isHot: false,
    },
    {
      unit: "柳北区民政局",
      position: "社会救助协理员",
      location: "柳州",
      edu: "大专",
      special: "公益岗",
      deadline: "截止: 04-23",
      status: "已结束",
      statusColor: "slate",
      isHot: false,
    },
    {
      unit: "成都市某区税务局",
      position: "信息记录员",
      location: "成都",
      edu: "本科",
      special: "编外",
      deadline: "截止: 05-20",
      status: "报名中",
      statusColor: "amber",
      isHot: true,
    },
    {
      unit: "杭州某知名研究机构",
      position: "研究员助理",
      location: "杭州",
      edu: "硕士",
      special: "合同制",
      deadline: "截止: 05-30",
      status: "报名未开始",
      statusColor: "primary",
      isHot: false,
    },
    {
      unit: "宁波市交通警察局",
      position: "交通辅警",
      location: "宁波",
      edu: "大专",
      special: "编外",
      deadline: "截止: 05-01",
      status: "进行中",
      statusColor: "emerald",
      isHot: false,
    },
    {
      unit: "上海市人民法院",
      position: "书记员",
      location: "上海",
      edu: "本科",
      special: "法学",
      deadline: "截止: 05-05",
      status: "进行中",
      statusColor: "emerald",
      isHot: true,
    },
    {
      unit: "北京市东城区教委",
      position: "初中英语教师",
      location: "北京",
      edu: "本科",
      special: "师范",
      deadline: "截止: 05-18",
      status: "报名中",
      statusColor: "amber",
      isHot: true,
    },
    {
      unit: "广州市天河区税务局",
      position: "办税服务员",
      location: "广州",
      edu: "本科",
      special: "劳务",
      deadline: "截止: 05-10",
      status: "进行中",
      statusColor: "emerald",
      isHot: false,
    },
  ];

  const [bookmarkedKeys, setBookmarkedKeys] = useState<string[]>(() =>
    favoritesItems.map((item) => `${item.unit}_${item.position}`),
  );
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [lastHiddenKey, setLastHiddenKey] = useState<string | null>(null);
  const [showUndoToast, setShowUndoToast] = useState(false);

  const toggleBookmark = (key: string) => {
    setBookmarkedKeys((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key],
    );
  };

  const hideJob = (key: string) => {
    setHiddenKeys((prev) => [...prev, key]);
    setLastHiddenKey(key);
    setShowUndoToast(true);
  };

  const undoLastHide = () => {
    if (lastHiddenKey) {
      setHiddenKeys((prev) => prev.filter((k) => k !== lastHiddenKey));
      setLastHiddenKey(null);
      setShowUndoToast(false);
    }
  };

  useEffect(() => {
    if (showUndoToast) {
      const timer = setTimeout(() => {
        setShowUndoToast(false);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [showUndoToast, lastHiddenKey]);

  // Dynamic focused items (excluding hidden ones)
  const displayFocused = focusedItems.filter((item) => {
    const key = `${item.unit}_${item.position}`;
    return !hiddenKeys.includes(key);
  });

  // Dynamic favorites: merge both, filter down to bookmarked keys, excluding hidden ones
  const displayFavorites = [
    ...favoritesItems,
    ...focusedItems.filter(
      (focused) =>
        !favoritesItems.some(
          (fav) =>
            fav.unit === focused.unit && fav.position === focused.position,
        ),
    ),
  ].filter((item) => {
    const key = `${item.unit}_${item.position}`;
    return bookmarkedKeys.includes(key) && !hiddenKeys.includes(key);
  });

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
      <div className="pt-12 pb-1.5 px-6 sticky top-0 bg-[#F2F2F7] z-20">
        <div className="flex justify-between items-center mb-1.5 px-1">
          <div className="w-8 h-8 flex items-center justify-center bg-slate-200/50 rounded-full">
            <Target className="text-slate-900" size={18} />
          </div>
          <button className="text-primary-600">
            <MessageSquare size={22} />
          </button>
        </div>

        {/* Filter Segmented Control (Line Tabs) */}
        <div className="flex w-full mt-1 border-b border-slate-200">
          <button
            onClick={() => setActiveFilter("overview")}
            className={`flex-1 py-2.5 text-[14px] font-medium relative transition-colors ${activeFilter === "overview" ? "text-primary-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            我的岗位
            {activeFilter === "overview" && (
              <motion.div
                layoutId="home-active-tab"
                className="absolute bottom-[-1px] left-1/4 right-1/4 h-[3px] bg-primary-600 rounded-t-full z-10"
              />
            )}
          </button>
          <button
            onClick={() => setActiveFilter("focused")}
            className={`flex-1 py-2.5 text-[14px] font-medium relative transition-colors ${activeFilter === "focused" ? "text-primary-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            1V1精筛
            {activeFilter === "focused" && (
              <motion.div
                layoutId="home-active-tab"
                className="absolute bottom-[-1px] left-1/4 right-1/4 h-[3px] bg-primary-600 rounded-t-full z-10"
              />
            )}
          </button>
          <button
            onClick={() => setActiveFilter("favorites")}
            className={`flex-1 py-2.5 text-[14px] font-medium relative transition-colors ${activeFilter === "favorites" ? "text-primary-600" : "text-slate-500 hover:text-slate-700"}`}
          >
            我的收藏
            {activeFilter === "favorites" && (
              <motion.div
                layoutId="home-active-tab"
                className="absolute bottom-[-1px] left-1/4 right-1/4 h-[3px] bg-primary-600 rounded-t-full z-10"
              />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {activeFilter === "overview" && (
        <div className="px-6 mt-1.5 mb-1">
          <div className="bg-slate-200/70 rounded-[8px] flex items-center px-1.5 py-1 border border-slate-200/50 relative overflow-hidden group">
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
        {activeFilter === "overview" && (
          <div>
            <div className="flex justify-between items-center px-6 mt-3 mb-2">
              <h2 className="text-[16px] text-slate-900 tracking-tight">
                我的岗位
              </h2>
            </div>

            <div className="bg-white rounded-[10px] mx-6 overflow-hidden mb-6 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.05)] border border-slate-200/40">
              <div
                onClick={() => onShowList?.("本周推荐岗位")}
                className="flex items-center pl-4 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="w-[28px] h-[28px] rounded-[8px] bg-[#34d399] flex items-center justify-center shrink-0 mr-3 my-3">
                  <CheckSquare className="text-white" size={16} />
                </div>
                <div className="flex-1 flex items-center pr-4 py-3 border-b border-slate-100">
                  <span className="text-[14px] text-slate-900 flex-1">
                    本周推荐岗位
                  </span>
                  <span className="text-[13px] text-slate-500 pr-1">
                    17,978
                  </span>
                  <ChevronRight size={20} className="text-[#C7C7CC] shrink-0" />
                </div>
              </div>

              <div
                onClick={() => onShowList?.("三日内报名截止")}
                className="flex items-center pl-4 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="w-[28px] h-[28px] rounded-[8px] bg-[#60a5fa] flex items-center justify-center shrink-0 mr-3 my-3">
                  <AlarmClock className="text-white" size={16} />
                </div>
                <div className="flex-1 flex items-center pr-4 py-3 border-b border-slate-100">
                  <span className="text-[14px] text-slate-900 flex-1">
                    三日内报名截止
                  </span>
                  <span className="text-[13px] text-slate-500 pr-1">
                    14,144
                  </span>
                  <ChevronRight size={20} className="text-[#C7C7CC] shrink-0" />
                </div>
              </div>

              <div
                onClick={() => onShowList?.("已投递简历")}
                className="flex items-center pl-4 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="w-[28px] h-[28px] rounded-[8px] bg-[#a78bfa] flex items-center justify-center shrink-0 mr-3 my-3">
                  <CheckCircle2 className="text-white" size={16} />
                </div>
                <div className="flex-1 flex items-center pr-4 py-3 border-b border-slate-100">
                  <span className="text-[14px] text-slate-900 flex-1">
                    已投递简历数量
                  </span>
                  <span className="text-[13px] text-slate-500 pr-1">0</span>
                  <ChevronRight size={20} className="text-[#C7C7CC] shrink-0" />
                </div>
              </div>

              <div
                onClick={() => onShowList?.("关注岗位")}
                className="flex items-center pl-4 hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-colors"
              >
                <div className="w-[28px] h-[28px] rounded-[8px] bg-[#fb923c] flex items-center justify-center shrink-0 mr-3 my-3">
                  <Star className="text-white" size={16} />
                </div>
                <div className="flex-1 flex items-center pr-4 py-3">
                  <span className="text-[14px] text-slate-900 flex-1">
                    关注岗位数量
                  </span>
                  <span className="text-[13px] text-slate-500 pr-1">0</span>
                  <ChevronRight size={20} className="text-[#C7C7CC] shrink-0" />
                </div>
              </div>
            </div>

            {/* 今日新增 */}
            <div>
              <div className="flex justify-between items-end px-6 mt-3 mb-2">
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[16px] text-slate-900 tracking-tight">
                    今日新增
                  </h2>
                  <span className="text-[13px] text-slate-500 font-normal">
                    共 1187 个岗位
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-[10px] mx-6 overflow-hidden mb-6 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.05)] border border-slate-200/40">
                {[
                  { name: "人才引进", count: 372, icon: "人", bg: "#a855f7" },
                  { name: "事业单位", count: 325, icon: "事", bg: "#2dd4bf" },
                  { name: "国企招聘", count: 188, icon: "国", bg: "#3b82f6" },
                  {
                    name: "医疗卫生招聘",
                    count: 151,
                    icon: "医",
                    bg: "#6366f1",
                  },
                  { name: "教师招聘", count: 110, icon: "教", bg: "#c084fc" },
                  { name: "社区工作者", count: 29, icon: "社", bg: "#f97316" },
                  { name: "警法考试", count: 9, icon: "警", bg: "#10b981" },
                  { name: "公益性岗位", count: 2, icon: "公", bg: "#f59e0b" },
                  { name: "银行", count: 1, icon: "银", bg: "#60a5fa" },
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
                      <span className="text-white text-[14px] font-bold">
                        {item.icon}
                      </span>
                    </div>
                    <div
                      className={`flex-1 flex items-center pr-4 py-3 ${i !== arr.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                      <span className="text-[14px] text-slate-900 flex-1">
                        {item.name}
                      </span>
                      <span className="text-[13px] text-slate-500 pr-1">
                        {item.count}
                      </span>
                      <ChevronRight
                        size={20}
                        className="text-[#C7C7CC] shrink-0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Focused Items */}
        {activeFilter === "focused" && (
          <div>
            {/* Pull to refresh visual */}
            <div
              className="flex justify-center items-center overflow-hidden transition-all duration-200"
              style={{
                height: isRefreshing ? "32px" : Math.min(pullY, 32) + "px",
                opacity: isRefreshing || pullY > 0 ? 1 : 0,
              }}
            >
              {isRefreshing ? (
                <RefreshCw className="animate-spin text-slate-400" size={16} />
              ) : (
                <span className="text-[12px] text-slate-400 font-medium">
                  {pullY > 50 ? "释放刷新..." : "下拉刷新..."}
                </span>
              )}
            </div>

            <div className="bg-white rounded-[10px] mx-6 overflow-hidden mb-6 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.05)] border border-slate-200/40">
              <AnimatePresence initial={false}>
                {displayFocused.map((item, i, arr) => {
                  const key = `${item.unit}_${item.position}`;
                  return (
                    <motion.div
                      key={key}
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
                        onTrack?.(`${item.unit} - ${item.position}`, "已投递")
                      }
                      className={`group select-none cursor-pointer transition-all duration-150 active:scale-[0.985] active:bg-slate-100/80 hover:bg-slate-50/40 relative overflow-hidden ${i !== arr.length - 1 ? "border-b border-slate-100" : ""}`}
                    >
                      <div className="p-4 pr-12 relative">
                        <div className="mb-2 pr-4 text-left">
                          <h3 className="text-[15px] font-semibold text-slate-900 mb-1 leading-snug group-active:text-primary-600 transition-colors">
                            {item.unit}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded cursor-default border border-primary-200/50">
                              {item.position}
                            </span>
                            <span className="text-[12px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50">
                              考试类型
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2.5 mb-1 text-slate-500 text-left">
                          <div className="flex items-center gap-1.5">
                            <div
                              className={`w-1.5 h-1.5 rounded-full bg-${item.statusColor}-500`}
                            />
                            <span
                              className={`text-[12px] font-medium text-slate-600`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={13} className="text-[#94A3B8]" />
                            <span className="text-[12px] font-sans text-slate-500">
                              {item.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={13} className="text-[#94A3B8]" />
                            <span className="text-[12px] font-sans text-slate-500">
                              {item.deadline
                                .replace("截止: ", "")
                                .replace("发布: ", "")}
                            </span>
                          </div>
                        </div>

                        {/* Top Right Actions Stack */}
                        <div className="absolute top-4 right-3.5 flex flex-col items-center gap-2.5 z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(key);
                            }}
                            className="p-1 rounded-full hover:bg-slate-100 active:scale-110 transition-transform flex items-center justify-center text-[#8E8E93]"
                          >
                            <Bookmark
                              size={18}
                              className={
                                bookmarkedKeys.includes(key)
                                  ? "text-primary-600 fill-primary-600"
                                  : ""
                              }
                            />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              hideJob(key);
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
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="flex justify-center pb-4 h-12">
              {isLoadingMore ? (
                <Loader2 className="animate-spin text-slate-400" size={16} />
              ) : (
                <span className="text-[13px] text-slate-500 font-medium pt-2">
                  上拉加载更多...
                </span>
              )}
            </div>
          </div>
        )}

        {/* Favorites */}
        {activeFilter === "favorites" && (
          <div>
            {displayFavorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-[10px] mx-6 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.05)] border border-slate-200/40">
                <Bookmark className="text-slate-300 w-12 h-12 mb-3" />
                <p className="text-slate-500 text-[14px]">暂无收藏岗位</p>
              </div>
            ) : (
              <div className="bg-white rounded-[10px] mx-6 overflow-hidden mb-6 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.05)] border border-slate-200/40">
                <AnimatePresence initial={false}>
                  {displayFavorites.map((item, i, arr) => {
                    const key = `${item.unit}_${item.position}`;
                    return (
                      <motion.div
                        key={key}
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
                          onTrack?.(`${item.unit} - ${item.position}`, "已投递")
                        }
                        className={`group select-none cursor-pointer transition-all duration-150 active:scale-[0.985] active:bg-slate-100/80 hover:bg-slate-50/40 relative overflow-hidden ${i !== arr.length - 1 ? "border-b border-slate-100" : ""}`}
                      >
                        <div className="p-4 pr-12 relative">
                          <div className="mb-2 pr-4 text-left">
                            <h3 className="text-[15px] font-semibold text-slate-900 mb-1 leading-snug group-active:text-primary-600 transition-colors">
                              {item.unit}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded cursor-default border border-primary-200/50">
                                {item.position}
                              </span>
                              <span className="text-[12px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50">
                                考试类型
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-2.5 mb-1 text-slate-500 text-left">
                            <div className="flex items-center gap-1.5">
                              <div
                                className={`w-1.5 h-1.5 rounded-full bg-${item.statusColor}-500`}
                              />
                              <span
                                className={`text-[12px] font-medium text-slate-600`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={13} className="text-[#94A3B8]" />
                              <span className="text-[12px] font-sans text-slate-500">
                                {item.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={13} className="text-[#94A3B8]" />
                              <span className="text-[12px] font-sans text-slate-500">
                                {item.deadline
                                  .replace("截止: ", "")
                                  .replace("发布: ", "")}
                              </span>
                            </div>
                          </div>

                          {/* Top Right Actions Stack */}
                          <div className="absolute top-4 right-3.5 flex flex-col items-center gap-2.5 z-10">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(key);
                              }}
                              className="p-1 rounded-full hover:bg-slate-100 active:scale-110 transition-transform flex items-center justify-center text-[#8E8E93]"
                            >
                              <Bookmark
                                size={18}
                                className={
                                  bookmarkedKeys.includes(key)
                                    ? "text-primary-600 fill-primary-600"
                                    : ""
                                }
                              />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                hideJob(key);
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
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* iOS Style Undo Toast Bar */}
      <AnimatePresence>
        {showUndoToast && (
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.95 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            className="fixed bottom-24 left-6 right-6 bg-[#1C1C1E]/95 backdrop-blur-md text-white px-4 py-3 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/10 flex items-center justify-between z-50 overflow-hidden"
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
    </div>
  );
}
