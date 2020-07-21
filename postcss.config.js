const postcssPresetEnv = require('postcss-preset-env');
const postcssCalc = require('postcss-calc')
const postcssVariables = require('postcss-css-variables')

module.exports = {
  plugins: [
    postcssVariables({
      variables: {
        "--padding": "0.5rem",
        "--white": "#fefefe",
        "--black": "#22181C",
        "--border-radius": "4.5px",
        "--font-size": "62.5%",
        "--header-font": "'Roboto', sans-serif",
        "--body-font": "'Open Sans', sans-serif",
        "--primary-color": "#84B082",
        "--secondary-color": "#75486D",
        "--warn-color": "#FF521B",
        "--border-color": "rgba(33, 33, 33, 0.04)",
      }
    }),
    postcssCalc({
      warnWhenCannotResolve: true
    }),
    postcssPresetEnv({
      preserve: true,
      autoprefixer: { grid: true, flexbox: true },
      browsers: 'last 5 versions',
      stage: 0
    }),
  ]
}