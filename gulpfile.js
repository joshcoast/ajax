/* -- Notes from css-tricks https://css-tricks.com/gulp-for-beginners/ --*/

// Our Requirements
//var postcss = require('gulp-postcss');
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');

// The postCss array or required plugins https://www.smashingmagazine.com/2015/12/introduction-to-postcss/



/* -- Development Tasks --*/

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

/* -- Production Website Tasks --*/

// Builds dist directory task
gulp.task('useref', function(){
  return gulp.src('app/*.html') // useref is a plugin that concatenates js files.
    .pipe(useref())
		.pipe(gulp.dest('dist'))
		// Minifies only if it's a JavaScript file
		.pipe(gulpIf('*.js', uglify()))
		// place new file in the dist "distribute" directory
		.pipe(gulp.dest('dist'))
});

// postCSS grabs dev css and runs production ready plugins to the css (like autoprefixer)



gulp.task('styles', function () {
	var postcss = require('gulp-postcss');
	var focus = require('postcss-focus');

	return gulp.src('app/css/styles.css')
			.pipe( postcss([ 
				focus,
				require('autoprefixer'), 
			 ]) )
			.pipe( gulp.dest('dist/css/') );
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

// Caches Images task
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// Clear Image Cache 
gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback)
})

// Moves our fonts to the dist directory (no optimization needed)
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// Cleans dist directory task
gulp.task('clean:dist', function() {
  return del.sync('dist');
})

/*-- run-sequence (to run production tasks in a particular order)
example:
gulp.task('task-name', function(callback) {
  runSequence('task-one', ['tasks','two','run','in','parallel'], 'task-three', callback);
});
Note: the tasks in the array run simultaneously
--*/
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'], 'styles',
    callback
  )
})

//Watch tasks

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

// "default"  runs sass task then browserSync task and then the watch task when you run `gulp` all by itself. 
gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})





