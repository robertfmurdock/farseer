'use strict';
var setup = require('../common/data-setup');

describe('The players in a world', function () {
  describe('when there are no players', function () {
    beforeEach(function (done) {
      setup.purgeData()
        .then(browser.get('playersMap'))
        .then(done);
      setup.addWorld('Tiger', 'Tiger')
        .then(browser.get('worlds/Tiger/players'));
      element(by.model('newPlayer.name')).sendKeys('Nancy');
      element(by.model('newPlayer.email')).sendKeys('nancy@gmail.com');

    });

    it('can add a new team member', function () {
      element(by.model('newPlayer._team')).sendKeys('/teamA');
      element(by.id('addPlayer')).click();

      var players = element.all(by.repeater('player in players'));

      expect(players.count()).toEqual(1);
    });

    it('will not save if team url is not valid', function () {
      element(by.model('newPlayer._team')).sendKeys('/');
      element(by.id('addPlayer')).click();

      var players = element.all(by.repeater('player in players'));

      expect(players.count()).toEqual(0);
    });

    it('will not update team url if not valid', function () {
      element(by.model('newPlayer._team')).sendKeys('/teamA');
      element(by.id('addPlayer')).click();
      var players = element.all(by.repeater('player in players'));

      expect(players.count()).toEqual(1);

      element(by.model('player._team')).click().clear().sendKeys('/');
      element(by.id('updatePlayer')).click();

      expect(element(by.className('message ng-binding error')).getText()).toBe('Check team url of player. Update not successful.')
    });
  });
});
