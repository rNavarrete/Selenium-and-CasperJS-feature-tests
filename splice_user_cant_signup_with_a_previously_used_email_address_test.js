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

  it("user attempting to sign up using a previously used email address gets an error message.", function(done) {
      client
          // user registers on the site.
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
          //click on the user dropdown menu in the dashboard
          .click("//*[@id='header-nav']/div/ul[4]/li[7]/a/img")
          //click on the sign out button.
          .click(".js-signout")
          .getTitle(function(err, title) {
            assert.strictEqual(title, 'Splice - Music Made Better | Splice');
          })
          // user tries to sign up again using the same credentials
          .click(".signup-button")
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]", randomUserName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]", randomFullName)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]", randomEmail)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]", randomPassword)
          .click("#tos")
          .click("#submit_signup")
          //user gets the appropriate error message
          .getText('//*[@id="registerModal"]/div/div/div/div/div/div/div[1]/form/div[1]', 'class', function(err, attr) {
            assert.strictEqual(attr, "Email is already taken.");
          })
          // we click outside of the modal to be able to access the signin link
          .moveTo(null, 75, 75) 
          .buttonPress(0)
          .pause(900)
          // we signin once again to delete the test user account.
          .setValue("#registerModal > div > div > div > div > div > div > div > div > form > div > div > div > input:nth-child(1)", randomEmail)
          .setValue("//*[@id='registerModal']/div/div/div/div/div/div/div/div/form/div/div/div/input[2]", randomPassword)
          .click("#submit_signin")
          // XPath for the dropdown menu on the user dashboard.
          .click("//*[@id='header-nav']/div/ul[4]/li[7]/a/img")
          // XPath for the edit profile link in the dropdown menu.
          .click("//*[@id='header-nav']/div/ul[4]/li[7]/ul/li[2]/a")
          // XPath for the delete account link in the edit account page.
          .click("/html/body/div[1]/div[3]/div/div[2]/div/div/div[2]/h5[3]/a")
          .alertAccept()
          .pause(700)
          .alertAccept()
          .call(done);
  })

  after(function(done){
    client.end(done);
  });
});



