var chai        = require("chai"),
    assert      = chai.assert,
    expect      = chai.expect,
    webdriver_angular = require("webdriverjs-angular");

describe("Test for splice sign up", function(){

  this.timeout(99999999);
  var client = {};

  before(function(){
      client = webdriver_angular.remote({ desiredCapabilities: {browserName: "chrome"} });
      client.init();
  });

  it("user with valid information sign up successfully", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", "digital_mafioso20")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", "Rolando Navarrrete")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", "tonythetiger@gmail.com")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", "Godfather100!!")
          .click("#tos")
          .click("#submit_signup")
          .getTitle(function(err, title) {
            assert.strictEqual(title, 'Dashboard | Splice');
          }).call(done);
  });

  after(function(done){
    client.end(done);
  });
});

