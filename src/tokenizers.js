import xRegExp from 'xregexp';
import {occurrenceInTokens, occurrencesInTokens} from './occurrences';
import {normalizer, normalizerDestructive} from './normalizers';

// constants
export const _word = '[\\pL\\pM\\u200D\\u2060]+';
// TRICKY: original languages do not use single quotes so u2019 is considered part of a word
export const _origWord = '[\\pL\\pM\\u200D\\u2060\\u2019]+';
export const _number = '[\\pN\\pNd\\pNl\\pNo]+';
export const _wordOrNumber = '(' + _word + '|' + _number + ')';
export const _origWordOrNumber = '(' + _origWord + '|' + _number + ')';
export const _greedyWord = '(' + _wordOrNumber + '([-\'’]' + _word + ')+|' + _word + '’?)';
export const _origGreedyWord = '(' + _origWordOrNumber + '([-\'’]' + _origWord + ')+|' + _origWord + '’?)';
export const _greedyNumber = '(' + _number + '([:.,]?' + _number + ')+|' + _number + ')';
export const word = xRegExp(_word, '');
export const origWord = xRegExp(_origWord, '');
export const greedyWord = xRegExp(_greedyWord, '');
export const origGreedyWord = xRegExp(_origGreedyWord, '');
export const punctuation = xRegExp('(^\\p{P}|[<>]{2})', '');
export const whitespace = /\s+/;
export const number = xRegExp(_number);
export const greedyNumber = xRegExp(_greedyNumber); //  /(\d+([:.,]?\d)+|\d+)/;
export const number_ = xRegExp(number);


export const tokenizeOrigLang = (params) => tokenize({
  parsers: {
    word: origWord,
    greedyWord: origGreedyWord,
    whitespace,
    punctuation,
    number,
  },
  ...params,
});

/**
 * Tokenize a string into an array of words
 * @param {Object} params - string to be tokenized
 * @return {Array} - array of tokenized words/strings
 */
export const tokenize = ({
  text = '',
  includeWords = true,
  includeNumbers = true,
  includePunctuation = false,
  includeWhitespace = false,
  includeUnknown = false,
  greedy = false,
  verbose = false,
  occurrences = false,
  parsers = {word, greedyWord, whitespace, punctuation, number},
  normalize = false,
  normalizations = null,
}) => {
  let string = text.slice(0);
  if (normalize) string = normalizer(string);
  if (normalize && normalizations) {
    string = normalizerDestructive(string, normalizations);
  }

  const greedyParsers = {
    ...parsers,
    word: parsers.greedyWord,
    number: greedyNumber,
  };
  const _parsers = greedy ? greedyParsers : parsers;
  delete _parsers.greedyWord;
  let tokens = classifyTokens(string, _parsers, 'unknown');
  const types = [];
  if (includeWords) types.push('word');
  if (includeNumbers) types.push('number');
  if (includeWhitespace) types.push('whitespace');
  if (includePunctuation) types.push('punctuation');
  if (includeUnknown) types.push('unknown');
  tokens = tokens.filter((token) => types.includes(token.type));
  if (occurrences) {
    tokens = tokens.map((token, index) => {
      const _occurrences = occurrencesInTokens(tokens, token.token);
      const _occurrence = occurrenceInTokens(tokens, index, token.token);
      return {...token, occurrence: _occurrence, occurrences: _occurrences};
    });
  }
  if (verbose) {
    tokens = tokens.map((token) => {
      delete token.matches;
      return token;
    });
  } else {
    tokens = tokens.map((token) => token.token);
  }
  return tokens;
};

/**
 * Tiny tokenizer - https://gist.github.com/borgar/451393
 * @param {String} string - string to be tokenized
 * @param {Object} parsers - { word:/\w+/, whitespace:/\s+/, punctuation:/[^\w\s]/ }
 * @param {String} deftok - type to label tokens that are not classified with the above parsers
 * @return {Array} - array of objects => [{ token:"this", type:"word" },{ token:" ", type:"whitespace" }, Object { token:"is", type:"word" }, ... ]
**/
export const classifyTokens = (string, parsers, deftok) => {
  string = (!string) ? '' : string; // if string is undefined, make it an empty string
  if (typeof string !== 'string') {
    throw new Error(`tokenizer.tokenize() string is not String: ${string}`);
  }
  let m;
  let r;
  let t;
  let tokens = [];
  while (string) {
    t = null;
    m = string.length;
    let key;
    for (key in parsers) {
      if (Object.prototype.hasOwnProperty.call(parsers, key)) {
        r = parsers[key].exec(string);
        // try to choose the best match if there are several
        // where "best" is the closest to the current starting point
        if (r && (r.index < m)) {
          let token = r[0];
          t = {
            token,
            type: key,
            matches: r.slice(1),
          };
          m = r.index;
        }
      }
    }
    if (m) {
      // there is text between last token and currently
      // matched token - push that out as default or "unknown"
      tokens.push({
        token: string.substr(0, m),
        type: deftok || 'unknown',
      });
    }
    if (t) {
      // push current token onto sequence
      tokens.push(t);
    }
    string = string.substr(m + (t ? t.token.length : 0));
  }
  return tokens;
};

