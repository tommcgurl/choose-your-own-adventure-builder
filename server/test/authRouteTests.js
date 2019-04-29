const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("chai").assert;
const server = "http://localhost:3002/auth";

chai.use(chaiHttp);

suite("API routing for Local authentication", () => {
  suite("POST", () => {
    test("POST incorrect user info results in Unauthorized status", done => {
      chai
        .request(server)
        .post("/local")
        .send({ username: "Not a user", password: "wrongpassword" })
        .end((err, res) => {
          assert.equal(res.status, 401);
          done();
        });
    });
    test("POST correct user info results in success", done => {
      chai
        .request(server)
        .post("/local")
        .send({ username: "User 1", password: "password1" })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.message, "User 1 logged in successfully");
          done();
        });
    });
  });
});
