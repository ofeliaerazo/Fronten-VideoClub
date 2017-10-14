'use strict';

describe('Component: DirectivaComponent', function () {

  // load the controller's module
  beforeEach(module('videoClubApp'));

  var DirectivaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DirectivaComponent = $componentController('DirectivaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
