import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, UserCircle, Briefcase, ChevronLeft, Plus, CheckCircle2, AlertCircle, FileText, GraduationCap, Users, Trash2, Award, Target, Bookmark, Bell } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type ViewMode = 'overview' | 'editor';
type SectionType = 'basic' | 'education' | 'experience' | 'certifications' | 'family' | 'evaluation';

interface ProfileProps {
  onNavigate?: (tab: 'home' | 'schedule' | 'profile' | 'favorites' | 'targeted') => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [activeSection, setActiveSection] = useState<SectionType | null>(null);

  // 模拟数据状态，用于演示增加填写的业务逻辑效果
  const [educationList, setEducationList] = useState([
    { id: 1, school: '四川大学', major: '汉语言文学', degree: '本科', time: '2022.09 - 2026.06' }
  ]);
  const [experienceList, setExperienceList] = useState([
    { id: 1, company: '省委宣传部', role: '新媒体运营实习生', time: '2025.07 - 2025.09' }
  ]);
  const [certList, setCertList] = useState([
    { id: 1, name: '大学英语六级 (CET-6)', detail: '成绩: 520分' }
  ]);
  const [familyList, setFamilyList] = useState([
    { id: 1, relation: '父亲', name: '李建国', company: '市直属机关事务中心', politics: '中共党员' }
  ]);

  const radarData = [
    { subject: '院校背景', A: 95, fullMark: 100 },
    { subject: '职业素养', A: 65, fullMark: 100 },
    { subject: '实践素养', A: 40, fullMark: 100 },
    { subject: '专业素养', A: 50, fullMark: 100 },
    { subject: '政治素养', A: 85, fullMark: 100 },
  ];

  const sections = [
    { id: 'basic', title: '基础身份', icon: UserCircle, status: 'complete', summary: '李雷, 男, 党员' },
    { id: 'education', title: '教育经历', icon: GraduationCap, status: educationList.length > 0 ? 'complete' : 'warning', summary: educationList.length > 0 ? `${educationList[0].school} · ${educationList[0].major}` : '请补充最高学历' },
    { id: 'experience', title: '实践与工作经历', icon: Briefcase, status: experienceList.length > 0 ? 'complete' : 'warning', summary: experienceList.length > 0 ? `${experienceList.length} 段经历 (含校园)` : '加入社团/赛事实践' },
    { id: 'certifications', title: '技能与证书', icon: Award, status: certList.length > 0 ? 'complete' : 'pending', summary: certList.length > 0 ? `已录入 ${certList.length} 项证书` : '外语/资格证等硬通货' },
    { id: 'family', title: '家庭与社会关系', icon: Users, status: familyList.length > 0 ? 'complete' : 'pending', summary: familyList.length > 0 ? `已登记 ${familyList.length} 位亲属` : '需录入直系亲属信息' },
    { id: 'evaluation', title: '综合评价与表彰', icon: FileText, status: 'pending', summary: '荣誉归档及个人鉴定' },
  ] as const;

  const handleEdit = (id: SectionType) => {
    setActiveSection(id);
    setViewMode('editor');
  };

