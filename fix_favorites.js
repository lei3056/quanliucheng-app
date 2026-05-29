const fs = require('fs');
let code = fs.readFileSync('src/components/Home.tsx', 'utf8');

const focusedMatch = code.match(/\{displayFocused\.map\(\(item, i, arr\) => \{[\s\S]*?return \([\s\S]*?(<motion\.div[\s\S]*?<\/motion\.div>)[\s\S]*?\);\n\s*\}\)\}/);

if (focusedMatch) {
  const focusedNode = focusedMatch[1];
  
  const favRegex = /\{displayFavorites\.map\(\(item, i, arr\) => \{[\s\S]*?return \([\s\S]*?<motion\.div[\s\S]*?<\/motion\.div>[\s\S]*?\);\n\s*\}\)\}/;
  
  const replacement = "{displayFavorites.map((item, i, arr) => {\n" +
                      "  const key = `${item.unit}_${item.position}`;\n" +
                      "  return (\n" +
                      "    " + focusedNode + "\n" +
                      "  );\n" +
                      "})}\n";
                  
  code = code.replace(favRegex, replacement);
  fs.writeFileSync('src/components/Home.tsx', code);
  console.log('Replaced successfully');
} else {
  console.log('Could not find focusedMatch');
}
