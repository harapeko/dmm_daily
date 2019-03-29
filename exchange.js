'use strict';

const login = require('./login')

const EXCHANGES = [
  'https://mission.games.dmm.com/exchange/',
  'https://mission.games.dmm.com/pachinko-exchange/',
]

void(async () => {
  const [browser, page] = await login()

  // 交換実行
  await Promise.all(EXCHANGES.map(
    async (url, index) => {
      let page_name = url.match(/(\w*-?\w+)\/$/)[1]
      await page.goto(url, {waitUntil: 'domcontentloaded'})
      await page.waitFor('.c-pageTitle')

      if ( await page.$('.c-btnPrimary.fn-modalOpen').then(el => !!el) ) {
        await page.click('.c-btnPrimary.fn-modalOpen')
        await page.waitFor('.c-btnPrimary.fn-exchange')
        await page.click('.c-btnPrimary.fn-exchange')
        await page.screenshot({path: `capture/exchange/${index + 1}_${page_name}.png`})
      }

      await console.log(`done! ${page_name}`)
    }
  ))

  await browser.close()
})()
