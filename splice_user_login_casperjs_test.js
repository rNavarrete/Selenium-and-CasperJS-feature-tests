
casper.test.begin("Testing that I can get to the splice homepage", 1, function(test) {
casper.options.viewportSize = {width: 800, height: 600};

  casper.start("https://splice.com");

  casper.then(function() {
    test.assertTitle("Splice - Music Made Better | Splice", "Successfully found the correct title.");
    this.click(".signup");
    this.click(".signup");
  });

  casper.wait(3000, function () {
      casper.capture("screen.png");
  });


  casper.waitUntilVisible('.modal-content', function() {
    this.click(".signup");
    this.log('Modal has loaded');
  });




  casper.then(function() {
    casper.capture("page.png");
    casper.fillXPath("#registerModal", {
      "//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[1]" : "digital_mafioso7",
      "//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[2]" : "Rolando Navarrete",
      "//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[3]" : "xx@xx.com",
      "//*[@id='registerModal']/div/div/div/div/div/div/div[1]/form/input[4]" : "Godfather100!!"
    }, true);

    test.assertTitle("Splice - Dashboard | Splice", "Successfully found the correct title.");
  })


  casper.run(function() {
    test.done();
  })
});

