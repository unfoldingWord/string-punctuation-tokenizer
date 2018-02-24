[![npm](https://img.shields.io/npm/dt/string-punctuation-tokenizer.svg)](https://www.npmjs.com/package/string-punctuation-tokenizer)
[![npm](https://img.shields.io/npm/v/string-punctuation-tokenizer.svg)](https://www.npmjs.com/package/string-punctuation-tokenizer)

# string-punctuation-tokenizer
Small library that provides functions to tokenize a string into an array of words with or without punctuation

## Setup
`npm install string-punctuation-tokenizer`

## Usage
```js
var stringTokenizer = require('string-punctuation-tokenizer');
// or ES6 
import stringTokenizer from 'string-punctuation-tokenizer'
```
#### Tokenize with punctuation
```js
var words = stringTokenizer.tokenizeWithPunctuation('Hello world, my name is Manny!');
// or ES6 
let words = stringTokenizer.tokenizeWithPunctuation('Hello world, my name is Manny!');
// words = ["Hello", "world", ",", "my", "name", "is", "Manny", "!"]
```
#### Tokenize without punctuation
```js
var words = stringTokenizer.tokenize('Hello world, my name is Manny!');
// or ES6 
let words = stringTokenizer.tokenize('Hello world, my name is Manny!');
// words = ["Hello", "world", "my", "name", "is", "Manny"]
```
