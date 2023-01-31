const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  test("Translation with text and invalid locale field: POST request to /api/translate", () => {
    chai
      .request(server)
      .post("/api/translate")
      .type("form")
      .send({
        text: "Paracetamol takes up to an hour to work.",
        locale: "spanish-to-american",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isOk(res.body.error);
        assert.isNotOk(res.body.translation);
        assert.isObject(res.body);
        assert.isString(res.body.error);
        assert.equal(res.body.error, "Invalid value for locale field");
      });
  });
  test("Translation with text and locale fields: POST request to /api/translate", () => {
    chai
      .request(server)
      .post("/api/translate")
      .type("form")
      .send({
        text: "Paracetamol takes up to an hour to work.",
        locale: "british-to-american",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isOk(res.body.translation);
        assert.isObject(res.body);
        assert.isString(res.body.translation);
        assert.notEqual(res.body.text, res.body.translation);
        assert.equal(
          res.body.translation,
          '<span class="highlight">Tylenol</span> takes up to an hour to work.'
        );
      });
  });
  test("Translation with missing text field: POST request to /api/translate", () => {
    chai
      .request(server)
      .post("/api/translate")
      .type("form")
      .send({
        locale: "british-to-american",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isOk(res.body.error);
        assert.isNotOk(res.body.translation);
        assert.isObject(res.body);
        assert.isString(res.body.error);
        assert.equal(res.body.error, "Required field(s) missing");
      });
  });
  test("Translation with missing locale field: POST request to /api/translate", () => {
    chai
      .request(server)
      .post("/api/translate")
      .type("form")
      .send({
        text: "Paracetamol takes up to an hour to work.",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isOk(res.body.error);
        assert.isNotOk(res.body.translation);
        assert.isObject(res.body);
        assert.isString(res.body.error);
        assert.equal(res.body.error, "Required field(s) missing");
      });
  });
  test("Translation with empty text: POST request to /api/translate", () => {
    chai
      .request(server)
      .post("/api/translate")
      .type("form")
      .send({
        text: "",
        locale: "spanish-to-american",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isOk(res.body.error);
        assert.isNotOk(res.body.translation);
        assert.isObject(res.body);
        assert.isString(res.body.error);
        assert.equal(res.body.error, "No text to translate");
      });
  });
  test("Translation with text that needs no translation: POST request to /api/translate", () => {
    chai
      .request(server)
      .post("/api/translate")
      .type("form")
      .send({
        text: "Paracetamol takes up to an hour to work.",
        locale: "american-to-british",
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isOk(res.body.translation);
        assert.isObject(res.body);
        assert.isString(res.body.translation);
        assert.notEqual(res.body.text, res.body.translation);
        assert.equal(res.body.translation, "Everything looks good to me!");
      });
  });
});
