The `normalize` function reorganizes unicode glyps into various consistent formats.

### Normalize:

```js
import * as normalizer from '../normalizer.js';

// Cantillations:
// const string1 = 'לׅׄוּלֵׅ֗ׄאׅׄ';
// const string2 = 'לוּלֵא';

// Maqqef and word-joiner.
const string1 = 'תַֽעֲשֶׂ֨ה־לְ⁠ךָ֥';
const string2 = 'תַֽעֲשֶׂ֨ה־לְךָ֥֣';

const normalize = (text) => {
  return normalizer.normalize({
    text,
    form: 'NFKC',
    lossy: true,
  });
};

<div>
  <span>Direct string match?</span>
  <p>
    <span>{string1}</span> <br /> <span>{string2}</span> ?{' '}
    {string1 === string2 ? 'Match!' : 'No match (OK!)'}
  </p>

  <hr />

  <span>normalize(lossy) match?</span>
  <p>
    <span>{normalize(string1)}</span> <br /> <span>{normalize(string2)}</span> ?{' '}
    {normalize(string1) === normalize(string2) ? 'Match!!' : 'No match!😩'}
  </p>
</div>;
```

### Tokenizer with Normalization:

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
