"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();

  app.route("/api/translate").post((req, res) => {
    console.log(req.body);
    switch (true) {
      case !req.body.locale:
        res.json({ error: "Required field(s) missing" });
        break;
      case !req.body.text:
        res.json({ error: "No text to translate" });
        break;
      case req.body.locale != "american-to-british" &&
        req.body.locale != "british-to-american":
        res.json({ error: "Invalid value for locale field" });
        break;
      default:
        res.json({
          text: req.body.text,
          translation: translator.translate(req.body.text, req.body.locale),
        });
        break;
    }
  });
};
