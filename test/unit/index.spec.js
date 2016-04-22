
  describe('Test for angular formly', function() {
    browser.get('http://localhost:8080/');
    var firstName = element(by.css('form [id*=input_firstName]'));
    var lastName = element(by.css('form [id*=input_lastName]'));

    it('should have a title', function() {
      expect(browser.getTitle()).toEqual('angular formly');
    });

    it('should have a valid lastName value set on "clicked!"', function() {
      firstName.click();
      firstName.sendKeys('test value');

      expect(lastName.getAttribute('value')).toEqual("clicked!");
    });
  });