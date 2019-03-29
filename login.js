'use strict'

const puppeteer = require('puppeteer')

// ログインページ
const LOGIN_PAGE = 'https://accounts.dmm.com/service/login/password'

module.exports = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setRequestInterception(true)
  await page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
      interceptedRequest.abort()
    else
      interceptedRequest.continue()
  })

  // ログイン
  await page.goto(LOGIN_PAGE, {waitUntil: 'domcontentloaded'})
  await page.type('#login_id', process.env.DMM_ID)
  await page.type('#password', process.env.DMM_PASS)
  await page.click('input[type=submit]')

  await console.log('login...')
  // await page.screenshot({path: `capture/mission/0_login.png`})
  await page.waitForNavigation({waitUntil: 'domcontentloaded'})
  // await page.screenshot({path: `capture/mission/0_logined.png`})
  await console.log('logined!')

  return [browser, page]
}
