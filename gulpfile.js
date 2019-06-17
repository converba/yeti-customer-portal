var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
  dist: 'dist',
  src: 'src'
};

gulp.task('serve', function(done) {
  browserSync.init({
    server: './dist',
    open: false
  });

  gulp.watch(paths.src + '/**/*.scss', gulp.series('sass', 'watch:sass'));
  gulp.watch(paths.src + '/**/*.css', gulp.series('watch:css'));
  gulp.watch(paths.src + '/**/*.html', gulp.series('watch:html'));
  gulp.watch(paths.src + '/**/*.js', gulp.series('watch:js'));
  gulp.watch(paths.src + '/**/*.json', gulp.series('watch:json'));

  done()
});

gulp.task('watch:sass', function() {
  return gulp.src(paths.src + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist))
    .pipe(reload({stream:true}));
});

gulp.task('watch:css', function() {
  return gulp.src(paths.src + '/**/*.css')
    .pipe(gulp.dest(paths.dist))
    .pipe(reload({stream:true}));
});

gulp.task('watch:js', function() {
  return gulp.src(paths.src + '/**/*.js')
    .pipe(gulp.dest(paths.dist))
    .pipe(reload({stream:true}));
});

gulp.task('watch:html', function() {
  return gulp.src(paths.src + '/**/*.html')
    .pipe(gulp.dest(paths.dist))
    .pipe(reload({stream:true}));
});

gulp.task('watch:json', function() {
  return gulp.src(paths.src + '/**/*.json')
    .pipe(gulp.dest(paths.dist))
    .pipe(reload({stream:true}));
});

gulp.task('clean', function() {
  return gulp.src(paths.dist, {
    read: false,
    allowEmpty: true
  })
    .pipe(clean());
});

gulp.task('copy', function() {
  return gulp.src([
    '!' + paths.src + '/**/*.{sass,scss}',
    paths.src + '/**/*'
  ]).pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src(paths.src + '/**/*.{sass,scss}')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist))
});

gulp.task('default', gulp.series('clean', 'copy', 'sass', 'serve'));
