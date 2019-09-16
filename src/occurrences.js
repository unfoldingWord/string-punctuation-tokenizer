import * as tokenizers from './tokenizers';

/**
 * Gets the occurrence of a subString in a string by using the subString index in the string.
 * @param {String} text
 * @param {Number} currentWordIndex
 * @param {String} subString
 * @param {Object} options - The options for the tokenizer
 * @return {Object}
 */
export const occurrenceInString = (
  text,
  currentWordIndex,
  subString,
  options={
    includeWords: true,
    includeNumbers: true,
  },
) => {
  const _options = {
    text,
    includeWords: options.includeWords,
    includeNumbers: options.includeNumbers,
    includePunctuation: options.includePunctuation,
    includeWhitespace: options.includeWhitespace,
    greedy: options.greedy,
    parsers: options.parsers,
  };
  let occurrence = 0;
  const tokens = tokenizers.tokenize(_options);
  for (let i = 0; i <= currentWordIndex; i++) {
    if (tokens[i] === subString) occurrence ++;
  }
  return occurrence;
};
/**
 * Function that count occurrences of a substring in a string
 * @param {String} text - The string to search in
 * @param {String} subString - The sub string to search for
 * @param {Object} options - The options for the tokenizer
 * @return {Integer} - the count of the occurrences
 */
export const occurrencesInString = (
  text,
  subString,
  options={
    includeWords: true,
    includeNumbers: true,
  },
) => {
  const _options = {
    text,
    includeWords: options.includeWords,
    includeNumbers: options.includeNumbers,
    includePunctuation: options.includePunctuation,
    includeWhitespace: options.includeWhitespace,
    greedy: options.greedy,
    parsers: options.parsers,
  };
  let occurrences = 0;
  const tokens = tokenizers.tokenize(_options);
  tokens.forEach((token) => {
    if (token === subString) occurrences ++;
  });
  return occurrences;
};
