const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("chai").assert;
const server = "http://localhost:3002/drafts";

chai.use(chaiHttp);

suite("API routing for drafts", () => {
  suite("GET", () => {
    test("GET with userId returns array of drafts", done => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          if (err) done(err);
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.isObject(res.body[0]);
          done();
        });
    });
    test("GET with adventureId returns an adventure", done => {
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
  suite("POST", () => {
    test("POST an adventure and that same adventure gets returned", done => {
      let testAdventure = {
        id: "test-id",
        title: "Test Adventure Title",
        intro: "Test adventure intro...",
        items: {
          prompt: "Test adventure items prompt",
          options: { item1: {}, item2: {}, item3: {} },
          limit: 3
        },
        mainStory: {},
        colorPalette: { background: "#444", mainTest: "#FFF", subText: "#aaa" }
      };
      chai
        .request(server)
        .post("/")
        .send(testAdventure)
        .end((err, res) => {
          if (err) done(err);
          assert.equal(res.status, 200);
          assert.containsAllDeepKeys(res.body, testAdventure);
          done();
        });
    });
  });
  suite("PUT", () => {
    test("PUT to update an existing adventure with wrong ID returns Bad Request", done => {
      chai
        .request(server)
        .put("/6")
        .send({ id: 5 })
        .end((err, res) => {
          if (err) done(err);
          assert.equal(res.status, 400);
          assert.equal(res.text, "Bad Request");
          done();
        });
    });
    test("PUT to update existing adventure with correct ID returns updated adventure", done => {
      let updatedAdventure = {
        id: "5",
        title: "Updated Test Adventure Title",
        intro: "Updated Test adventure intro...",
        items: {
          prompt: "Test adventure items prompt",
          options: { item1: {}, item2: {}, item3: {} },
          limit: 3
        },
        mainStory: {},
        colorPalette: { background: "#444", mainTest: "#FFF", subText: "#aaa" }
      };
      chai
        .request(server)
        .put("/5")
        .send(updatedAdventure)
        .end((err, res) => {
          if (err) done(err);
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.containsAllDeepKeys(res.body, updatedAdventure);
          assert.equal(res.body.title, "Updated Test Adventure Title");
          done();
        });
    });
  });
});
