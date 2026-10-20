// Renders resume.html to public/Resume_Final.pdf. Run: node resume/build.js
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'resume.html'));
  await page.pdf({
    path: path.join(__dirname, '..', 'public', 'Resume_Final.pdf'),
    format: 'Letter',
    preferCSSPageSize: true,
    printBackground: true,
  });
  await browser.close();
})();
