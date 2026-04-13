const fs = require('fs');
const filePath = __dirname + '/app/admissions/page.tsx';
let c = fs.readFileSync(filePath, 'utf8');
const b = c.length;

c = c
  .split('\u00E2\u20AC\u201C').join('\u2013')   // â€" -> en dash –
  .split('\u00E2\u20AC\u201D').join('\u2014')   // â€" -> em dash —
  .split('\u00E2\u201A\u00B9').join('\u20B9')   // â‚¹  -> rupee ₹
  .split('\u00E2\u20AC\u00A2').join('\u2022')   // â€¢  -> bullet •
  .split('\u00C2\u00B7').join('\u00B7')          // Â·   -> middle dot ·
  .split('\u00E2\u201D\u20AC').join('\u2500');   // â"€  -> box draw ─

fs.writeFileSync(filePath, c, 'utf8');
console.log('Done. Length:', b, '->', c.length, '(removed', b - c.length, 'corrupt chars)');
