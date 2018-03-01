(function (r) {
    "use strict";
    var scss = r("gulp-scss");
    var gulp = r("gulp");
    const swig=require('gulp-swig');
    const babel=require('gulp-babel');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');
    
    gulp.task('babel',()=>
        gulp.src('src/es/**/*.js')
            .pipe(sourcemaps.init())
            .pipe(babel({
              presets:['env']
            })).pipe(gulp.dest('public/js'))
    );

    gulp.task('scss',function(){
        gulp.src(
            'src/scss/**/*.scss'
        ).pipe(scss())
        .pipe(gulp.dest('public/css'));
    });
    gulp.task('swig', function() {
        gulp.src('src/html/**/*.html')
        .pipe(swig({defaults: { cache: false }}))
        .pipe(gulp.dest('./public/'))
      });
      gulp.task('dev',['babel','scss','swig']);
      gulp.task('watch',function(){
          gulp.watch('[src/es/**/*.js]',['babel']);
          gulp.watch('src/scss/**/*.scss',['scss']);
          gulp.watch('src/html/**/*.html',['swig']); 
      });
}(require));


