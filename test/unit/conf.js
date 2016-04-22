//conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['index.spec.js'],
  // Options to be passed to Jasmine.
  jasmineNodeOpts: {
      showColors: true,
      defaultTimeoutInterval: 30000
  }
}