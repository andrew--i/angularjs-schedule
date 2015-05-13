module.exports = {
  options: {
    singleQuotes: true
  },
  production: {
    files: [
      {
        expand: true,
        src: ['dist/assets/app.js']
      }
    ]
  }
};