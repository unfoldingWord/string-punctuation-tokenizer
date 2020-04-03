Zero Width Joiners are punctuation characters that are commonly used inside of a word in many languages.
They are invisible and can affect the rendering of the characters around them, or just join words as one.

Hindi with `\u200D`: `अब्राहम की सन्‍तान, दाऊद की सन्‍तान, यीशु मसीह की वंशावली।`

Hebrew with `\u2060`: `בַּ⁠חֹ֨דֶשׁ֙`

Since we are unaware of a use case to split on ZWJ, we always keep those inside of the parent word token.

```js
// import {tokenize} from 'string-punctuation-tokenizer';
import {tokenize} from '../tokenizers.js';

const text = `בַּ⁠חֹ֨דֶשׁ֙ अब्राहम की सन्‍तान, दाऊद की सन्‍तान, यीशु मसीह की वंशावली।`;

const options = {
  text,
}
const tokens = tokenize(options);
const output = JSON.stringify(tokens, null, 2);


// wrapped in a React fragment for rendering:
<>
  <p>{text}</p>
  <p>{tokens.length} tokens:</p>
  <pre>{output}</pre>
</>
```