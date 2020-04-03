/* eslint-env jest */
import {tokenize} from '../..';

describe('ZWJ: Zero Width Joiner', () => {
  const tests = [
    {
      description: 'Hindi with \u200D',
      input: {
        text: `अब्राहम की सन्‍तान, दाऊद की सन्‍तान, यीशु मसीह की वंशावली।`,
      },
      expected: ["अब्राहम", "की", "सन्‍तान", "दाऊद", "की", "सन्‍तान", "यीशु", "मसीह", "की", "वंशावली"],
    },
    {
      description: 'Hebrew with \u2060',
      input: {text: `בַּ⁠חֹ֨דֶשׁ֙`},
      expected: ["בַּ⁠חֹ֨דֶשׁ֙"],
    },
    {
      description: 'non-greedy',
      input: {
        text:
        `בַּ⁠חֹ֨דֶשׁ֙ अब्राहम की सन्‍तान दाऊद की सन्‍तान यीशु मसीह की वंशावली।`,
        greedy: false,
      },
      expected: ["בַּ⁠חֹ֨דֶשׁ֙", "अब्राहम", "की", "सन्‍तान", "दाऊद", "की", "सन्‍तान", "यीशु", "मसीह", "की", "वंशावली"],
    },
    {
      description: 'greedy',
      input: {
        text:
        `בַּ⁠חֹ֨דֶשׁ֙ अब्राहम की सन्‍तान दाऊद की सन्‍तान यीशु मसीह की वंशावली।`,
        greedy: true,
      },
      expected: ["בַּ⁠חֹ֨דֶשׁ֙", "अब्राहम", "की", "सन्‍तान", "दाऊद", "की", "सन्‍तान", "यीशु", "मसीह", "की", "वंशावली"],
    },
  ];
  tests.forEach(({description, input, expected}) => {
    it(description, () => {
      const output = tokenize(input);
      expect(output).toEqual(expected);
    });
  });
});
