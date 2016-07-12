var gulp = require('gulp'),
	del = require('del'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	gulpFilter = require('gulp-filter'),
	runSequence = require('run-sequence'),
	minifyCSS = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	browserSync = require('browser-sync').create(),
	mainBowerFiles = require('gulp-main-bower-files');

// Bases
var bases = {
	app: 'app/',
	dist: 'dist/'
}

// Paths
var paths = {
	styles: [bases.app+'styles/*.scss'],
	scripts: [bases.app+'scripts/*.js', '!'+bases.app+'scripts/components/*.js', '!'+bases.app+'scripts/react-components/*.js'],
	images: [bases.app+'images/**/*.{gif,jpg,png,jpeg}']
}

// JS Lint
gulp.task('lint', function() {
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Clean Directories
gulp.task('clean', function() {
	return del(['dist']);
});

// Task Browser Sync
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		},
	})
});

// Gulp html
gulp.task('html', function(){
	return gulp.src(bases.app+'*.html')
		.pipe(gulp.dest(bases.dist))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Task Styles
gulp.task('styles', function() {
	return gulp.src(paths.styles)
		.pipe(sourcemaps.init())
	    .pipe(concat('style.min.css'))
	    .pipe(sass({style: 'expanded'}))
		.pipe(minifyCSS())
	    .pipe(sourcemaps.write())
	    .pipe(gulp.dest(bases.dist+'styles'))
	    .pipe(browserSync.reload({
			stream: true
		}));
});

// Task Scripts
gulp.task('scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(bases.dist+'scripts'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Copy React Components
gulp.task('react-scripts', function() {
	return gulp.src(bases.app+'scripts/react-components/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('products.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(bases.dist+'scripts/react-components/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Copy Files
gulp.task('copyFiles', function() {
	gulp.src(bases.app+'data/*')
	.pipe(gulp.dest(bases.dist+'data/'))

	gulp.src(bases.app+'styles/img/**/*')
	.pipe(gulp.dest(bases.dist+'styles/img'))
	
	return gulp.src(bases.app+'styles/fonts/**/*')
		.pipe(gulp.dest(bases.dist+'styles/fonts'))
});

// Task bower components
gulp.task('components', function () {
	var filterJS = gulpFilter(bases.app+'scripts/components/**/*.js', { restore: true });
	return gulp.src('./bower.json')
	.pipe(mainBowerFiles())
	.pipe(filterJS)
	.pipe(filterJS.restore)
    .pipe(gulp.dest('./'+bases.dist+'scripts/components'))
});

// Task images
gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest(bases.dist+'images'));
});
 
// Rerun the task when a file changes
gulp.task('watch', ['browserSync'], function() {
	gulp.watch(bases.app+'*.html', ['html']);
	gulp.watch(paths.styles, ['styles']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(bases.app+'scripts/react-components/*.js', ['react-scripts']);
	gulp.watch(paths.scripts, ['scripts'], function(){
		gulp.run('lint', 'scripts');
	});
});

// Default Task
gulp.task('default', function(callback) {
	runSequence('clean',
	['watch', 'html', 'styles', 'scripts', 'react-scripts', 'images', 'copyFiles', 'components'], callback)
});
