import {
  tokenize,
  word,
  punctuation,
  whitespace,
  number_ as number,
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

export {
  tokenize,
  occurrenceInString,
  occurrencesInString,
  selectionArray,
  spliceStringOnRanges,
  selectionsToRanges,
  word,
  punctuation,
  whitespace,
  number,
};
