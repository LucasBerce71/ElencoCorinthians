const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.corinthians.com.br/');


  const imgList = await page.evaluate(() => {
    const nodeList = document.querySelectorAll('.slick-track img');
    const imgArray = [...nodeList];
    const imgList = imgArray.map(({ src }) => ({
      src
    }));

    return imgList;
  });

  fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
    if (err) throw new Error('something went wrong');

    console.log('well done!');
  });

  await browser.close();
})();