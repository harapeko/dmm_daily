var casper = require('casper').create();
var system = require('system');

var URL = 'http://www.dmm.com/netgame/freeget/';

casper.start(URL, function() {
  this.echo('start');
  this.fill('form.login', {
    'login_id': system.env.DMM_ID,
    'password': system.env.DMM_PASS
}, true);
  this.capture('capture/exchange/start.png');
});

casper.waitForUrl('http://www.dmm.com/netgame/freeget/', function() {
  this.capture('capture/exchange/logined.png');
});

casper.then(function() {
  this.click('.bt-all');
  this.capture('capture/exchange/bt-all.png');

  this.click('.bt-trade');
  this.capture('capture/exchange/bt-trade.png');
});

casper.waitForUrl('http://www.dmm.com/netgame/freeget/-/exchange/', function() {
  this.capture('capture/exchange/exchange.png');

  this.click('.exchange-once a');
  this.capture('capture/exchange/exchange-once.png');

  this.click('.fn-exchange');
});

// TODO：遷移を待つURLはこれじゃないかもしれないので、
//       ポイントがたまったら手動で確認する
casper.waitForUrl('http://www.dmm.com/netgame/freeget/', function() {
  this.capture('capture/exchange/fn-exchange.png');
});

casper.run(function () {
  this.echo('end').exit();
});