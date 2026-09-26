const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const jpgPath = path.resolve(__dirname, 'qwikamp', 'diagram_1_rustic_ia_blueprint.jpg');
const pngPath = path.resolve(__dirname, 'qwikamp', 'diagram_1_rustic_ia_blueprint.png');
const publicPngPath = path.resolve(__dirname, 'public', 'images', 'qwikamp', 'diagram_1_rustic_ia_blueprint.png');
const artifactPng = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\ef2fb206-3666-42f6-b9f4-231cc94dc87e\\diagram_1_rustic_ia_blueprint.png';

const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; }
    body { background: #000; display: flex; align-items: center; justify-content: center; width: 1920px; height: 1080px; overflow: hidden; }
    img { width: 100%; height: 100%; object-fit: contain; }
  </style>
</head>
<body>
  <img src="file:///${jpgPath.replace(/\\/g, '/')}" />
</body>
</html>`;

const tmpHtml = path.resolve(__dirname, 'qwikamp', '_tmp_rustic.html');
fs.writeFileSync(tmpHtml, html, 'utf-8');

try {
  execSync(`"${chromePath}" --headless=new --screenshot="${pngPath}" --window-size=1920,1080 --default-background-color=000000 "file:///${tmpHtml.replace(/\\/g, '/')}"`);
  console.log('Successfully saved PNG to:', pngPath);
  fs.copyFileSync(pngPath, publicPngPath);
  fs.copyFileSync(pngPath, artifactPng);
  console.log('Copied to public and artifact directories.');
} finally {
  if (fs.existsSync(tmpHtml)) {
    fs.unlinkSync(tmpHtml);
  }
}
