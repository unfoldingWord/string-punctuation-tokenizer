/* eslint-env jest */
import {tokenize} from '../..';

describe('mixed', () => {
  const text = `“Didn’t David's and Moses' 10,000 בַּ⁠חֹ֨דֶשׁ֙ abençoando-os` +
  ` our 3-inch h-e'a-rt's 'burn' 7½ disciples—and everyone else—what` +
  ` us?” -‭Luke‬ ‭2,4.3:2‬`;
  const tests = [
    {
      description: 'mixed types non-greedy',
      input: {text, greedy: false, includePunctuation: false},
      expected: ["Didn", "t", "David", "s", "and", "Moses", "10", "000", "בַּ⁠חֹ֨דֶשׁ֙", "abençoando", "os", "our", "3", "inch", "h", "e", "a", "rt", "s", "burn", "7½", "disciples", "and", "everyone", "else", "what", "us", "Luke", "2", "4", "3", "2"],
    },
    {
      description: 'mixed types greedy',
      input: {text, greedy: true, includePunctuation: false},
      expected: ["Didn’t", "David's", "and", "Moses", "10,000", "בַּ⁠חֹ֨דֶשׁ֙", "abençoando-os", "our", "3-inch", "h-e'a-rt's", "burn", "7½", "disciples", "and", "everyone", "else", "what", "us", "Luke", "2,4.3:2"],
    },
    {
      description: 'mixed types non-greedy, punctuation',
      input: {text, greedy: false, includePunctuation: true},
      expected: ["“", "Didn", "’", "t", "David", "'", "s", "and", "Moses", "'", "10", ",", "000", "בַּ⁠חֹ֨דֶשׁ֙", "abençoando", "-", "os", "our", "3", "-", "inch", "h", "-", "e", "'", "a", "-", "rt", "'", "s", "'", "burn", "'", "7½", "disciples", "—", "and", "everyone", "else", "—", "what", "us", "?", "”", "-", "Luke", "2", ",", "4", ".", "3", ":", "2"],
    },
    {
      description: 'mixed types greedy, punctuation',
      input: {text, greedy: true, includePunctuation: true},
      expected: ["“", "Didn’t", "David's", "and", "Moses", "'", "10,000", "בַּ⁠חֹ֨דֶשׁ֙", "abençoando-os", "our", "3-inch", "h-e'a-rt's", "'", "burn", "'", "7½", "disciples", "—", "and", "everyone", "else", "—", "what", "us", "?", "”", "-", "Luke", "2,4.3:2"],
    },
  ];
  tests.forEach(({description, input, expected}) => {
    it(description, () => {
      const output = tokenize(input);
      expect(output).toEqual(expected);
    });
  });
});
