const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');

(async () => {
    try {
        const md = fs.readFileSync('report.md', 'utf-8');
        const pdf = await mdToPdf(
            { content: md },
            {
                dest: 'public/UI_Optimization_Report.pdf',
                launch_options: { args: ['--no-sandbox', '--disable-setuid-sandbox'] },
                pdf_options: { format: 'A4', margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }, printBackground: true },
                css: `
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap');
                    body { font-family: "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #333; }
                    h1, h2, h3 { color: #111; font-family: "Noto Sans SC", sans-serif; font-weight: 700; }
                    h1 { font-size: 24px; border-bottom: 2px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; mb-4; }
                    h2 { font-size: 20px; border-bottom: 1px solid #eaecef; padding-bottom: 0.3em; margin-top: 24px; mb-4; }
                    p { font-size: 14px; line-height: 1.6; }
                    li { font-size: 14px; line-height: 1.6; margin-bottom: 0.5em; }
                    code { background-color: rgba(27,31,35,0.05); padding: 0.2em 0.4em; border-radius: 3px; }
                `
            }
        );
        console.log('PDF generated successfully!');
        console.log('PDF Size:', fs.statSync('public/UI_Optimization_Report.pdf').size);
    } catch (err) {
        console.error('Error generating PDF:', err);
    }
})();
