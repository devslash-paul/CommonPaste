var request = require('supertest')
    , app = require('../app.js')
    , $ = require('cheerio');

describe("Push a paste", function () {
    var newURL, shortURL;

    it("responded with a redirect 302", function (done) {
        request(app)
            .post("/submit")
            .send({data: "I am the `input`", style: "ir-black"})
            .expect(302)
            .expect("Location", /p/)
            .end(function (err, res) {
                if (err) return done(err)
                newURL = res.headers["location"]
                done()
            });
    });

    it("can get just created snip", function (done) {
        request(app)
            .get(newURL)
            .expect(200)
            .expect(/I am the `input`/)
            .end(done)
    });

    it("can get a short URL that directs to the new URL", function (done) {
        request(app)
            .get(newURL)
            .expect(200)
            .expect(/autoselect/)
            .expect(function(res){
                shortURL = $(res.text).find("#autoselect").attr('value');
            })
            .end(done)
    });

    it("can get just created snip!", function (done) {
        request(app)
            .get(shortURL)
            .expect(302)
            .expect("Location", newURL, done)
    });




});


