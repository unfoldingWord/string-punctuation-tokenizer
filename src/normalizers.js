// Constants:
// NOTE: in UHB, maqqef 05BE is followed by 2060, word joiner.
// Therefore, we should NOT strip maqqef to match tokenization, which splits on nonword characters.
export const _hebrewNonSemanticGlyphs = [
    { inputs: [/[\u0591-\u05AF\u05BD\u05C0\u05C3-\u05C5\u2060]/gi], output: '' },
];
// https://unicode-table.com/en/#combining-diacritical-marks
export const _greekNonSemanticGlyphs = [
    { inputs: [/[\u0300-\u0362\u0374-\u0375\u037a\u0384-\u0385\u0387]/g], output: '' },
];
export const _spaceNonSemanticGlyphs = [
    { inputs: [/(\u200B)/g], output: '' },
    { inputs: [/\s+/g], output: ' ' },
];


export const normalizationsDestructive = []
    .concat(_hebrewNonSemanticGlyphs)
    .concat(_greekNonSemanticGlyphs)
    .concat(_spaceNonSemanticGlyphs);


/**
 * @param {String} string - The string to normalize
 * @param {[{inputs:[RegExp], output:String}]} normalizations - Normalization Objects to perform the replace with
 * @return {String} - The normalized string
 */
export const normalizerDestructive = (string, normalizations = normalizationsDestructive) => {
    let _string = normalizer(string);

    if (string && normalizations) {
        _string = _string.slice(0);
        normalizations.forEach(({ inputs, output }) => {
            inputs.forEach((input) => {
                _string = _string.replace(input, output);
            });
        });
    }

    return _string;
}

/**
 * Normalize a string: standard Javascript normalization, providing default form.
 * @return {String} normalized string.
 */
export const normalizer = (text = '', form = 'NFKD') => {
    text = text.normalize(form);
    return text;
};
