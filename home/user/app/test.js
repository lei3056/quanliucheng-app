const fs = require('fs');
let code = fs.readFileSync('src/components/Schedule1.tsx', 'utf8');

code = code.replace(/group\/item`/g, 'group/item ${getBorderAccentClass(item.statusType)}`');
code = code.replace(/cursor-pointer transition-colors`/g, 'cursor-pointer transition-colors ${getBorderAccentClass(item.statusType)}`');

fs.writeFileSync('src/components/Schedule1.tsx', code);
