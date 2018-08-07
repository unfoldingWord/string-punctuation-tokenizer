/* eslint-env jest */
import * as occurrences from '../occurrences';

const {
  occurrenceInString,
  occurrencesInString,
} = occurrences;


describe('occurrenceInString', function() {
  it('should return occurrence for first of two', function() {
    const string = 'a ab a';
    const substring = 'a';
    const index = 0;
    const expected = 1;
    const output = occurrenceInString(string, index, substring);
    expect(output).toEqual(expected);
  });
  it('should return occurrence for second of two', function() {
    const string = 'a ab a';
    const substring = 'a';
    const index = 2;
    const expected = 2;
    const output = occurrenceInString(string, index, substring);
    expect(output).toEqual(expected);
  });
  it('should return occurrence for second of three', function() {
    const string = 'a ab a bac a';
    const substring = 'a';
    const index = 2;
    const expected = 2;
    const output = occurrenceInString(string, index, substring);
    expect(output).toEqual(expected);
  });
});

describe('occurrencesInString', function() {
  it('should return occurrences for none', function() {
    const string = 'ab';
    const substring = 'a';
    const expected = 0;
    const output = occurrencesInString(string, substring);
    expect(output).toEqual(expected);
  });
  it('should return occurrences for one', function() {
    const string = 'a ab';
    const substring = 'a';
    const expected = 1;
    const output = occurrencesInString(string, substring);
    expect(output).toEqual(expected);
  });
  it('should return occurrences for two', function() {
    const string = 'a ab a';
    const substring = 'a';
    const expected = 2;
    const output = occurrencesInString(string, substring);
    expect(output).toEqual(expected);
  });
  it('should return occurrences for three', function() {
    const string = 'a ab a bac a';
    const substring = 'a';
    const expected = 3;
    const output = occurrencesInString(string, substring);
    expect(output).toEqual(expected);
  });
});
