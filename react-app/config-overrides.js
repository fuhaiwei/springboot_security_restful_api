const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
  addWebpackAlias({
    ['#A']: path.resolve(__dirname, 'src/app'),
    ['#C']: path.resolve(__dirname, 'src/comps'),
    ['#F']: path.resolve(__dirname, 'src/feats'),
    ['#H']: path.resolve(__dirname, 'src/hooks'),
    ['#P']: path.resolve(__dirname, 'src/pages'),
  })
)
