'use strict';
(function(){

class DirectivaComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('videoClubApp')
  .component('directiva', {
    templateUrl: 'app/directiva/directiva.html',
    controller: DirectivaComponent
  });

})();
