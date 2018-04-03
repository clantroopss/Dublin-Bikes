module.exports = function override(config, env) {
  //do stuff with the webpack config...
  if (process.env.NODE_ENV === 'development') {
      const devServerConfigPath = 'react-scripts/config/webpackDevServer.config';
      const devServerConfig = require(devServerConfigPath);
      require.cache[require.resolve(devServerConfigPath)].exports = (
        proxy,
        allowedHost
      ) => {
        const conf = devServerConfig(proxy, allowedHost);
        conf.https = {
          key: fs.readFileSync('./server.key'),
          cert: fs.readFileSync('./server.pem')
        };

        return conf;
      };
  }
  return config;
}