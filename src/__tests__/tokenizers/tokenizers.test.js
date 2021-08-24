/* eslint-env jest */
import {tokenize, tokenizeOrigLang} from '../..';

describe('Tokenizer', function() {
  it('tokenize() should return ["asdf"] array for "asdf" text', function() {
    const text = 'asdf';
    const tokens = tokenize({text});
    const expected = ['asdf'];
    expect(tokens).toEqual(expected);
  });
  it('tokenize() should return ["asdf", "qwerty"] array for "asdf qwerty" text', function() {
    const text = 'asdf qwerty';
    const tokens = tokenize({text});
    const expected = ['asdf', 'qwerty'];
    expect(tokens).toEqual(expected);
  });
  it('tokenize() should return ["asdf", "qwerty"] array for "asdf, qwerty." text', function() {
    const text = 'asdf, qwerty.';
    const tokens = tokenize({text});
    const expected = ['asdf', 'qwerty'];
    expect(tokens).toEqual(expected);
  });
  it('should handle arabic text', function() {
    const text = 'لِأَنَّهُ لِمَنْ مِنَ ٱلْمَلَائِكَةِ قَالَ قَطُّ: «أَنْتَ ٱبْنِي، أَنَا ٱلْيَوْمَ وَلَدْتُكَ»؟ وَأَيْضًا: «أَنَا أَكُونُلَهُ أَبًا، وَهُوَ يَكُونُ لِيَ ٱبْنًا»؟';
    const tokens = tokenize({text});
    const expected = ['لِأَنَّهُ', 'لِمَنْ', 'مِنَ', 'ٱلْمَلَائِكَةِ', 'قَالَ', 'قَطُّ', 'أَنْتَ', 'ٱبْنِي', 'أَنَا', 'ٱلْيَوْمَ', 'وَلَدْتُكَ', 'وَأَيْضًا', 'أَنَا', 'أَكُونُلَهُ', 'أَبًا', 'وَهُوَ', 'يَكُونُ', 'لِيَ', 'ٱبْنًا'];
    expect(tokens).toEqual(expected);
  });
});


