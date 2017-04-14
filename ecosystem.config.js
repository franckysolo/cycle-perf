module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'cycle-perf',
      script: './server/server.js',
      watch: true,
      env: {
        NODE_ENV: "development",
        COMMON_VARIABLE: 'true'
      }
    }
  ]
}
