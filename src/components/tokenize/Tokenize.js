import React from 'react';

import {tokenize} from '../../tokenizers';

/**
 * Adds two numbers together.
 * @param {string} string the string input.
 * @return {object} The react component.
 */
function Tokenize({
  string,
}) {
  const tokens = tokenize(string);
  const tokenItems = tokens.map((token) =>
      <li>
        {token}
      </li>
  );

  return (
    <ul>{tokenItems}</ul>
  );
}

export default Tokenize;
