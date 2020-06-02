const puppeteer = require('puppeteer');
async function getTokoPedia(item) {
  let processedItem = item.split(' ').join('%20');
  const browser = await puppeteer.launch({ headless: false }); // for test disable the headlels mode,
  const page = await browser.newPage();

  await page.setDefaultNavigationTimeout(0);

  await page.setViewport({ width: 1000, height: 926 });
  await page.goto(`https://www.tokopedia.com/search?st=product&q=${processedItem}`, {
    waitUntil: 'networkidle2',
  });

  /** @type {string[]} */
  const productNames = await page.evaluate(() => {
    const div = document.querySelectorAll(
      '#zeus-root > div > div.css-jau1bt > div > div.css-rjanld > div.css-jza1fo > div.css-1g20a2m'
    );

    const productnames = [];
    div.forEach((element) => {
      const titleelem = element.querySelector('.css-1bjwylw').textContent;
      const priceitem = element.querySelector('.css-1beg0o7').textContent;
      if (priceitem != null && titleelem != null) {
        productnames.push({
          title: titleelem,
          price: priceitem,
        });
      }
    });
    // titleelem != null &&
    return productnames;
  });

  // console.log(productNames);
  browser.close();
  return productNames;
}

export default getTokoPedia;
