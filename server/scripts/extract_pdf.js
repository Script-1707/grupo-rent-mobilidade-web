const fs = require('fs');
const pdf = require('pdf-parse');

const file = process.argv[2];
if (!file) {
  console.error('Usage: node extract_pdf.js <path-to-pdf>');
  process.exit(1);
}

const dataBuffer = fs.readFileSync(file);

pdf(dataBuffer).then(function(data) {
  // Print full text
  console.log(data.text);
}).catch(err => {
  console.error('Error parsing PDF:', err);
  process.exit(1);
});
