const fs = require('fs');
const puppeteer = require('puppeteer');
const { marked } = require('marked');

async function generatePDF() {
  const markdown = fs.readFileSync('PRD.md', 'utf-8');
  let htmlContent = marked.parse(markdown);

  const fontBuffer = fs.readFileSync('node_modules/@embedpdf/fonts-sc/fonts/NotoSansHans-Regular.otf');
  const fontBase64 = fontBuffer.toString('base64');
  
  const fontBoldBuffer = fs.readFileSync('node_modules/@embedpdf/fonts-sc/fonts/NotoSansHans-Bold.otf');
  const fontBoldBase64 = fontBoldBuffer.toString('base64');

  const html = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>PRD</title>
      <style>
        @font-face {
          font-family: 'NotoSansSC';
          src: url(data:font/opentype;charset=utf-8;base64,${fontBase64}) format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'NotoSansSC';
          src: url(data:font/opentype;charset=utf-8;base64,${fontBoldBase64}) format('opentype');
          font-weight: bold;
          font-style: normal;
        }
        body {
          font-family: 'NotoSansSC', sans-serif;
          line-height: 1.6;
          padding: 2em;
          color: #333;
        }
        h1, h2, h3 { color: #111; font-weight: bold; }
        code { background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-family: monospace; }
        ul { padding-left: 20px; }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 3000));
  
  await page.pdf({
    path: '产品需求文档.pdf',
    format: 'A4',
    margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' },
    printBackground: true
  });

  await browser.close();
  console.log('PDF generated properly!');
}

generatePDF().catch(console.error);
