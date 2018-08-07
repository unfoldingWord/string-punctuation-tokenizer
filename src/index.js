import {
  tokenize,
  tokenizeWithPunctuation,
  word,
  punctuation,
  whitespace,
} from './tokenizers';

import {
  occurrenceInString,
  occurrencesInString,
} from './tokenizers';

import {
  selectionArray,
  spliceStringOnRanges,
  selectionsToRanges,
} from './selectionHelpers';

export default {
  tokenize,
  tokenizeWithPunctuation,
  occurrenceInString,
  occurrencesInString,
  selectionArray,
  spliceStringOnRanges,
  selectionsToRanges,
  word,
  punctuation,
  whitespace,
};
