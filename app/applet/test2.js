const fs = require('fs');
let code = fs.readFileSync('src/components/Schedule.tsx', 'utf8');

const oldTarget = `                    let dotClasses = '';
                    let innerDot = null;
                    if (isToday) {
                      dotClasses = 'bg-primary-600 text-white shadow-md shadow-primary-500/20 ring-4 ring-primary-600/20';
                      innerDot = <Clock size={10} className="text-white" strokeWidth={3} />;
                    } else if (isPast) {
                      dotClasses = 'bg-white border-2 border-slate-200';
                      innerDot = <Clock size={10} className="text-slate-300" strokeWidth={3} />;
                    } else {
                      dotClasses = 'bg-white border-2 border-primary-600';
                      innerDot = <Clock size={10} className="text-primary-600" strokeWidth={3} />;
                    }`;

const newTarget = `                    let dotClasses = '';
                    let innerDot = null;
                    if (isToday) {
                      dotClasses = '';
                      innerDot = <Clock size={16} className="text-primary-600 bg-slate-50 shadow-[0_0_0_4px_#f8fafc] rounded-full" strokeWidth={2.5} />;
                    } else if (isPast) {
                      dotClasses = '';
                      innerDot = <Clock size={16} className="text-slate-300 bg-slate-50 shadow-[0_0_0_4px_#f8fafc] rounded-full" strokeWidth={2} />;
                    } else {
                      dotClasses = '';
                      innerDot = <Clock size={16} className="text-primary-500 bg-slate-50 shadow-[0_0_0_4px_#f8fafc] rounded-full" strokeWidth={2.5} />;
                    }`;

code = code.replace(oldTarget, newTarget);

const oldDiv = `                        <div className={\`absolute -left-[23px] top-[12px] w-5 h-5 rounded-full flex items-center justify-center z-10 transition-transform duration-200 group-hover/day:scale-110 \${dotClasses}\`}>`;
const newDiv = `                        <div className={\`absolute -left-[21px] top-[14px] flex items-center justify-center z-10 transition-transform duration-200 group-hover/day:scale-110 \${dotClasses}\`}>`;

code = code.replace(oldDiv, newDiv);

fs.writeFileSync('src/components/Schedule.tsx', code);
