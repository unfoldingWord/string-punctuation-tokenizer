import xRegExp from 'xregexp';

// Constants:
// NOTE: in UHB, maqqef 05BE is followed by 2060, word joiner.
// Therefore, we should NOT strip maqqef to match tokenization, which splits on nonword characters.
export const _hebrewNonSemanticGlyphs =
    '[\u0591-\u05AF\u05BD\u05C0\u05C3-\u05C5\u2060]';
export const _greekNonSemanticGlyphs = [
    { inputs: [/(\u200B)/g], output: '' },
    { inputs: [/\s+/g], output: ' ' },
];


export const normalizationsDestructive = [
    ..._hebrewNonSemanticGlyphs, _greekNonSemanticGlyphs
];


/**
 * @param {String} string - The string to normalize
 * @param {[{inputs:[RegExp], output:String}]} normalizations - Normalization Objects to perform the replace with
 * @return {String} - The normalized string
 */
export const normalizeDestructive = (string, normalizations = normalizationsDestructive) => {
    let _string = string.slice(0);
    normalizations.forEach(({ inputs, output }) => {
        inputs.forEach((input) => {
            _string = _string.replace(input, output);
        });
    });

    return _string;
}

/**
 * Normalize a string: standard Javascript normalization, providing default form.
 * @return {String} normalized string.
 */
export const normalize = ({ text = '', form = 'NFKC' }) => {
    text = text.normalize(form);
    return text;
};
