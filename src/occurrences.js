import * as tokenizers from './tokenizers';

/**
 * Gets the occurrence of a subString in a string by using the subString index in the string.
 * @param {String} string
 * @param {Number} currentWordIndex
 * @param {String} subString
 * @return {Object}
 */
export const occurrenceInString = (string, currentWordIndex, subString) => {
  let occurrence = 0;
  const tokens = tokenizers.tokenize(string);
  for (let i = 0; i <= currentWordIndex; i++) {
    if (tokens[i] === subString) occurrence ++;
  }
  return occurrence;
};
/**
 * Function that count occurrences of a substring in a string
 * @param {String} string - The string to search in
 * @param {String} subString - The sub string to search for
 * @return {Integer} - the count of the occurrences
 */
export const occurrencesInString = (string, subString) => {
  let occurrences = 0;
  const tokens = tokenizers.tokenize(string);
  tokens.forEach((token) => {
    if (token === subString) occurrences ++;
  });
  return occurrences;
};
