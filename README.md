[![npm](https://img.shields.io/npm/dt/string-punctuation-tokenizer.svg)](https://www.npmjs.com/package/string-punctuation-tokenizer)
[![npm](https://img.shields.io/npm/v/string-punctuation-tokenizer.svg)](https://www.npmjs.com/package/string-punctuation-tokenizer)

# string-punctuation-tokenizer
Small library that provides functions to tokenize a string into an array of words with or without punctuation

## Setup
`npm install string-punctuation-tokenizer`

## Usage
`var stringTokenizer = require('string-punctuation-tokenizer');`

or ES6 

`import {tokenize} from 'string-punctuation-tokenizer';`

#### Tokenize with punctuation
```js
import {tokenize} from './src/tokenizers'; // use the import from above instead of this
let words = tokenize({text: 'Hello world, my name is Manny!', includePunctuation: true});
// words = ["Hello", "world", ",", "my", "name", "is", "Manny", "!"]
```
#### Tokenize without punctuation
```js
import {tokenize} from './src/tokenizers'; // use the import from above instead of this
let words = tokenize({text: 'Hello world, my name is Manny!'});
// words = ["Hello", "world", "my", "name", "is", "Manny"]
```

### Documentation
See detailed documentation and live WYSIWYG playground here: https://string-punctuation-tokenizer.netlify.app/#/Tokenize
