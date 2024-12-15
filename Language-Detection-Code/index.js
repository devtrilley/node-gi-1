/*
  Deliverable 1: Language Detection Code

  Find an npm package that tells you the language a string is written in.
  Print the most accurate language for the following phrases:

  “Es macht gut”
  “Dobrá práce”
  “Gwaith da”

  Push code to GitHub repository called “Language Detection Code”

  Take screenshot of results and push them to repo as well
*/

// Importing franc using require(), destructred import required
const { franc } = require("franc"); // This npm module give us a 3-letter language code for detected strings

// Importing langs npm module, used with franc to display country name based off of 3-letter code
const langs = require("langs");

// METHOD ONE (uncomment below):
// Array of phrases we need to detect the language of
// const detectPhrases = ['Es macht gut', 'Dobrá práce', 'Gwaith da'];

// // forEach() on phrases array to print returned value from franc function to the console
// detectPhrases.forEach((phrase) => {
// console.log(franc(phrase)); // Pass phrase to franc()
// });

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// METHOD TWO (My choice, comment below to check out method one):
// Define detectPhrase() with phrase param
function detectPhrase(phrase) {
  const detectedCode = franc(phrase); // franc() returns 3-letter code based on detected text in phrase

  // Condtional if detectedCode is undefined vs has a language value
  // If detectedCode is undefined print that to the console
  if (detectedCode === "und") {
    return `Phrase: ${phrase} | Detected: No language detected`; // Returns nothing detected
  } else {
    const language = langs.where("3", detectedCode); // If there's a detectedCode, use langs.where() to save it in language var

    // If langs was able to find a matching language vs no matching language was found
    if (language) {
      // langs.where() takes franc()'s 3-letter code and returns a specific language object.
      return `Phrase: ${phrase} | Detected: ${language.name}`; // language.name returns the detected language using franc() tricode
    } else {
      // If langs module can't find a matching language for franc()'s tricode, display the code in the console.
      return `Phrase: ${phrase} | Detected: Unknown language for code ${detectedCode}`;
    }
  }
}

console.log(detectPhrase("Es macht gut")); // Output: SCO
console.log(detectPhrase("Dobrá práce")); // Output: SLK
console.log(detectPhrase("Gwaith da")); // Output: UND

/*
  Limitations with this problem:

  Though I tried to get a little creative, the franc npm package works best when if has more text to decypher.
  I believe the text would've been more accurate if the passed in strings were at least 20 characters long each.
  Nonetheless, still a storng solution.
*/
