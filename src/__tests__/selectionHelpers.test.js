/* eslint-env jest */
import * as selectionHelpers from '../selectionHelpers';

describe('selectionArray()', function() {
  it('should succeed with selection', function() {
    const string = "To Titus, a true son in our common faith. Grace and peace from God the Father and Christ Jesus our Savior. ";
    const selections = [{"text": "God", "occurrence": 1, "occurrences": 1}];
    const expectedSelection = {
      text: selections[0].text,
      occurrence: selections[0].occurrence,
      occurrences: selections[0].occurrences,
      selected: true,
    };
    const output = selectionHelpers.selectionArray(string, selections);
    expect(output.length).toEqual(3);
    expect(output[1]).toEqual(expectedSelection);
  });
});
