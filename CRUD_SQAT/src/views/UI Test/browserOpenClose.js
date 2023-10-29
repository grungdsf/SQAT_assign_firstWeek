require("chromedriver");
var webdriver = require("selenium-webdriver");
var assert    = require("chai").assert;
describe("Open Close ", function(){

    this.timeout(30000);
    var driver;

    before(function () {

        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
    });

    after(function() {
        return driver.quit();
    });
    it("Aitu UI TEST - completed", function() {
        return driver.get("localhost:3000");
    });

    it("Aitu UI TEST - completed", function() {
        return driver.getTitle().then(function(title) {
            assert.equal(title, "AITU");
        });
    });

    it("Aitu UI TEST - completed", async function() {
        var title = await driver.getTitle();
        return assert.equal(title, "AITU");
    });

});