var request = require('supertest')
    , app = require('../app.js');

describe('GET /', function () {
    it('responded with 200', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    })
});

describe("Push a paste", function () {
    it("responded with a redirect 302", function (done) {
        request(app)
            .post("/submit")
            .send({data: "I am the `input`", style: "ir-black"})
            .expect(302)
            .expect("Location", /p/, done)
    })
});
