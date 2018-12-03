import xRegExp from 'xregexp';
import {occurrenceInString, occurrencesInString} from './occurrences';
// constants
export const word = xRegExp('[\\pL\\pM\\u200D]+', '');
export const punctuation = xRegExp('(^\\p{P}|[<>]{2})', '');
export const whitespace = /\s+/;
export const number = /\d+/;
export const number_ = xRegExp(number);
const tokenizerOptions = {word, whitespace, punctuation, number};

/**
 * Tokenize a string into an array of words
 * @param {String} string - string to be tokenized
 * @return {Array} - array of tokenized words/strings
 */
export const tokenize = (string) => {
  const tokenTypes = ['word', 'number'];
  const _tokens = classifyTokens(string, tokenizerOptions);
  const tokens = _tokens.filter((token) => tokenTypes.includes(token.type))
    .map((token) => token.token);
  return tokens;
};
/**
 * Tokenize a string into an array of words
 * @param {String} string - string to be tokenized
 * @param {Object} options - include word occurrence or not.
 *        withWordOccurrence <boolean>
 * @return {Array} - array of tokenized words/strings
 */
export const tokenizeWithPunctuation = (string, options) => {
  const tokenTypes = ['word', 'number', 'punctuation'];
  const _tokens = classifyTokens(string, tokenizerOptions);
  const tokens = _tokens.filter((token) => tokenTypes.includes(token.type))
    .map((token, index) => {
      const occurrences = occurrencesInString(string, token.token);
      const occurrence = occurrenceInString(string, index, token.token);
      if (options && options.withWordOccurrence) {
        return {
          word: token.token,
          type: token.type,
          occurrence,
          occurrences,
        };
      } else {
        return token.token;
      }
    });
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
   for ( let key in parsers ) {
    if (parsers.hasOwnProperty(key)) {
      r = parsers[key].exec( string );
      // try to choose the best match if there are several
      // where "best" is the closest to the current starting point
      if ( r && ( r.index < m ) ) {
        t = {
          token: r[0],
          type: key,
          matches: r.slice( 1 ),
        };
        m = r.index;
      }
    }
   }
   if ( m ) {
     // there is text between last token and currently
     // matched token - push that out as default or "unknown"
     tokens.push({
       token: string.substr( 0, m ),
       type: deftok || 'unknown',
     });
   }
   if ( t ) {
     // push current token onto sequence
     tokens.push( t );
   }
   string = string.substr( m + (t ? t.token.length : 0) );
  }
  return tokens;
};
