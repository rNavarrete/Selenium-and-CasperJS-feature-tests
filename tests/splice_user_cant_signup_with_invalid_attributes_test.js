// chai is an assertion library http://chaijs.com
var chai              = require("chai"),
    assert            = chai.assert,
    expect            = chai.expect,
    webdriver_angular = require("webdriverjs-angular"),
// Load and instantiate Chance (a minimalist generator of random strings.
    chance = require('chance').Chance();


describe("Testing for invalid attributes at signup", function(){

  this.timeout(99999999);
  var client = {};

  var randomUserName = chance.name(),
      randomFullName = chance.name(),
      randomEmail    = chance.email(),
      randomPassword = chance.word({length: 8});

  before(function(){
      client = webdriver_angular.remote({ desiredCapabilities: {browserName: "chrome"} });
      client.init()
  });

  it("user attempting to signup with a username of two characters recieves an error message.", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", chance.string({length: 2}))
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", randomFullName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", randomEmail)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", randomPassword)
          .click("#tos")
          .click("#submit_signup")
          // asserting that we are still on the splice homepage.
          .url(function(err,res) {
            assert.strictEqual(res.value, "https://splice.com/");
          })
          // asserting that we get the warning message that we need to enter a
          // username with at least 3 characters.
          .getText('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/div[1]', function(err, text) {
            assert.strictEqual(text, "Username must be 3 characters.");
          }).call(done);
  });


  it("user attempting to signup with a Full Name of two characters recieves an error message.", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", chance.string({length: 2}))
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", randomEmail)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", randomPassword)
          .click("#tos")
          .click("#submit_signup")
          // asserting that we are still on the splice homepage.
          .url(function(err,res) { 
            assert.strictEqual(res.value, "https://splice.com/");
          })
          // In this case there isn't a validation message informing the user
          // that they need at least three characters for a valid full name.
          // I decided to target the class name that's generated with an invalid
          // entry.
          .getAttribute('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/input[2]', 'class', function(err, attr) {
            assert.strictEqual(attr, "ng-invalid ng-dirty ng-valid-parse ng-valid-required ng-invalid-minlength ng-touched");
          }).call(done);
  });


  it("user attempting to signup with an invalid email recieves an error message.", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", randomFullName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", chance.string({length: 10}))
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", randomPassword)
          .click("#tos")
          .click("#submit_signup")
          .url(function(err,res) { 
            assert.strictEqual(res.value, "https://splice.com/");
          })
          .getText('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/div[1]', 'class', function(err, attr) {
            assert.strictEqual(attr, "Please enter a valid email.");
          }).call(done);
  });


  it("user attempting to signup with a two character password recieves an error message.", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", randomFullName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", randomEmail)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", chance.string({length: 2}))
          .click("#tos")
          .getText('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/div[1]', 'class', function(err, attr) {
            assert.strictEqual(attr, "Password is minimum 8 characters.");
          })
          .click("#submit_signup")
          .getText('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/div[1]', 'class', function(err, attr) {
            assert.strictEqual(attr, "Terms must be accepted");
          }).call(done);
  });


  it("user attempting to signup without accepting the terms of service recieves an error message.", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", randomFullName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", randomEmail)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", chance.string({length: 2}))
          .click("#tos")
          .getText('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/div[1]', 'class', function(err, attr) {
            assert.strictEqual(attr, "Password is minimum 8 characters.");
          })
          .click("#submit_signup")
          .getText('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/div[1]', 'class', function(err, attr) {
            assert.strictEqual(attr, "Terms must be accepted");
          }).call(done);
  });


  it("user attempting to signup without entering a username recieves an error message.", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", randomFullName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", randomEmail)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", randomPassword)
          .click("#tos")
          .click("#submit_signup")
          // asserting that we are still on the splice homepage.
          .url(function(err,res) {
            assert.strictEqual(res.value, "https://splice.com/");
          })
          // In this scenario we don't get a message telling us to fill in the
          // username field, we do see the text field get a red highlight.
          .getAttribute('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/input[1]', 'class', function(err, attr) {
            assert.strictEqual(attr, "first-child ng-pristine ng-untouched ng-invalid ng-invalid-required ng-valid-minlength");
          }).call(done);
  });


  it("user attempting to signup without entering a full name recieves an error message.", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", randomEmail)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", randomPassword)
          .click("#tos")
          .click("#submit_signup")
          // asserting that we are still on the splice homepage.
          .url(function(err,res) {
            assert.strictEqual(res.value, "https://splice.com/");
          })
          // In this scenario we don't get a message telling us to fill in the
          // username field, we do see the text field get a red highlight.
          .getAttribute('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/input[2]', 'class', function(err, attr) {
            assert.strictEqual(attr, "ng-pristine ng-untouched ng-invalid ng-invalid-required ng-valid-minlength");
          }).call(done);
  });


  it("user attempting to signup without entering an email recieves an error message.", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", randomFullName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", randomPassword)
          .click("#tos")
          .click("#submit_signup")
          // asserting that we are still on the splice homepage.
          .url(function(err,res) {
            assert.strictEqual(res.value, "https://splice.com/");
          })
          // In this scenario we don't get a message telling us to fill in the
          // username field, we do see the text field get a red highlight.
          .getAttribute("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", 'class', function(err, attr) {
            assert.strictEqual(attr, "ng-pristine ng-untouched ng-valid-email ng-invalid ng-invalid-required");
          }).call(done);
  });

  it("user attempting to signup without entering a password recieves an error message.", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", randomFullName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", randomEmail)
          .click("#tos")
          .click("#submit_signup")
          // asserting that we are still on the splice homepage.
          .url(function(err,res) {
            assert.strictEqual(res.value, "https://splice.com/");
          })
          // In this scenario we don't get a message telling us to fill in the
          // username field, we do see the text field get a red highlight.
          .getAttribute("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", 'class', function(err, attr) {
            assert.strictEqual(attr, "ng-pristine ng-untouched ng-invalid ng-invalid-required ng-valid-minlength");
          }).call(done);
  });
  after(function(done){
    client.end(done);
  });
});


