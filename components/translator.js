const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate(phrase, mode) {
    const innitial = phrase;
    if (mode == "american-to-british") {
      for (let word in americanOnly) {
        phrase = phrase.replace(
          new RegExp(word, "ig"),
          '<span class="highlight">' + americanOnly[word] + "</span>"
        );
      }
      for (let word in americanToBritishSpelling) {
        phrase = phrase.replace(
          new RegExp(word, "ig"),
          '<span class="highlight">' +
            americanToBritishSpelling[word] +
            "</span>"
        );
      }
      for (let word in americanToBritishTitles) {
        phrase = phrase.replace(
          new RegExp(word, "ig"),
          '<span class="highlight">' + americanToBritishTitles[word] + "</span>"
        );
      }
      phrase = phrase.replace(
        /(\d+)\:(\d+)/gm,
        '<span class="highlight">$1.$2</span>'
      );
    }
    if (mode == "british-to-american") {
      for (let word in britishOnly) {
        phrase = phrase.replace(
          new RegExp(word, "ig"),
          '<span class="highlight">' + britishOnly[word] + "</span>"
        );
      }
      for (let word in americanToBritishSpelling) {
        phrase = phrase.replace(
          new RegExp(americanToBritishSpelling[word], "ig"),
          '<span class="highlight">' + word + "</span>"
        );
      }
      for (let word in americanToBritishTitles) {
        phrase = phrase.replace(
          new RegExp(americanToBritishTitles[word] + " ", "ig"),
          '<span class="highlight">' + word + "</span>"
        );
      }
      phrase = phrase.replace(
        /(\d+)\.(\d+)/gm,
        '<span class="highlight">$1:$2</span>'
      );
    }
    console.log(phrase);
    if (innitial == phrase) return "Everything looks good to me!";
    return phrase;
  }
}

module.exports = Translator;
