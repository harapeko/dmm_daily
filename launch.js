'use strict'

const puppeteer = require('puppeteer')

module.exports = async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()
  await page.setDefaultTimeout(100000)
  // 動かなくなってしまった
  // await page.setRequestInterception(true)
  // await page.on('request', interceptedRequest => {
  //   if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
  //     interceptedRequest.abort()
  //   else
  //     interceptedRequest.continue()
  // })


  return [browser, page]
}
