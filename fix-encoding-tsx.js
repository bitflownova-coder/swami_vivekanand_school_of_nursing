const fs = require('fs');

const files = [
  'app/academic/page.tsx',
  'app/downloads/page.tsx',
];

files.forEach(path => {
  let content = fs.readFileSync(path, 'utf8');
  const em = '\u2014';  // — em dash
  const en = '\u2013';  // – en dash
  
  // â€" (U+00E2 U+20AC U+201D) -> em dash
  content = content.replace(/\u00e2\u20ac\u201d/g, em);
  // â€" (U+00E2 U+20AC U+201C) -> en dash
  content = content.replace(/\u00e2\u20ac\u201c/g, en);
  // â€™ (U+00E2 U+20AC U+2122 or similar) -> right single quote
  content = content.replace(/\u00e2\u20ac\u2122/g, '\u2019');
  // â€˜ -> left single quote
  content = content.replace(/\u00e2\u20ac\u02dc/g, '\u2018');

  fs.writeFileSync(path, content, 'utf8');
  console.log('Processed:', path);
});
console.log('Done');
