module.exports = {
  buildStyle: {
    src: [
      'app/app.less',
      'app/modules/**/*.less',
      'app/directives/**/*.less'
    ],
    dest: '.tmp/app.less'
  }
};