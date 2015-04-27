var chai        = require("chai"),
    assert      = chai.assert,
    expect      = chai.expect,
    webdriver_angular = require("webdriverjs-angular");

describe("Test for splice signin and logout", function(){

  this.timeout(99999999);
  var client = {};
  before(function(){
      client = webdriver_angular.remote({ desiredCapabilities: {browserName: "chrome"} });
      client.init();
  });

  it("user with valid information can login and logout", function(done) {
      client
          .url("https://splice.com")
          .getTitle(function(err, title) {
            assert.strictEqual(title, 'Splice - Music Made Better | Splice');
          })
          .click("#header-nav > div > ul.nav.navbar-nav.navbar-right.m-welcome-nav.js-signed-out > li:nth-child(1) > a")
          .setValue("#registerModal > div > div > div > div > div > div > div > div > form > div > div > div > input:nth-child(1)", "digital_mafioso20")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div/div/form/div/div/div/input[2]", "Godfather100!!")
          .click("#submit_signin")
          .getTitle(function(err, title) {
            assert.strictEqual(title, 'Dashboard | Splice');
          })
          .click("//*[@id='header-nav']/div/ul[4]/li[7]/a/img")
          .click(".js-signout")
          .getTitle(function(err, title) {
            assert.strictEqual(title, 'Splice - Music Made Better | Splice');
          })
          .call(done);
  });

  after(function(done){
    client.end(done);
  });
});

