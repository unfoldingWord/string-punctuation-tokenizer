import * as tokenizers from './tokenizers';

/**
 * Gets the occurrence of a subString in a string by using the subString index in the string.
 * @param {String} text
 * @param {Number} currentWordIndex
 * @param {String} subString
 * @return {Object}
 */
export const occurrenceInString = (text, currentWordIndex, subString) => {
  let occurrence = 0;
  const tokens = tokenizers.tokenize({text});
  for (let i = 0; i <= currentWordIndex; i++) {
    if (tokens[i] === subString) occurrence ++;
  }
  return occurrence;
};
/**
 * Function that count occurrences of a substring in a string
 * @param {String} text - The string to search in
 * @param {String} subString - The sub string to search for
 * @return {Integer} - the count of the occurrences
 */
export const occurrencesInString = (text, subString) => {
  let occurrences = 0;
  const tokens = tokenizers.tokenize({text});
  tokens.forEach((token) => {
    if (token === subString) occurrences ++;
  });
  return occurrences;
};
