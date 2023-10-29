require("chromedriver");
var webdriver = require("selenium-webdriver");
var assert    = require("chai").assert;
var until     = webdriver.until;
var By        = webdriver.By;
var Key       = webdriver.Key;


describe("Key Test", function(){

    this.timeout(40000);
    var driver;

    before(function () {
        driver = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();
    });

    after(function() {
        return driver.quit();
    });

    it("This should open AITU website", function() {
        return driver.get("localhost:3000");
    });

    it("Aitu UI TEST - completed", function() {


        return driver.getTitle().then(function(title) {
            assert.equal(title, "Aitu UI TEST - completed");
        });
    });
    it("Aitu UI TEST - completed", async function() {
        var title = await driver.getTitle();
        return assert.include(title, "Aitu UI TEST - completed");
    });

    it("Aitu UI TEST - completed", async function() {
        var element = await driver.findElement(By.id("input-search"));
        return element.sendKeys("exotic" + Key.RETURN)
    });
    it("Should display 400 search results for 'exotic'", async function() {
        await driver.wait(until.titleContains("exotic"), 30000);
        console.log(await driver.getTitle());

        var html = await driver.findElement(By.tagName("body")).getAttribute("innerHTML");
        return assert.include(html, "400");
    });

});