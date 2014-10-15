;(function(){
  'use strict';

  function SkeletonController(){
    var vm = this;

    vm.test = 'Testing testing one two one two';
  }

  angular.module('controllers', [])
    .controller('SkeletonController', SkeletonController);

})();