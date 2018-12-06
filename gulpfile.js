/**
 * Gulp Starter Pack 0.0.1
 * Elliot COLLIN <elliot.cln@gmail.com>
 */

/**
 * Paths
 * Define paths for css, sass, images and dist
 */
var path = {
	css: 'src/css/',
  scss: 'src/scss/',
  img: 'src/images/',
	dist: 'dist/'
}

/**
 * Requires
 * Only require Gulp and gulp-load-plugins function
 */
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')()
  
/**
 * Tasks
 * Compile scss files, minify images and css
 */

  //  Compile scss files
  gulp.task('scss', () => {
    return gulp.src(path.scss + '**/*.scss')
      .pipe($.sass().on('error', $.sass.logError))
      .pipe(gulp.dest(path.css))
  })

  // Minify images
  gulp.task('imgmin', (img) => {
    gulp.src(path.img + '*')
      .pipe($.imagemin())
      .pipe(gulp.dest(path.dist))

      img()
  })

  // Minify css files
  gulp.task('cssmin', (css) => {
    gulp.src(path.css + '**/*.css')
      .pipe($.autoprefixer())
      .pipe($.cssnano())
      .pipe($.rename((path) => {
        path.basename += '.min'
      }))
      .pipe(gulp.dest(path.dist))

      css()
  })

  // Minify all files and create a dist directory with minify & compressed files
  gulp.task('prod', gulp.series(['imgmin', 'cssmin']), (cb) => {
    cb();
  })

  // Default task run `scss` task
  gulp.task('default', gulp.series('scss'), () => {})

  // Watch scss files modifications then run `scss` task 
  gulp.task('watch', () => {
    gulp.watch(path.scss + '**/*.scss', gulp.series('scss'))
  })
