var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

gulp.task('browserify', function() {
    var b = browserify({
        entries: ['./app/js/app.js'],
        transform: [reactify],
        cache: {}, packageCache: {}, fullPaths: true ,
        plugin:[watchify]
    });
    b.on('update', function () {
        bundle();
    })
    bundle();
    function bundle() {
        b.bundle().pipe(fs.createWriteStream('app/js/bundle.js'));
    }
});
gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
        port: 3000,
        fallback: 'index.html'
    }));
});

gulp.task('default', ['webserver','browserify']);
