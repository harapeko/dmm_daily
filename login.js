'use strict'

const launch = require('./launch')

// ログインページ
const LOGIN_PAGE = 'https://accounts.dmm.com/service/login/password'

module.exports = async () => {
  const [browser, page] = await launch()

  // ログイン
  await page.goto(LOGIN_PAGE, {waitUntil: 'domcontentloaded'})
  await page.type('#login_id', process.env.DMM_ID)
  await page.type('#password', process.env.DMM_PASS)
  await page.click('input[type=submit]')

  await console.log('login...')
  // await page.screenshot({path: `capture/mission/0_login.png`})
  await page.waitForNavigation({waitUntil: 'domcontentloaded'})
  // await page.screenshot({path: `capture/mission/0_logined.png`})s
  await console.log('logined!')

  return [browser, page]
}
