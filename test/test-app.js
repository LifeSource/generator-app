var path = require("path"),
    assert = require("yeoman-generator").assert,
    helper = require("yeoman-generator").test;

describe("yo:app", function () {
    
    describe("default", function () {
        before(function (done) {
           helpers.run(path.join(__dirname, "../app"))
               .withArguments("MyCoolApp")
               .withOptions({ skipInstall: true })
               .on("end", done);
        });

        it("create files", function () {
           assert.file([
                "package.json",
                "app.js"
           ]);
        });

        it("adds default ngapp", function () {
            
        });
    });
});
