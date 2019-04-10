'use strict'

const login = require('./login')
const launch = require('./launch')

// ミッションTOP。抽選URL取得、ミッション報酬受取で使用する
const MISSION_TOP = 'https://mission.games.dmm.com/'
// ミッションURLs
const MISSIONS = [
  'http://www.dmm.com/netgame/pachinko/-/game/', // デイリーパチンコ
  'http://personal.games.dmm.com/my-games/',
]
// ミッションゲームURLs あとで抽選URLとマージするときに使用する
// NOTE:
// URLが"http://pc-play.games.dmm.com/play/"じゃないのは、
// 抽選ミッションのURLとの重複からはじくためだけど、末尾だけ取得すればリダイレクトが減ってよいのでは
const MISSIONS_GAME = [
  'https://games.dmm.com/detail/oshirore/',
  'https://games.dmm.com/detail/aigisc/',
  'https://games.dmm.com/detail/baldr/',
  'https://games.dmm.com/detail/kancolle/',
]

void(async () => {
  const [browser, page] = await login()

  await Promise.all(MISSIONS.map(async (url, index) => {
    const page_name = await url.match(/(\w+)\/$/)[1]
    console.time(`loaded! ${page_name}`)

    const page = await browser.newPage()

    await page.goto(url, {waitUntil: 'domcontentloaded'})

    // await page.close()
    console.timeEnd(`loaded! ${page_name}`)
  }))

  // 抽選URLとミッションURLをマージして一意な配列にする
  await page.goto(MISSION_TOP)
  await page.waitFor('.fn-tabLottery')
  await page.click('.fn-tabLottery')
  const lotteries = await page.$$eval('.listMission_targetLink', els => els.map(n => n.href))
  const missions = [...new Set([...MISSIONS_GAME, ...lotteries])]

  // ミッション実行
  // 画像はじいたらこっちのほうが早くなった 40-45s
  await Promise.all(missions.map(async (url, index) => {
    const page_name = await url.match(/(\w+)\/$/)[1]
    console.time(`loaded! ${index + 1}_${page_name}`)

    const page = await browser.newPage()
    await page.setDefaultTimeout(100000)

    await page.goto(url, {waitUntil: 'domcontentloaded'})
    await page.waitFor('#foot')
    // await page.screenshot({
    //   path: `capture/mission/${index + 1}_${page_name}.png`,
    //   fullPage: true
    // })

    // await page.close()
    console.timeEnd(`loaded! ${index + 1}_${page_name}`)
  }))

  // FIXME: これを使わないようにしたい
  await page.waitFor(10000)
  await page.waitFor(10000)

  // ミッション報酬受け取り
  await page.goto(MISSION_TOP)
  await page.waitFor('.fn-tabReceive')
  await page.click('.receiveAll_btn')
  await page.waitFor('.fn-getMedalSingle')
  // await page.waitFor(5000)
  // await page.screenshot({path: 'capture/mission/99_freeget.png'})
  await console.log('freeget!')

  await browser.close()
})()
