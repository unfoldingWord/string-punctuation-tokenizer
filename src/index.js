import {
  tokenize,
  tokenizeWithPunctuation,
  word,
  punctuation,
  whitespace,
  number_,
} from './tokenizers';

import {
  occurrenceInString,
  occurrencesInString,
} from './occurrences';

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
  number: number_,
};
