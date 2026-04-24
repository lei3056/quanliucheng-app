import { motion } from 'motion/react';
import { Search, Bell, Clock, Building2, Flame, ThumbsUp, Tag, Bookmark, Target } from 'lucide-react';

export default function Home({ onNavigate }: { onNavigate?: (tab: 'favorites' | 'targeted') => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col gap-6 pb-24 bg-slate-50 h-full overflow-y-auto"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 px-6 pt-8 pb-4 bg-white border-b border-slate-200 shrink-0 sticky top-0 z-20">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">P</div>
              <div>
                <h1 className="text-base font-bold text-slate-900">发现机会</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold"></p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate?.('targeted')}
                className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 transition-colors"
              >
                <Target size={16} />
              </button>
              <button 
                onClick={() => onNavigate?.('favorites')}
                className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary-600 hover:border-primary-200 transition-colors"
              >
                <Bookmark size={16} />
              </button>
              <button className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
        </div>
        <div className="bg-slate-50 rounded-xl flex items-center px-4 py-3 border border-slate-200">
          <Search size={16} className="text-slate-400 mr-3" />
          <input 
            type="text" 
            placeholder="搜索职位、单位名称..." 
            className="bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none w-full text-sm font-medium"
          />
        </div>
      </div>

      {/* Daily Picks - Horizontal Scroll */}
      <div className="px-6 space-y-4">
        <h2 className="text-sm font-black text-slate-400 flex items-center gap-2 tracking-tighter">
          <div className="w-1 h-4 bg-primary-500"></div> 今日 AI 精选
        </h2>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-hide">
          {/* Card 1 */}
          <div className="snap-center shrink-0 w-[85%] bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider">
                <Clock size={10} /> 剩余 1天 04时
              </span>
              <span className="text-primary-700 font-bold text-[10px] bg-primary-50 border border-primary-100 px-2 py-1 rounded-md tracking-wider uppercase">匹配度 98%</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">成都市武侯区教育局 - 数学教师</h3>
            <p className="text-[11px] text-slate-500 mb-4 flex items-center gap-1">
              <Building2 size={12} /> 事业单位 · 竞争比 1:12
            </p>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[11px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2 py-1 rounded-md">¥ 7-9K</span>
              <span className="text-[11px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2 py-1 rounded-md">本科学历</span>
            </div>
            <div className="flex gap-3 mt-auto">
              <button className="flex-1 bg-slate-50 border border-slate-200 text-slate-600 py-2.5 rounded-xl font-bold text-[11px] tracking-wider transition-colors hover:bg-slate-100">
                忽略
              </button>
              <button className="flex-[2] bg-primary-600 text-white py-2.5 rounded-xl font-bold text-[11px] tracking-wider transition-colors hover:bg-primary-700">
                重点关注
              </button>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="snap-center shrink-0 w-[85%] bg-white rounded-2xl p-5 shadow-sm border border-slate-200 flex flex-col">
             <div className="flex justify-between items-start mb-4">
              <span className="bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider">
                <Clock size={10} /> 即将开始报名
              </span>
              <span className="text-primary-700 font-bold text-[10px] bg-primary-50 border border-primary-100 px-2 py-1 rounded-md tracking-wider uppercase">匹配度 92%</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">江西省交投数据科技 - 研发工程岗</h3>
            <p className="text-[11px] text-slate-500 mb-4 flex items-center gap-1">
              <Building2 size={12} /> 央国企 · 扩招扩容
            </p>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[11px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2 py-1 rounded-md">应届生</span>
              <span className="text-[11px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2 py-1 rounded-md">计算机类</span>
            </div>
             <div className="flex gap-3 mt-auto">
              <button className="flex-1 bg-slate-50 border border-slate-200 text-slate-600 py-2.5 rounded-xl font-bold text-[11px] tracking-wider transition-colors hover:bg-slate-100">
                忽略
              </button>
              <button className="flex-[2] bg-primary-600 text-white py-2.5 rounded-xl font-bold text-[11px] tracking-wider transition-colors hover:bg-primary-700">
                重点关注
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          {['全部', '公务员', '事业单位', '央国企', '特岗教师', '社区工作者'].map((cat, i) => (
            <button 
              key={cat}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 shadow-sm hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="px-6 flex flex-col gap-4">
        <h2 className="text-sm font-black text-slate-400 flex items-center gap-2 tracking-tighter mt-2">
          <div className="w-1 h-4 bg-emerald-500"></div> 最新招考
        </h2>
        
        {/* Feed Item 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">绵阳经济技术开发区三江小学</h3>
              <p className="text-[11px] font-bold text-primary-600 mb-3">小学语文教师</p>
            </div>
            <button className="text-slate-300 hover:text-primary-500 transition-colors bg-slate-50 p-2 rounded-lg border border-slate-100">
              <Bookmark size={14} />
            </button>
          </div>
          <div className="flex gap-2 mb-4">
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">本科</span>
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">无限制</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold border-t border-slate-100 pt-4 uppercase tracking-widest">
            <span className="text-slate-400">发布: 04-27</span>
            <span className="text-primary-600 px-2 py-1 bg-primary-50 rounded-md border border-primary-100">报名未开始</span>
          </div>
        </div>

        {/* Feed Item 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">吉安东管理中心</h3>
              <p className="text-[11px] font-bold text-primary-600 mb-3">文秘宣传岗</p>
            </div>
            <button className="text-primary-500 bg-primary-50 p-2 rounded-lg border border-primary-100">
              <Bookmark size={14} className="fill-current" />
            </button>
          </div>
          <div className="flex gap-2 mb-4">
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">校招</span>
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">汉语言文学</span>
          </div>
           <div className="flex justify-between items-center text-[10px] font-bold border-t border-slate-100 pt-4 uppercase tracking-widest">
            <span className="text-slate-400">截止: 05-06</span>
            <span className="text-amber-600 px-2 py-1 bg-amber-50 rounded-md border border-amber-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> 进行中
            </span>
          </div>
        </div>

        {/* Feed Item 3 (Bookmarked & Targeted) */}
        <div className="bg-primary-50/30 p-5 rounded-2xl shadow-sm border border-primary-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 text-sm">南昌市青云谱区卫健委</h3>
                <span className="bg-primary-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
                  <Target size={10} /> 重点关注
                </span>
              </div>
              <p className="text-[11px] font-bold text-primary-600 mb-3">公共卫生干事</p>
            </div>
            <div className="flex gap-1.5">
              <button className="text-primary-500 bg-primary-50 p-2 rounded-lg border border-primary-100 shadow-sm cursor-default">
                <Bookmark size={14} className="fill-current" />
              </button>
            </div>
          </div>
          <div className="flex gap-2 mb-4">
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md">事业编</span>
             <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md">预防医学</span>
          </div>
           <div className="flex justify-between items-center text-[10px] font-bold border-t border-primary-100 pt-4 uppercase tracking-widest">
            <span className="text-slate-500">截止: 05-15</span>
            <span className="text-amber-600 px-2 py-1 bg-amber-50 rounded-md border border-amber-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> 报名中
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
