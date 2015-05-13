module.exports = {
  options: {
    basePath: 'app',
    baseUrl: '../public/'
  },
  myTarget: {
    files: {
      'dist/index.html': 'app/index.html',
      'dist/form.html': 'app/form.html'
    }
  }
};