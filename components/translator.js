const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate(phrase, mode) {
    if (!/([.?!:;]$)/.test(phrase)) phrase = phrase + ".";
    const innitial = phrase;
    if (mode == "american-to-british") {
      for (let word in americanOnly) {
        phrase = phrase.replace(
          new RegExp(word + "(\\W)", "ig"),
          '<span class="highlight">' + americanOnly[word] + "</span>$1"
        );
      }
      for (let word in americanToBritishSpelling) {
        phrase = phrase.replace(
          new RegExp(word + "(\\W)", "ig"),
          '<span class="highlight">' +
            americanToBritishSpelling[word] +
            "</span>$1"
        );
      }
      for (let word in americanToBritishTitles) {
        phrase = phrase.replace(
          new RegExp(word + "(\\W)", "ig"),
          '<span class="highlight">' +
            americanToBritishTitles[word] +
            "</span>$1"
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
          new RegExp(word + "(\\W)", "ig"),
          '<span class="highlight">' + britishOnly[word] + "</span>$1"
        );
      }
      for (let word in americanToBritishSpelling) {
        phrase = phrase.replace(
          new RegExp(americanToBritishSpelling[word] + "(\\W)", "ig"),
          '<span class="highlight">' + word + "</span>$1"
        );
      }
      for (let word in americanToBritishTitles) {
        phrase = phrase.replace(
          new RegExp(americanToBritishTitles[word] + "(\\W)", "ig"),
          '<span class="highlight">' + word + "</span>$1"
        );
      }
      phrase = phrase.replace(
        /(\d+)\.(\d+)/gm,
        '<span class="highlight">$1:$2</span>'
      );
    }
    if (innitial == phrase) return "Everything looks good to me!";
    return phrase;
  }
}

module.exports = Translator;
