// https://prettier.io/docs/en/options.html
/** @type {import('prettier').RequiredOptions} */
module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  overrides: [
    {
      files: 'Routes.*',
      options: {
        printWidth: 999,
      },
    },
  ],
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
}
