/* -- Notes from css-tricks https://css-tricks.com/gulp-for-beginners/ --*/

// Our Requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var imagemin = require('gulp-imagemin');

/* -- Browser Sync task 
	We need to create a browserSync task to enable Gulp to spin up a server using Browser Sync. Since we're running a server, we need to let Browser Sync know where the root of the server should be. In our case, it's the `app` folder:
-- */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// Compiles scss to css task
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Builds dist directory task
gulp.task('useref', function(){
  return gulp.src('app/*.html') // useref is a plugin that concatenates js files.
    .pipe(useref())
		.pipe(gulp.dest('dist'))
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cssnano()))
		// place new file in the dist "distribute" directory
		.pipe(gulp.dest('dist'))
});

// Optimizing Images task
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      // Setting interlaced to true
      interlaced: true
    }))
  .pipe(gulp.dest('dist/images'))
});

// Cleans dist directory task
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

//Watch task
/* -- 
example:
gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){
   ...
})
--*/

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload); 
})





