/* eslint-env jest */
import {tokenize} from '../..';

describe('whitespace', () => {
  const tests = [
    {
      description: 'empty',
      input: {text: ''},
      expected: [],
    },
    {
      description: 'space',
      input: {text: ' ', showWhitespace: false},
      expected: [],
    },
    {
      description: 'space: includeWhitespace',
      input: {text: ' ', includeWhitespace: true},
      expected: [' '],
    },
  ];
  tests.forEach(({description, input, expected}) => {
    it(description, () => {
      const output = tokenize(input);
      expect(output).toEqual(expected);
    });
  });
});
