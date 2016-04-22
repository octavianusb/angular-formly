/* global angular */
  require('angular');
  require('angular-formly');
  var formlyBootstrap = require('angular-formly-templates-bootstrap');

  var app = angular.module('app', ['formly', formlyBootstrap]);

  app.run(function(formlyConfig){
    formlyConfig.setType({
      name: 'ipAddress',
      defaultOptions: {
        templateOptions: {
          label: 'IP Address',
          placeholder: '127.0.0.1'
        },
        validators: {
          ipAddress: function($viewValue, $modelValue) {
            var value = $viewValue || $modelValue;
            return !value || vlaidateIpAddress(value);
          }
        }
      }
    });

    function vlaidateIpAddress(value) {
      return /(\d{1,3}\.){3}\d{1,3}/.test(value);
    }
  });

  app.controller('MyFormCtrl', function MyFormCtrl($timeout) {
    var vm = this; // vm stands for "View Model"
    vm.onSubmit = onSubmit;

    // variable assignment
    vm.model = {};
    vm.fields = [
      {
        key: 'firstName',
        type: 'input',
        templateOptions: {
          label: 'First name',
          required: true,
          minlength: 6,
          maxlength: 12,
          // onClick: function($viewValue, $modelValue, scope) {
          //   alert('Hello!');
          // }
          onClick: 'model.lastName = "clicked!"'
        },
      },
      {
        key: 'lastName',
        type: 'input',
        templateOptions: {
          label: 'Last name'
        }
      },
      {
        key: 'defaultInput',
        type: 'input',
        defaultValue: 'additional text',
        templateOptions: {
          label: 'Default input'
        }
      },
      {
        key: 'ipAddress',
        type: 'input',
        optionsTypes: ['ipAddress'],
        templateOptions: {
          label: 'My IP Address'
        }
      },
      {
        key: 'options',
        type: 'select',
        templateOptions: {
          label: 'Main options',
          options: [
            {name: 'Lorem', value: 'lorem'},
            {name: 'Ipsum', value: 'ipsum'},
            {name: 'Dolor', value: 'dolor'},
            {name: 'Sit', value: 'sit'},
            {name: 'Amet', value: 'amet'}
          ]
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
  });