const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("chai").assert;
const server = "http://localhost:3002/adventures";

chai.use(chaiHttp);

suite("API routing for adventures", () => {
  suite("GET", () => {
    test("GET all adventures returns adventures", done => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          if (err) done(err);
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.isObject(res.body[0]);
          assert.isNumber(res.body[0].id);
          assert.isString(res.body[0].title);
          assert.isString(res.body[0].author);
          assert.isArray(res.body[0].tags);
          done();
        });
    });
    test("GET adventure by id returns that adventure", done => {
      chai
        .request(server)
        .get("/1")
        .end((err, res) => {
          if (err) done(err);
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.containsAllKeys(res.body, [
            "id",
            "title",
            "intro",
            "items",
            "mainStory",
            "colorPalette"
          ]);
          done();
        });
    });
  });
});
