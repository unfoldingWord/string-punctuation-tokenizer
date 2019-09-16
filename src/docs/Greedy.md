The purpose of the `greedy token` is to keep a word together that is typically split into parts due to internal punctuation.

### Possessives and contractions
Examples include words like `David's` (possessives) and `can't` (contractions) as a single word token. 

### Plural Possessive vs Quotation Ending (limitation)
An unaddressed edge case is differentiating between a plural possessive and the ending of a quote.

`"Chris' child asked, 'Do all cars' horns "honk and beep" or do they make other sounds' without response."
Then Charles' story continued, "The other kids' minds were thinking, 'I think I've heard other sounds' but not out loud."`

We could create rules on the grammatical usage of smart quotes to differentiate but unlikely to be followed.

We’ve looked into approaches that require full context as many quotes transcend paragraphs… 
but there are mixed implementations of quotation opening/closing across multiple paragraphs.

### Numbers
It also does the same thing for numbers like `144,000.0` and `24:30` that were split up on commas, periods, and colons

### Usage
Greedy tokenization is a flag that can be turned on and off so it can still behave as before if we want it too.

Edit the options and watch the effect on the output.

```js
// import {tokenize} from 'string-punctuation-tokenizer';
import {tokenize} from '../tokenizers.js';

const text = `“Didn’t David's and Moses' 10,000 בַּ⁠חֹ֨דֶשׁ֙ abençoando-os our h-e'a-rt's 'burn' disciples—and everyone else—what us?” -‭Luke‬ ‭2,4.3:2‬`;

const options = {
  text,
  includeWords: true,
  includeNumbers: true,
  includeWhitespace: false,
  includePunctuation: true,
  greedy: true,
  verbose: false,
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