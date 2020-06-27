The `tokenize` function breaks a string of text into smaller contiguous strings called tokens.

### Quick Start

The default options meet most use cases of just getting the word tokens out of a string.

```js
// import {tokenize} from 'string-punctuation-tokenizer';
// use the previous line in your code not the next one...
import { tokenize } from '../tokenizers.js';

const text = `Hello, World!`;
const tokens = tokenize({ text });
const output = JSON.stringify(tokens, null, 2);

// wrapped in a React fragment for rendering output:
<>
  <p>
    <strong>text:</strong> {text}
  </p>
  <p>
    <strong>{tokens.length} tokens:</strong>
  </p>
  <pre>{output}</pre>
</>;
```

### Token Classifier

It is based on an internal token classifier based on the work here:
Tiny tokenizer - https://gist.github.com/borgar/451393

### Options

- `text {string}`: The string to be tokenized.
- `includeWords {bool}`: Include the word tokens in the output.
- `includeNumbers {bool}`: Include the number tokens in the output.
- `includePunctuation {bool}`: Include the punctuation tokens in the output.
- `includeWhitespace {bool}`: Include the whitespace tokens in the output.
- `greedy {bool}`: Use [Greedy Tokens](/#/Greedy%20Tokens), overridden by `parsers`.
- `verbose {bool}`: Output an array of token objects with types.
- `occurrences {bool}`: Output `occurrence` and `occurrences` for each token, requires verbose.
- `parsers {object}`: Override the internal token classifier's Regular Expressions for `{word, number, punctuation, whitespace}`.

### Usage Example

Edit the options and watch the effect on the output.

```js
// import {tokenize} from 'string-punctuation-tokenizer';
import {
  tokenize,
  word,
  number,
  punctuation,
  whitespace,
} from '../tokenizers.js';

const text = `It's said that th\u200Dere are 1,000.00 different ways,\nto say...\t"I—Love—You."`;

const options = {
  text,
  includeWords: true,
  includeNumbers: true,
  includePunctuation: true,
  includeWhitespace: true,
  greedy: true,
  verbose: true,
  occurrences: true,
  //parsers: {word, number, punctuation, whitespace},
  //parsers: {word: /\w+/, number: /\d+/, punctuation: /[\.,'"]/, whitespace: /\s+/},
};
const tokens = tokenize(options);
const output = JSON.stringify(tokens, null, 2);

// wrapped in a React fragment for rendering:
<>
  <p>{text}</p>
  <p>{tokens.length} tokens:</p>
  <pre>{output}</pre>
</>;
```

### Normalization:

```js
import { tokenize } from '../tokenizers.js';

// Cantillations:
const string1 = 'לׅׄוּלֵׅ֗ׄאׅׄ';
const string2 = 'לוּלֵא';

// Maqqef and word-joiner.
// const string1 = 'תַֽעֲשֶׂ֨ה־לְ⁠ךָ֥';
// const string2 = 'תַֽעֲשֶׂ֨ה־לְךָ֥֣';

const normalize = (text) => {
  return tokenize({
    text,
    greedy: true,
    normalize: true,
    normalizeLossy: true,
  }).join(' ');
};

<div>
  <span>Direct string match?</span>
  <p>
    <span>{string1}</span> <br /> <span>{string2}</span> ?{' '}
    {string1 === string2 ? 'Match!' : 'No match (OK!)'}
  </p>

  <hr />

  <span>tokenize(normalize, normalizeLossy) match?</span>
  <p>
    <span>{normalize(string1)}</span> <br /> <span>{normalize(string2)}</span> ?{' '}
    {normalize(string1) === normalize(string2) ? 'Match!!' : 'No match!😩'}
  </p>
</div>;
```
