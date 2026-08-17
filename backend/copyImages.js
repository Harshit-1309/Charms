const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\singh\\.gemini\\antigravity-ide\\brain\\418c0eec-5a95-4c3f-b889-2df7be0100f9';
const destDir = 'c:\\Users\\singh\\OneDrive\\Desktop\\H\\HS\\Charms\\frontend\\public\\charmi';

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  if (file.endsWith('.jpg') && !file.startsWith('._')) {
    const prefix = file.split('_178')[0]; 
    if (prefix) {
      const destFile = path.join(destDir, prefix + '.jpg');
      fs.copyFileSync(path.join(srcDir, file), destFile);
      console.log(`Copied ${file} to ${destFile}`);
    }
  }
});
