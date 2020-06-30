const Path = require('path');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const { name, version, repository } = require('./package.json');
const { styles, theme } = require('./styleguide.styles');

let sections = [
  {
    name: 'README',
    content: 'README.md',
  },
  {
    name: 'Tokenize',
    content: 'src/docs/Tokenize.md',
  },
  {
    name: 'Normalize',
    content: 'src/docs/Normalize.md',
  },
  {
    name: 'Greedy Tokens',
    content: 'src/docs/Greedy.md',
  },
  {
    name: 'Zero Width Joiners',
    content: 'src/docs/ZeroWidthJoiners.md',
  },
  {
    name: 'Benchmarks',
    content: 'src/docs/Benchmarks.md',
  },
];

module.exports = {
  title: `${upperFirst(camelCase(name))} v${version}`,
  ribbon: {
    url: repository.url,
    text: 'View on GitHub',
  },
  webpackConfig: require('react-scripts/config/webpack.config')('development'),
  // serverPort: 3000,
  styles,
  theme,
  getComponentPathLine: (componentPath) => {
    const dirname = Path.dirname(componentPath, '.js');
    const file = dirname.split('/').slice(-1)[0];
    const componentName = upperFirst(camelCase(file));
    return `import { ${componentName} } from "${name}";`;
  },
  usageMode: 'expand',
  exampleMode: 'expand',
  pagePerSection: true,
  sections,
};
