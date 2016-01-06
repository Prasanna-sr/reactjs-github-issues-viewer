var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');

gulp.task('browserify', function() {
    var b = browserify({
        entries: ['./js/app.js'],
        transform: [reactify],
        cache: {}, packageCache: {}, fullPaths: true ,
        plugin:[watchify]
    });
    b.on('update', function () {
        bundle();
    })
    bundle();
    function bundle() {
        b.bundle().pipe(fs.createWriteStream('js/bundle.js'));
    }
});

gulp.task('default', ['browserify']);
