var casper = require('casper').create();
var system = require('system');

var DAILY_PACHINKO = 'http://www.dmm.com/netgame/pachinko/-/game/';
var GAMES_TOP      = 'http://games.dmm.com/';
var FREE_GET       = 'http://www.dmm.com/netgame/freeget/';
var GAMES = [
  'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=777106/',
  'http://pc-play.games.dmm.com/play/strike',
  'http://pc-play.games.dmm.com/play/seiken',
  'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/',
  'http://pc-play.games.dmm.com/play/kanpani',
]

// デイリーパチンコ
// ログインするためにデイリーパチンコから始める(トップだとログインフォームにリダイレクトされないので)
casper.start(DAILY_PACHINKO, function() {
  this.echo('start');
  this.fill('form.login', {
    'login_id': system.env.DMM_ID,
    'password': system.env.DMM_PASS
}, true);
  this.capture('capture/mission/login.png');
});

casper.waitForUrl(DAILY_PACHINKO, function() {
  this.capture('capture/mission/DAILY_PACHINKO.png');
});

// DMMゲームトップ
casper.thenOpen(GAMES_TOP, function() {
  this.capture('capture/mission/GAMES_TOP.png');
});

// 各ゲーム
casper.each(GAMES, function(self, link) {
  self.thenOpen(link, function() {
      this.capture('capture/mission/' + this.getTitle() + '.png');
  });
});

// ミッション受取
casper.thenOpen(FREE_GET, function() {
  this.waitForSelector(".bt-all", function success() {

    this.capture('capture/mission/FREE_GET.png');
    // click後 完了まで待つ
    // TODO：waitForSelectorを使うように修正する
    this.then(function() {
      this.click('.bt-all');
    }).wait(4000);

    this.capture('capture/mission/FREE_GOT.png');
    
  });
});

casper.run(function () {
  this.echo('end').exit();
});