describe('tokenizeWithPunctuation', function() {
  it('should return empty array for empty text', function() {
    const text = '';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = [];
    expect(tokens).toEqual(expected);
  });
  it('should return empty array for " " text', function() {
    const text = ' ';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = [];
    expect(tokens).toEqual(expected);
  });
  it('should return ["asdf"] array for "asdf" text', function() {
    const text = 'asdf';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = ['asdf'];
    expect(tokens).toEqual(expected);
  });
  it('should return ["asdf", "qwerty"] array for "asdf qwerty" text', function() {
    const text = 'asdf qwerty';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = ['asdf', 'qwerty'];
    expect(tokens).toEqual(expected);
  });
  it('should handle punctuation array for "asdf, qwerty." text', function() {
    const text = 'asdf, qwerty.';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = ['asdf', ',', 'qwerty', '.'];
    expect(tokens).toEqual(expected);
  });
  it('should handle punctuation in arabic text', function() {
    const text = 'لِأَنَّهُ لِمَنْ مِنَ ٱلْمَلَائِكَةِ قَالَ قَطُّ: «أَنْتَ ٱبْنِي، أَنَا ٱلْيَوْمَ وَلَدْتُكَ»؟ وَأَيْضًا: «أَنَا أَكُونُلَهُ أَبًا، وَهُوَ يَكُونُ لِيَ ٱبْنًا»؟';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = ['لِأَنَّهُ', 'لِمَنْ', 'مِنَ', 'ٱلْمَلَائِكَةِ', 'قَالَ', 'قَطُّ', ':', '«', 'أَنْتَ', 'ٱبْنِي', '،', 'أَنَا', 'ٱلْيَوْمَ', 'وَلَدْتُكَ', '»', '؟', 'وَأَيْضًا', ':', '«', 'أَنَا', 'أَكُونُلَهُ', 'أَبًا', '،', 'وَهُوَ', 'يَكُونُ', 'لِيَ', 'ٱبْنًا', '»', '؟'];
    expect(tokens).toEqual(expected);
  });
  it('should handle punctuation in gujarti text', function() {
    const text = 'કેમ કે ઈશ્વરે દૂતોને ક્યારે એવું કહ્યું કે, \'તું મારો દીકરો છે, આજે મેં તને જન્મ આપ્યો છે?\' અને વળી, \'હું તેનો પિતા થઈશ અને તે મારો પુત્ર થશે?\'';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = ['કેમ', 'કે', 'ઈશ્વરે', 'દૂતોને', 'ક્યારે', 'એવું', 'કહ્યું', 'કે', ',', '\'', 'તું', 'મારો', 'દીકરો', 'છે', ',', 'આજે', 'મેં', 'તને', 'જન્મ', 'આપ્યો', 'છે', '?', '\'', 'અને', 'વળી', ',', '\'', 'હું', 'તેનો', 'પિતા', 'થઈશ', 'અને', 'તે', 'મારો', 'પુત્ર', 'થશે', '?', '\''];
    expect(tokens).toEqual(expected);
  });
  it('should handle punctuation in croatian text', function() {
    const text = 'Ta kome od anđela ikad reče: Ti si sin moj, danas te rodih; ili pak: Ja ću njemu biti otac, a on će meni biti sin.';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = ['Ta', 'kome', 'od', 'anđela', 'ikad', 'reče', ':', 'Ti', 'si', 'sin', 'moj', ',', 'danas', 'te', 'rodih', ';', 'ili', 'pak', ':', 'Ja', 'ću', 'njemu', 'biti', 'otac', ',', 'a', 'on', 'će', 'meni', 'biti', 'sin', '.'];
    expect(tokens).toEqual(expected);
  });
  it('should handle punctuation in croatian text with numbers', function() {
    const text = 'Ta kome od 121 anđela ikad reče: Ti si sin moj,  12323 danas te rodih; ili pak: Ja ću njemu biti o 12039 tac, a on će meni biti sin.';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = ['Ta', 'kome', 'od', '121', 'anđela', 'ikad', 'reče', ':', 'Ti', 'si', 'sin', 'moj', ',', '12323', 'danas', 'te', 'rodih', ';', 'ili', 'pak', ':', 'Ja', 'ću', 'njemu', 'biti', 'o', '12039', 'tac', ',', 'a', 'on', 'će', 'meni', 'biti', 'sin', '.'];
    expect(tokens).toEqual(expected);
  });
  it('should handle punctuation in kannada text', function() {
    const text = 'ಹೇಗೆಂದರೆ - ದೇವರು ತನ್ನ ದೇವದೂತರೊಳಗೆ ಯಾರಿಗಾದರೂ ಎಂದಾದರೂ ಈ ರೀತಿಯಾಗಿ ಹೇಳಿದ್ದುಂಟೋ? - <<ನೀನು ನನ್ನ ಮಗನು; ನಾನೇ ಈ ಹೊತ್ತು ನಿನ್ನನ್ನು ಪಡೆದಿದ್ದೇನೆ.>> <<ನಾನು ಅವನಿಗೆ ತಂದೆಯಾಗಿರುವೆನು, ಅವನು ನನಗೆ ಮಗನಾಗಿರುವನು.>>';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = ['ಹೇಗೆಂದರೆ', '-', 'ದೇವರು', 'ತನ್ನ', 'ದೇವದೂತರೊಳಗೆ', 'ಯಾರಿಗಾದರೂ', 'ಎಂದಾದರೂ', 'ಈ', 'ರೀತಿಯಾಗಿ', 'ಹೇಳಿದ್ದುಂಟೋ', '?', '-', '<<', 'ನೀನು', 'ನನ್ನ', 'ಮಗನು', ';', 'ನಾನೇ', 'ಈ', 'ಹೊತ್ತು', 'ನಿನ್ನನ್ನು', 'ಪಡೆದಿದ್ದೇನೆ', '.', '>>', '<<', 'ನಾನು', 'ಅವನಿಗೆ', 'ತಂದೆಯಾಗಿರುವೆನು', ',', 'ಅವನು', 'ನನಗೆ', 'ಮಗನಾಗಿರುವನು', '.', '>>'];
    expect(tokens).toEqual(expected);
  });
  it('should handle punctuation in odia text', function() {
    const text = 'କାରଣ ଈଶ୍ୱର ଦୂତମାନଙ୍କ ମଧ୍ୟରୁ କାହାକୁ କେବେ ଏହା କହିଅଛନ୍ତି, "ତୁମ୍ଭେ ଆମ୍ଭର ପୁତ୍ର, ଆଜି ଆମ୍ଭେ ତୁମ୍ଭକୁ ଜନ୍ମ ଦେଇଅଛୁ ?\'\'ପୁନଶ୍ଚ, "ଆମ୍ଭେ ତାହାଙ୍କର ପିତା ହେବା, ଆଉ ସେ ଆମ୍ଭର ପୁତ୍ର ହେବେ ?\'\'';
    const tokens = tokenize({text, includePunctuation: true});
    const expected = ['କାରଣ', 'ଈଶ୍ୱର', 'ଦୂତମାନଙ୍କ', 'ମଧ୍ୟରୁ', 'କାହାକୁ', 'କେବେ', 'ଏହା', 'କହିଅଛନ୍ତି', ',', '"', 'ତୁମ୍ଭେ', 'ଆମ୍ଭର', 'ପୁତ୍ର', ',', 'ଆଜି', 'ଆମ୍ଭେ', 'ତୁମ୍ଭକୁ', 'ଜନ୍ମ', 'ଦେଇଅଛୁ', '?', '\'', '\'', 'ପୁନଶ୍ଚ', ',', '"', 'ଆମ୍ଭେ', 'ତାହାଙ୍କର', 'ପିତା', 'ହେବା', ',', 'ଆଉ', 'ସେ', 'ଆମ୍ଭର', 'ପୁତ୍ର', 'ହେବେ', '?', '\'', '\''];
    expect(tokens).toEqual(expected);
  });

  it('should handle punctuation in greek text', function() {
    const text = 'ἀλλ’ οὐ προκόψουσιν ἐπὶ πλεῖον, ἡ γὰρ ἄνοια αὐτῶν ἔκδηλος ἔσται πᾶσιν, ὡς καὶ ἡ ἐκείνων ἐγένετο.';
    const tokens = tokenizeOrigLang({text, includePunctuation: true});
    const expected = ['ἀλλ’', 'οὐ', 'προκόψουσιν', 'ἐπὶ', 'πλεῖον', ',', 'ἡ', 'γὰρ', 'ἄνοια', 'αὐτῶν', 'ἔκδηλος', 'ἔσται', 'πᾶσιν', ',', 'ὡς', 'καὶ', 'ἡ', 'ἐκείνων', 'ἐγένετο', '.'];
    expect(tokens).toEqual(expected);
  });
});
