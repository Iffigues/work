module.exports = function (api) {
  api.cache(true)

  const presets = [
    ["@babel/preset-env"],
    ["@babel/preset-react"]
  ]
  const plugins = [
    ['@babel/plugin-transform-arrow-functions'],
    ['transform-class-properties']
  ]
  
  return {
    presets,
    plugins
  }
}
