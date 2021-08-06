var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var cssnano      = require('gulp-cssnano');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minify       = require("gulp-minify");
//const sass = require("gulp-sass")(require("node-sass"));

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/assets/scss/*.scss")
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
	 	.pipe(autoprefixer({
	 		browsers: ['last 2 versions'],
	 		cascade: false
	 	}))        
	 	.pipe(cssnano())
	 	.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("src/assets/js/*.js") 
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest("src/js"));
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', 'js', function() {

    browserSync.init({
        server: "./src/"
    });

    gulp.watch("src/assets/scss/*.scss", gulp.series('sass'));
    gulp.watch("src/assets/js/*.js", gulp.series('js'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));