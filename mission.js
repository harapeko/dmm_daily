'use strict';

const login = require('./login')

// ミッションTOP。抽選URL取得、ミッション報酬受取で使用する
const MISSION_TOP = 'https://mission.games.dmm.com/'
// ミッションURLs あとで抽選URLとマージするときに使用する
const MISSIONS_DEFAULT = [
  'http://www.dmm.com/netgame/pachinko/-/game/', // デイリーパチンコ
  'http://personal.games.dmm.com/my-games/',
  'https://games.dmm.com/detail/oshirore/',
  'https://games.dmm.com/detail/tohken/',
  'https://games.dmm.com/detail/seiken/',
  'https://games.dmm.com/detail/aigisc/',
  'https://games.dmm.com/detail/kanpani/',
]

void(async () => {
  const [browser, page] = await login()

  // 抽選URLとミッションURLをマージして一意な配列にする
  await page.goto(MISSION_TOP)
  await page.waitFor('.fn-tabLottery')
  await page.click('.fn-tabLottery')
  const lotteries = await page.$$eval('.listMission_targetLink', els => els.map(n => n.href))
  const missions = [...new Set([...MISSIONS_DEFAULT, ...lotteries])]

  // ミッション実行
  await Promise.all(missions.map(
    async (url, index) => {
      let page_name = url.match(/(\w+)\/$/)[1]
      await page.goto(url, {waitUntil: 'domcontentloaded'})
      // await page.waitFor(30000)
      await page.screenshot({
        path: `capture/mission/${index + 1}_${page_name}.png`,
        fullPage: true
      })
      await console.log(`loaded! ${page_name}`)
    }
  ))

  // ミッション報酬受け取り
  await page.goto(MISSION_TOP)
  await page.waitFor('.fn-tabReceive')
  await page.click('.receiveAll_btn')
  await page.waitFor('.fn-getMedalSingle')
  // await page.screenshot({path: 'capture/mission/99_freeget.png'})
  await console.log('freeget!')

  await browser.close()
})()
