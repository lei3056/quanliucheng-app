import { motion } from 'motion/react';

export default function Study() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full bg-slate-50 flex flex-col"
    >
      <div className="px-6 pt-12 pb-4 bg-white/80 backdrop-blur-xl border-b border-slate-200 z-10 sticky top-0">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">学习计划</h1>
      </div>
      <div className="flex-1 overflow-y-auto pb-24 px-6 pt-6 flex justify-center items-center">
        <p className="text-slate-400 text-sm font-medium">暂无学习计划</p>
      </div>
    </motion.div>
  );
}
