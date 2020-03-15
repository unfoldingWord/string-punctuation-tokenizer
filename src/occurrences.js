import {tokenize} from './tokenizers';

/**
 * Gets the occurrence of a subString in a string by using the subString index in the string.
 * @param {Array} tokens
 * @param {Number} currentWordIndex
 * @param {String} subString
 * @return {Object}
 */
export const occurrenceInTokens = (
  tokens,
  currentWordIndex,
  subString,
) => {
  let occurrence = 0;
  for (let i = 0; i <= currentWordIndex; i++) {
    if (tokens[i].token === subString) occurrence ++;
  }
  return occurrence;
};

/**
 * Function that count occurrences of a substring in a string
 * @param {Array} tokens - The string to search in
 * @param {String} subString - The sub string to search for
 * @return {Integer} - the count of the occurrences
 */
export const occurrencesInTokens = (
  tokens,
  subString,
) => {
  let occurrences = 0;
  tokens.forEach((token) => {
    if (token && token.token === subString) occurrences ++;
  });
  return occurrences;
};

/**
 * Gets the occurrence of a subString in a string by using the subString index in the string.
 * @param {String} text
 * @param {Number} currentWordIndex
 * @param {String} subString
 * @return {Object}
 */
export const occurrenceInString = (
  text,
  currentWordIndex,
  subString,
) => {
  const tokens = tokenize({text, verbose: true});
  const occurrence = occurrenceInTokens(tokens, currentWordIndex, subString);
  return occurrence;
};

/**
 * Function that count occurrences of a substring in a string
 * @param {String} text - The string to search in
 * @param {String} subString - The sub string to search for
 * @return {Integer} - the count of the occurrences
 */
export const occurrencesInString = (
  text,
  subString,
) => {
  const tokens = tokenize({text, verbose: true});
  const occurrences = occurrencesInTokens(tokens, subString);
  return occurrences;
};
