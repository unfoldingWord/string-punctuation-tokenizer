
```js
import OldTokenizer from 'string-punctuation-tokenizer'; // v0.9.4
import Lexer from 'wordmap-lexer';
import Tokenizer from '../';

const text = `"So the scribes of the king were called at that time, in the third month, that is, the month of Sivan, on the twenty-third of it. It was decreed according to all of what Mordecai had commanded to the Jews, to the satraps, the governors and officials of the provinces that were located from Hodu to as far as Cush, 127 provinces, each province according to its own script, and each people group according to its own language, and to the Jews according to their own script and their own language." Esther 8:9 (ULT)`;

var iterations = 20;
let start, end;

const benchmarks = [
  ['tokenize(defaults) - v0.9.4', () => OldTokenizer.tokenize(text)],
  ['tokenize(defaults) - lexer', () => Lexer.tokenize(text)],
  ['tokenize(defaults) - current', () => Tokenizer.tokenize({text})],
  ['tokenize(punctuation) - v0.9.4', () => OldTokenizer.tokenizeWithPunctuation(text)],
  ['tokenize(punctuation) - lexer', () => Lexer.tokenize(text, {punctuation: true})],
  ['tokenize(punctuation) - current', () => Tokenizer.tokenize({text, includePunctuation: true})],
  ['tokenize(occurrences) - v0.9.4', () => OldTokenizer.tokenizeWithPunctuation(text, {withWordOccurrence: true})],
  ['tokenize(occurrences) - current', () => Tokenizer.tokenize({text, includePunctuation: true})],
  ['occurrence() - v0.9.4', () => OldTokenizer.occurrenceInString(text, 0, 'So')],
  ['occurrence() - current', () => Tokenizer.occurrenceInString(text, 0, 'So')],
  ['occurrences() - v0.9.4', () => OldTokenizer.occurrencesInString(text, 'The')],
  ['occurrences() - current', () => Tokenizer.occurrencesInString(text, 'The')],
]

const results = benchmarks.map(([label, callback], index) => {
  start = performance.now();
  for (var i = 0; i < iterations; i++ ) callback();
  end = performance.now();
  const result = end - start;
  return [label, result];
});

const output = results.map(([label, result], index) => (
  <p key={index}>
    <span>{label}: </span>
    <strong>{(result/1000).toFixed(4)}ms</strong>
  </p>
));
// wrapped in a React fragment for rendering:
<>
  <h4>Each run {iterations} times.</h4>
  {output}
</>
```