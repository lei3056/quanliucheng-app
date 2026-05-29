import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

let dataBuffer = fs.readFileSync('产品需求文档.pdf');

console.log(Object.keys(pdfParse));
