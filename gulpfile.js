/* -- Notes from css-tricks https://css-tricks.com/gulp-for-beginners/ --*/

// Plugin requirements
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

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

//Tasks
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

//Watch tasks

/* -- It'll be cumbersome to open up two command line windows and run gulp browserSync and gulp watch separately, so let's get Gulp to run them together by telling the watch task that browserSync must be completed before watch is allowed to run.
-- We'll also want to make sure sass runs before watch so the CSS will already be the latest whenever we run a Gulp command.

example:
gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){
  // ...
})
--*/

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload); 
	gulp.watch('app/js/**/*.js', browserSync.reload); 
})





