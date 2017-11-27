var casper = require('casper').create();
var system = require('system');

var URL_FREEGET  = 'http://www.dmm.com/netgame/freeget/';
var URL_EXCHANGE = 'http://www.dmm.com/netgame/freeget/-/exchange/';

casper.start(URL_FREEGET, function() {
  this.echo('start');
  this.fill('form.login', {
    'login_id': system.env.DMM_ID,
    'password': system.env.DMM_PASS
}, true);
  this.capture('capture/exchange/start.png');
});

casper.waitForUrl(URL_FREEGET, function() {
  this.capture('capture/exchange/logined.png');
});

casper.then(function() {
  this.click('.bt-all');
  this.capture('capture/exchange/bt-all.png');

  this.click('.bt-trade');
  this.capture('capture/exchange/bt-trade.png');
});

casper.waitForUrl(URL_EXCHANGE, function() {
  this.capture('capture/exchange/exchange.png');

  this.click('.exchange-once a');
  this.capture('capture/exchange/exchange-once.png');

  this.click('.fn-exchange');
});

// TODO：遷移を待つURLはこれじゃないかもしれないので、
//       ポイントがたまったら手動で確認する
casper.waitForUrl(URL_FREEGET, function() {
  this.capture('capture/exchange/fn-exchange.png');
});

casper.run(function () {
  this.echo('end').exit();
});