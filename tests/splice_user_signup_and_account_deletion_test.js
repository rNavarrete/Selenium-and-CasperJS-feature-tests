// chai is an assertion library http://chaijs.com
var chai              = require("chai"),
    assert            = chai.assert,
    expect            = chai.expect,
    webdriver_angular = require("webdriverjs-angular"),
// Load and instantiate Chance (a minimalist generator of random strings.
    chance = require('chance').Chance();


describe("Testing splice sign up and account deletion.", function(){

  this.timeout(99999999);
  var client = {};

  var randomUserName = chance.name(),
      randomFullName = chance.name(),
      randomEmail    = chance.email(),
      randomPassword = chance.word({length: 8});

  before(function(){
      client = webdriver_angular.remote({ desiredCapabilities: {browserName: "chrome"} });
      client.init();
  });

  it("user with valid information can sign up successfully and then delete their account", function(done) {
      client
          .url("https://splice.com")
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", randomFullName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", randomEmail)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", randomPassword)
          .click("#tos")
          .click("#submit_signup")
          .getTitle(function(err, title) {
            assert.strictEqual(title, 'Dashboard | Splice');
          })
          // XPath for the dropdown menu on the user dashboard.
          .click("//*[@id='header-nav']/div/ul[4]/li[7]/a/img")
          // XPath for the edit profile link in the dropdown menu.
          .click("//*[@id='header-nav']/div/ul[4]/li[7]/ul/li[2]/a")
          .url(function(err,res) { 
            assert.strictEqual(res.value, "https://splice.com/profile/edit");
          })
          .click("//*[@id='inviteModal']/div/div/div/div/div[1]/div[1]")
          .click("/html/body/div[1]/div[3]/div/div[2]/div/div/div[2]/h5[3]/a")
          .alertAccept()
          .pause(700)
          .alertAccept()
          // XPath for the sigin button
          .click("//*[@id='header-nav']/div/ul[3]/li[1]/a")
          // using the same credentials used to register earlier.
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div/div/form/div/div/div/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div/div/form/div/div/div/input[2]", randomPassword)
          .click("#submit_signin")
          .pause(1000)
          .getText('.dynamic-flash', function(err, text) {
            assert.strictEqual(text, "Sorry, your username or password is incorrect.\n×");
          }).call(done); 
  });

  after(function(done){
    client.end(done);
  });
});

