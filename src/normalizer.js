import xRegExp from 'xregexp';

// constants
// NOTE: in UHB, maqqef 05BE is followed by 2060, word joiner.
// Therefore, we should NOT strip maqqef to match tokenization, which splits on nonword characters.
export const _hebrewNonSemanticGlyphs =
    '[\u0591-\u05AF\u05BD\u05C0\u05C3-\u05C5\u2060]';
export const stripHebrewNonSemanticGlyphs = xRegExp(
    _hebrewNonSemanticGlyphs,
    'gi'
);

/**
 * Normalize a string: standard Javascript normalization, plus optional "lossy" normalization for Hebrew and Greek unicode.
 * @return {String} normalized string.
 */
export const normalize = ({ text = '', form = 'NFKC', lossy = false }) => {
    if (lossy) {
        text = xRegExp.replace(text, stripHebrewNonSemanticGlyphs, '');
    }
    text = text.normalize(form);

    return text;
};
