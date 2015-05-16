module.exports = {
  options: {
    spawn: false,
    livereload: true
  },
  scripts: {
    files: [
      'app/modules/**/*.js',
      'app/directives/**/*.js',
      'app/services/*.js'
    ],
    tasks: [
      'develop'
    ]
  },
  workplaceScripts: {
    files: ['workplace/**/*.js'],
    tasks: []
  },
  workplaceTemplates: {
    files: ['workplace/**/*.html'],
    tasks: [
      'develop'
    ]
  },
  styles: {
    files: [
      'app/**/*.less'
    ],
    tasks: [
      'develop'
    ]
  },
  templates: {
    files: [
      'app/*.html',
      'app/modules/**/*.html',
      'app/directives/**/*.html'
    ],
    tasks: [
      'develop'
    ]
  }
};