/* eslint-env jest */
import {tokenize} from '../..';

describe('numbers', () => {
  const tests = [
    {
      description: 'fractions',
      input: {text: '7½ feet wide'},
      expected: ['7½', 'feet', 'wide'],
    },
    {
      description: 'big numbers: non-greedy',
      input: {text: '10,000.00', greedy: false},
      expected: ['10', '000', '00'],
    },
    {
      description: 'big numbers: greedy',
      input: {text: '10,000.00', greedy: true},
      expected: ['10,000.00'],
    },
    {
      description: 'number-words: non-greedy',
      input: {text: '3-inch', greedy: false},
      expected: ['3', 'inch'],
    },
    {
      description: 'number-words: greedy',
      input: {text: '3-inch', greedy: true},
      expected: ['3-inch'],
    },
  ];
  tests.forEach(({description, input, expected}) => {
    it(description, () => {
      const output = tokenize(input);
      expect(output).toEqual(expected);
    });
  });
});
