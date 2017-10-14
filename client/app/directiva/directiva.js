'use strict';

angular.module('videoClubApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('directiva', {
        url: '/directiva',
        template: '<directiva></directiva>'
      });
  });
