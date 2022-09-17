module.exports = {
    apps : [{
      name   : "app1",
      script : "./index.js",
      env_production: {
         NODE_ENV: "production"
      },
      env_development: {
         NODE_ENV: "development"
      }
    }]
  }