/* global angular */
(function(){
  'use strict';

  var angular = require('angular');
  var formly = require('angular-formly');
  var formlyBootstrap = require('angular-formly-templates-bootstrap');

  var app = angular.module('app', [formly, formlyBootstrap]);

  app.controller('MyFormCtrl', function MyFormCtrl($timeout) {
    var vm = this; // vm stands for "View Model"
    vm.onSubmit = onSubmit;

    var takenUsernames = ['foo', 'bar', 'baz'];

    // variable assignment
    vm.model = {};
    vm.fields = [
      {
        key: 'firstName',
        type: 'input',
        templateOptions: {
          label: 'First name',
          required: true
        },
      },
      {
        key: 'lastName',
        type: 'input',
        templateOptions: {
          label: 'Last name',
          required: true
        },
        expressionProperties: {
          'templateOptions.disabled': function($viewValue, $modelValue, scope) {
            // return !scope.model.firstName;
            return $timeout(function(){
              return !scope.model.firstName;
            }, 1000);
          }
        }
      },
      {
        key: 'agree',
        type: 'checkbox',
        templateOptions: {
          label: 'I agree to whatever',
          required: true
        }
      },
      {
        key: 'sure',
        type: 'input',
        templateOptions: {
          label: 'Are you sure?',
          placeholder: 'Type "Yes"'
        },
        expressionProperties: {
          hide: '!model.agree'
        },
        validators: {
          isYes: '$viewValue === "Yes"'
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