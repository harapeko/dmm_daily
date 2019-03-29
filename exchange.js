const puppeteer = require('puppeteer')

const LOGIN_PAGE = 'https://accounts.dmm.com/service/login/password'
const EXCHANGES = [
  'https://mission.games.dmm.com/exchange/',
  'https://mission.games.dmm.com/pachinko-exchange/',
]


void(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setRequestInterception(true)
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
      interceptedRequest.abort()
    else
      interceptedRequest.continue()
  });

  // ログイン
  await page.goto(LOGIN_PAGE, {waitUntil: 'domcontentloaded'})
  await page.type('#login_id', process.env.DMM_ID)
  await page.type('#password', process.env.DMM_PASS)
  await page.click('input[type=submit]')

  await console.log('login...')
  await page.screenshot({path: `capture/exchange/0_login.png`})
  await page.waitForNavigation({waitUntil: 'domcontentloaded'})
  await page.screenshot({path: `capture/exchange/0_logined.png`})
  await console.log('logined!')

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