  const Overview = () => (
    <div className="flex flex-col gap-6 p-6 pb-32">
      {/* Quick Access */}
      <div className="grid grid-cols-3 gap-3">
        <button 
           onClick={() => onNavigate?.('targeted')}
           className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-primary-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
            <Target size={20} />
          </div>
          <span className="text-[11px] font-bold text-slate-700">重点关注</span>
        </button>
        <button 
           onClick={() => onNavigate?.('favorites')}
           className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-primary-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Bookmark size={20} />
          </div>
          <span className="text-[11px] font-bold text-slate-700">我的收藏</span>
        </button>
        <button 
           className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-primary-300 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
          </div>
          <span className="text-[11px] font-bold text-slate-700">消息通知</span>
        </button>
      </div>

      {/* Radar Chart Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-sm font-black text-slate-400 mb-2 flex items-center gap-2 tracking-tighter">
          <div className="w-1 h-4 bg-primary-500"></div> 能力图谱
        </h2>
        <div className="h-[200px] w-full -ml-2 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3"/>
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                 name="我的竞争力"
                 dataKey="A"
                 stroke="#4f46e5"
                 strokeWidth={2}
                 fill="#6366f1"
                 fillOpacity={0.25}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
           <p className="text-[10px] text-primary-600 font-black uppercase tracking-widest mb-1">综合诊断</p>
           <p className="text-xs text-slate-600 leading-relaxed font-medium">您的表单基础完整度较好，但在<span className="font-bold text-slate-900">家庭社会关系</span>核查项中存在风险空白点。</p>
        </div>
      </div>

      {/* Resume Management List (Level 1) */}
      <div className="space-y-3">
        <h2 className="text-sm font-black text-slate-400 flex items-center gap-2 tracking-tighter">
          <div className="w-1 h-4 bg-emerald-500"></div> 个人档案管理
        </h2>
        
        {sections.map((section) => (
          <button 
            key={section.id}
            onClick={() => handleEdit(section.id as SectionType)}
            className="w-full bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-4 hover:border-primary-300 transition-colors group text-left shadow-sm"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              section.status === 'complete' ? 'bg-emerald-50 border border-emerald-100 text-emerald-600' : 
              section.status === 'warning' ? 'bg-amber-50 border border-amber-100 text-amber-600' : 'bg-slate-50 border border-slate-100 text-slate-400'
            }`}>
              <section.icon size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-800 text-sm">{section.title}</span>
                {section.status === 'complete' ? (
                  <CheckCircle2 size={16} className="text-emerald-500" />
                ) : section.status === 'warning' ? (
                  <AlertCircle size={16} className="text-amber-500" />
                ) : (
                  <Plus size={16} className="text-slate-300" />
                )}
              </div>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{section.summary}</p>
            </div>
          </button>
        ))}
      </div>

      {/* AI Tool CTA */}
      <div className="group bg-primary-600 p-6 rounded-2xl text-white relative overflow-hidden shadow-lg shadow-primary-100 cursor-pointer transition-transform active:scale-95 mt-4">
        <Sparkles size={100} className="absolute -right-6 -top-6 text-white/10" />
        <h3 className="font-bold mb-1 text-base">不想一项项填写？</h3>
        <p className="text-[11px] text-primary-100 mb-4 font-medium leading-relaxed">上传现有 PDF / Word 简历，系统自动提取识别并填充所有档案数据。</p>
        <button className="bg-white text-primary-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest pointer-events-none">
          智能解析简历
        </button>
      </div>
    </div>
  );

  const Editor = () => {
    const section = sections.find(s => s.id === activeSection);
    return (
      <div className="flex flex-col h-full bg-slate-50">
        {/* Editor Header */}
        <div className="bg-white px-6 pt-10 pb-6 border-b border-slate-200 shrink-0 shadow-sm z-10 relative">
          <button 
            onClick={() => setViewMode('overview')}
            className="flex items-center gap-1 text-slate-500 hover:text-primary-600 transition-colors font-bold text-[10px] uppercase tracking-widest mb-6"
          >
            <ChevronLeft size={16} /> 返回档案概览
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white border border-slate-800">
              {section?.icon && <section.icon size={24} />}
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{section?.title}</h2>
              <p className="text-[10px] text-primary-600 font-black tracking-widest"></p>
            </div>
          </div>
        </div>

        {/* Level 2 Form Area */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto pb-32">
          
          {/* 基础身份 */}
          {activeSection === 'basic' && (
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200">
              <div className="relative w-24 h-24 mx-auto mb-8 mt-2">
                <div className="w-full h-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1">
                  <Plus size={20} className="text-slate-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">上传证件照</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">姓名</label>
                  <input type="text" defaultValue="李雷" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-primary-500 focus:bg-white outline-none transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">性别</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-primary-500 focus:bg-white outline-none transition-colors appearance-none">
                    <option>男</option>
                    <option>女</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">证件号码 <span className="text-rose-500">*</span></label>
                <input type="text" defaultValue="510**********3412" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-primary-500 focus:bg-white outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">民族</label>
                  <input type="text" defaultValue="汉族" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-primary-500 outline-none transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">政治面貌</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:border-primary-500 outline-none transition-colors appearance-none">
                    <option>中共党员</option>
                    <option>共青团员</option>
                    <option>群众</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* 教育经历 (动态数组演示) */}
          {activeSection === 'education' && (
            <>
              <div className="space-y-4">
                {educationList.map((edu, idx) => (
                  <div key={edu.id} className="bg-white p-5 rounded-2xl border border-slate-200 relative group">
                    <div className="absolute right-4 top-4 text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-primary-50 text-primary-600 rounded-md flex items-center justify-center text-xs font-black">{idx + 1}</div>
                      <span className="text-sm font-bold text-slate-800">高等教育经历</span>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">学历层次</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold appearance-none">
                              <option>本科</option>
                              <option>硕士研究生</option>
                              <option>博士研究生</option>
                              <option>大专</option>
                            </select>
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">起止时间</label>
                            <input type="text" defaultValue={edu.time} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold" />
                         </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">学校名称</label>
                        <input type="text" defaultValue={edu.school} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:border-primary-500 outline-none" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">专业名称 (需与毕业证一致)</label>
                        <input type="text" defaultValue={edu.major} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:border-primary-500 outline-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-white border-2 border-dashed border-primary-200 text-primary-600 rounded-2xl py-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-primary-50 transition-colors">
                <Plus size={16} /> 添加教育经历
              </button>
            </>
          )}

          {/* 家庭关系 (动态数组演示) */}
          {activeSection === 'family' && (
            <>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 leading-relaxed font-medium">体制内招考遵循《回避规定》，请如实、完整填写配偶、直系血亲及三代以内旁系血亲的从业信息。</p>
              </div>
              <div className="space-y-4">
                {familyList.map((fam, idx) => (
                  <div key={fam.id} className="bg-white p-5 rounded-2xl border border-slate-200 relative">
                     <div className="absolute right-4 top-4 text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-slate-100 text-slate-600 rounded-md flex items-center justify-center text-xs font-black">{idx + 1}</div>
                      <span className="text-sm font-bold text-slate-800">主要社会关系</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">称谓 (如: 父亲)</label>
                            <input type="text" defaultValue={fam.relation} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold" />
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">姓名</label>
                            <input type="text" defaultValue={fam.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold" />
                         </div>
                    </div>
                    <div className="space-y-1.5 mb-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">工作单位及职务</label>
                        <input type="text" defaultValue={fam.company} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:border-primary-500 outline-none" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">政治面貌</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold appearance-none">
                            <option>{fam.politics}</option>
                            <option>群众</option>
                        </select>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-white border-2 border-dashed border-slate-200 text-slate-500 rounded-2xl py-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:border-slate-300 hover:text-slate-700 transition-colors">
                <Plus size={16} /> 添加家庭成员
              </button>
            </>
          )}

          {/* 自我评价 */}
          {activeSection === 'evaluation' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="bg-primary-50 p-4 rounded-xl border border-primary-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-primary-600" />
                    <span className="text-[10px] font-black text-primary-700 uppercase tracking-widest">AI 智能重塑引擎</span>
                  </div>
                  <p className="text-xs text-primary-600 font-medium leading-relaxed">系统已为您提取：汉语言文学专业优势、3次校内奖学金背景。是否应用到自我评价中生成初稿？</p>
                  <button className="mt-3 text-[10px] font-black text-primary-700 bg-white border border-primary-200 px-3 py-1.5 rounded-lg uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-colors">
                    应用 AI 撰写
                  </button>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 tracking-widest ml-1">个人奖惩与综合评价</label>
                  <textarea 
                    rows={8}
                    placeholder="请输入您的自我评价及校内国际奖项、表彰记录。建议包含：专业能力、性格特质、核心荣誉..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm font-medium focus:border-primary-500 outline-none transition-colors resize-none leading-relaxed"
                  ></textarea>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {['文字功底扎实', '抗压能力强', '熟悉体制内公文', '逻辑严密', '党员先锋'].map(tag => (
                    <button key={tag} className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 hover:border-primary-500 transition-colors">
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 技能与证书 (新增演示) */}
          {activeSection === 'certifications' && (
            <>
              <div className="space-y-4">
                {certList.map((cert) => (
                  <div key={cert.id} className="bg-white p-5 rounded-2xl border border-slate-200 relative group flex items-start gap-4">
                    <div className="absolute right-4 top-4 text-slate-300 hover:text-rose-500 transition-colors">
                      <Trash2 size={16} />
                    </div>
                    <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1 leading-tight">{cert.name}</h3>
                      <p className="text-[11px] font-bold text-primary-600 bg-primary-50 border border-primary-100 px-2 py-0.5 rounded-md inline-block uppercase tracking-wider">{cert.detail}</p>
                    </div>
                  </div>
                ))}

                {/* Quick Add Buttons */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">快捷添加常见资质</h3>
                  <div className="flex flex-wrap gap-2">
                    {['大学英语四级 (CET-4)', '计算机二级', '法律职业资格证书 (A)', '初级会计师', '普通话二甲'].map(tag => (
                      <button key={tag} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-colors">
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-white border-2 border-dashed border-primary-200 text-primary-600 rounded-2xl py-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest hover:bg-primary-50 transition-colors">
                <Plus size={16} /> 手动录入其他证书
              </button>
            </>
          )}

          {/* 默认占位 (对于未实现的 experience 模块) */}
          {activeSection === 'experience' && (
            <div className="flex flex-col items-center justify-center py-20 text-center px-8 bg-white border border-slate-200 rounded-3xl">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6 border-2 border-dashed border-slate-200">
                <Briefcase size={32} />
              </div>
              <h3 className="text-slate-800 font-bold mb-2">实践、工作与大赛经历</h3>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-4">
                点击新增可选择类型：[全职] [实习] [校园社团官] [赛事项目]等。同一模块内将通过 AI 辅助按照 STAR 法则梳理您的产出。
              </p>
              <button className="bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-6 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
                <Plus size={14} /> 新增履历
              </button>
            </div>
          )}

        </div>

        {/* Editor Footer */}
        <div className="fixed bottom-0 sm:w-[374px] w-full px-6 py-6 bg-white border-t border-slate-100 z-50">
          <button 
            onClick={() => setViewMode('overview')}
            className="w-full bg-slate-900 text-white rounded-2xl py-4 font-black uppercase tracking-widest shadow-xl shadow-slate-200 transition-transform active:scale-95"
          >
            确认并保存信息
          </button>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col h-full bg-slate-50 overflow-hidden"
    >
      {/* Scrollable View Container */}
      <div className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {viewMode === 'overview' ? (
            <motion.div
              key="overview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              {/* Profile Header */}
              <div className="bg-slate-900 border-b border-slate-800 px-6 pt-10 pb-8 text-white relative shrink-0">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-1">
                     <h1 className="text-xl font-black tracking-tight">用户档案</h1>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">李雷 · 2026届应届生</p>
                  </div>
                </div>
                
                {/* Global Progress Bar */}
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 shadow-sm">
                  <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-300 tracking-widest mb-3">
                     <span>档案完成度</span>
                     <span className="text-primary-400">80%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 flex overflow-hidden">
                    <div className="bg-primary-500 h-full rounded-full w-[80%] relative transition-all duration-1000">
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white/20 rounded-full blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              <Overview />
            </motion.div>
          ) : (
            <motion.div
              key="editor"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-50 bg-white"
            >
              <Editor />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
