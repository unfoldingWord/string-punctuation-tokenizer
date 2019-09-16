## Greedy Examples:

Edit the options and watch the effect on the output.

```js
import {tokenize} from '../tokenizers.js';

const text = `“Didn’t David's 10,000 abençoando-os our h-e'a-rt's 'burn' disciples—and everyone else—what us?” -‭Luke‬ ‭2,4.3:2‬`;

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
const tokenItems = tokens.map(token => {
  const string = (typeof token === 'string') ? token : JSON.stringify(token, null, 2);
  return (<li>{string}</li>);
});

<>
  <p>{text}</p>
  <ol>{tokenItems}</ol>
</>
```