module.exports = {
  html: 'dist/index.html',
  options: {
    dest: 'dist',
    flow: {
      steps: {
        js: ['concat'],
        css: ['concat', 'cssmin']
      },
      post: {}
    }
  }
};
