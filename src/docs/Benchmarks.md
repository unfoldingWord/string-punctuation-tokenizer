
```js
import {tokenize, word, number, punctuation, whitespace} from '../tokenizers.js';

const text = `It's said that th\u200Dere are 1,000.00 different ways,\nto say...\t"I—Love—You."`;

var iterations = 10000;
let start, end;

start = performance.now();
for(var i = 0; i < iterations; i++ ){
  const options = {text};
  const tokens = tokenize(options);
  const output = JSON.stringify(tokens, null, 2);
};
end = performance.now();
const defaultOptions = end - start;

start = performance.now();
for(var i = 0; i < iterations; i++ ){
  const options = {
    text,
    greedy: true,
  };
  const tokens = tokenize(options);
  const output = JSON.stringify(tokens, null, 2);
};
end = performance.now();
const greedy = end - start;

start = performance.now();
for(var i = 0; i < iterations; i++ ){
  const options = {
    text,
    verbose: true,
    occurrences: true,
  };
  const tokens = tokenize(options);
  const output = JSON.stringify(tokens, null, 2);
};
end = performance.now();
const occurrences = end - start;

// wrapped in a React fragment for rendering:
<>
  <h4>Each run {iterations} times.</h4>
  <p><strong>default:</strong> {defaultOptions.toFixed(0)}ms</p>
  <p><strong>greedy:</strong> {greedy.toFixed(0)}ms</p>
  <p><strong>occurrences:</strong> {occurrences.toFixed(0)}ms</p>
</>
```