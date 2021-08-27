module.exports = (config, options) => {

  let nrwlConfig = require("@nrwl/react/plugins/webpack")(config);

  return {
    ...nrwlConfig,
    target: 'electron-renderer'
  }
}
