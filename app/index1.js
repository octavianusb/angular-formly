/* global angular */
(function(){
  'use strict';

  var angular = require('angular');
  var formly = require('angular-formly');
  var formlyBootstrap = require('angular-formly-templates-bootstrap');

  var app = angular.module('app', [formly, formlyBootstrap]);

  // app.run(function(formlyConfig) {
  //   formlyConfig.setType({
  //     name: 'awesomeTitle',
  //     templateUrl: 'input.html'
  //   })
  // });

  app.controller('MyFormCtrl', function MyFormCtrl($timeout) {
    var vm = this; // vm stands for "View Model"
    vm.onSubmit = onSubmit;

    var takenUsernames = ['foo', 'bar', 'baz'];

    // variable assignment
    vm.model = {};
    vm.fields = [
      {
        type: 'input',
        key: 'firstName',
        templateOptions: {
          label: 'First name'
        },
        validators: {
          notBob: '$viewValue !== "Bob"'
        }
      },
      {
        type: 'input',
        key: 'ipAddress',
        templateOptions: {
          label: 'IP Address'
        },
        validators: {
          ipAddress: function($viewValue, $modelValue, scope) {
            var value = $modelValue || $viewValue;
            if(value) {
              return vlaidateIpAddress(value);
            } else {
              return true;
            }
          }
        }
      },
      // asyncronus validation
      {
        type: 'input',
        key: 'username',
        templateOptions: {
          label: 'Username'
        },
        validators: {
          isUnique: function($viewValue, $modelValue, scope) {
            var value = $viewValue || $modelValue;
            return $timeout(function() {
              if(takenUsernames.indexOf(value) !== -1) {
                throw new Error('Not unique!')
              } else {
                console.log('Unique');
              }
            }, 1000);
          }
        }
      }
    ];

    // copy fields because formly adds data to them
    // that is not necessary to show for the purposes
    // of this lesson
    vm.originalFields = angular.copy(vm.fields);

    // function definition
    function onSubmit() {
      alert(JSON.stringify(vm.model), null, 2);
    }

    function vlaidateIpAddress(value) {
      return /(\d{1,3}\.){3}\d{1,3}/.test(value);
    }
  });
})();