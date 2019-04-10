'use strict'

const login = require('./login')
const launch = require('./launch')

const EXCHANGES = [
  'https://mission.games.dmm.com/exchange/',
  'https://mission.games.dmm.com/pachinko-exchange/',
]

void(async () => {
  const [browser, page] = await login()

  // 交換実行
  await Promise.all(EXCHANGES.map(async (url, index) => {
    const page_name = await url.match(/(\w*-?\w+)\/$/)[1]

    const page = await browser.newPage()
    // await page.setDefaultTimeout(100000)

    await page.goto(url, {waitUntil: 'domcontentloaded'})
    await page.waitFor('.c-pageTitle')
    await page.waitFor('.c-capt01')

    const isExchange = await page.$x("//h2[text()='一括交換する']").then(el => !!el.length)

    if ( isExchange ) {
      await page.click('.c-btnPrimary.fn-modalOpen')
      await page.waitFor('.c-btnPrimary.fn-exchange')
      await page.click('.c-btnPrimary.fn-exchange')

      await page.waitFor('.p-modal.fn-modal.fn-modalClose.is-commit.is-active')
      // await page.screenshot({path: `capture/exchange/${index + 1}_${page_name}.png`})
      await console.log(`done! ${page_name}`)
    }
  }))

  await browser.close()
})()
