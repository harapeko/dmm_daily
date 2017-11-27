var casper = require('casper').create();
var system = require('system');

var DAILY_PACHINKO = 'http://www.dmm.com/netgame/pachinko/-/game/';
var GAMES_TOP      = 'http://games.dmm.com/';
var GAMES_1        = 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=777106/';
var GAMES_2        = 'http://pc-play.games.dmm.com/play/strike';
var GAMES_3        = 'http://pc-play.games.dmm.com/play/seiken';
var GAMES_4        = 'http://www.dmm.com/netgame/social/-/gadgets/=/app_id=854854/';
var GAMES_5        = 'http://pc-play.games.dmm.com/play/kanpani';

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

// GAME1
casper.thenOpen(GAMES_1, function() {
  this.capture('capture/mission/GAMES_1.png');
});

// GAME2
casper.thenOpen(GAMES_2, function() {
  this.capture('capture/mission/GAMES_2.png');
});

// GAME3
casper.thenOpen(GAMES_3, function() {
  this.capture('capture/mission/GAMES_3.png');
});

// GAME4
casper.thenOpen(GAMES_4, function() {
  this.capture('capture/mission/GAMES_4.png');
});

// GAME5
casper.thenOpen(GAMES_5, function() {
  this.capture('capture/mission/GAMES_5.png');
});

casper.run(function () {
  this.echo('end').exit();
});