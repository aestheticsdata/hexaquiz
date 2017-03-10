'use strict';

import gulp          from 'gulp';
import concat        from 'gulp-concat';
import sass          from 'gulp-sass';
import ngAnnotate    from 'gulp-ng-annotate';
import uglify        from 'gulp-uglify';
import del           from 'del';
import gulpif        from 'gulp-if';
import yargs         from 'yargs';
import wrap          from 'gulp-wrap';
import htmlmin       from 'gulp-htmlmin';
import server        from 'browser-sync';
import path          from 'path';
import templateCache from 'gulp-angular-templatecache';
import babel         from 'gulp-babel';
import sourcemaps    from 'gulp-sourcemaps';



const srcpath = 'src';
const argv = yargs.argv;
const paths = {
    dist: './dist/',
    styles:    [`${srcpath}/sass/*.scss`,
                // 'node_modules/angular-busy/dist/angular-busy.css',
                'node_modules/angular-loading-bar/build/loading-bar.css'
               ],
    bootstrap: 'node_modules/bootstrap/dist/**/*',
    scripts:   [`${srcpath}/app/**/*.js`, `!${srcpath}/app/**/*.spec.js`],
    templates: `${srcpath}/app/**/*.html`,
    modules: [
        'angular/angular.js',
        'angular-ui-router/release/angular-ui-router.js',
        'firebase/firebase.js',
        'angularfire/dist/angularfire.js',
        'ramda/dist/ramda.js',
        'angular-animate/angular-animate.min.js',
        'angular-loading-bar/build/loading-bar.min.js'
        // 'angular-busy/dist/angular-busy.js'
        // 'angular-ui-bootstrap/dist/*.js'
        //'angular-loading-bar/build/loading-bar.min.js'
    ],
    static: [
        `${srcpath}/index.html`,
        `${srcpath}/mock_data/*`,
        `${srcpath}/assets/**/*`,
        //`${srcpath}/fonts/**/*`,
        //`${srcpath}/img/**/*`
    ]
};


gulp.task('clean', cb => del(paths.dist + '**/*', cb));


gulp.task('templates', () => {
    return gulp.src(paths.templates)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(templateCache({
            root: 'app',
            module: 'hexaquiz.templates',
            standalone: true,
            transformUrl: function (url) {
                return url.replace(path.dirname(url), '.');
            }
        }))
        .pipe(gulp.dest('./'));
});


gulp.task('modules', ['templates'], () => {
    return gulp.src(paths.modules.map(item => 'node_modules/' + item))
        .pipe(concat('vendor.js'))
        .pipe(gulpif(argv.deploy, uglify()))
        .pipe(gulp.dest(paths.dist + 'js/'));
});


gulp.task('styles', () => {
    return gulp.src(paths.styles)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(paths.dist + 'css/'));
});

// gulp.task('bootstrap', () => {
//     return gulp.src([paths.bootstrap], {base:'node_modules'})
//         .pipe(gulp.dest(paths.dist));
// });


gulp.task('scripts', ['modules'], () => {
    return gulp.src([
        `!${srcpath}/app/**/*.spec.js`,
        `${srcpath}/app/**/*.module.js`,
        ...paths.scripts,
        './templates.js'
    ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
        .pipe(concat('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(gulpif(argv.deploy, uglify()))
        .pipe(gulp.dest(paths.dist + 'js/'));
});


// gulp.task('copy', ['clean', 'bootstrap'], () => {
gulp.task('copy', ['clean'], () => {
    return gulp.src(paths.static, { base: 'src' })
        .pipe(gulp.dest(paths.dist));
});


gulp.task('watch', ['serve', 'scripts'], () => {
    gulp.watch([paths.scripts, paths.templates], ['scripts']);
    gulp.watch(paths.styles, ['styles']);
});


gulp.task('serve', () => {
    return server.init({
        files: [`${paths.dist}/**`],
        port: 4000,
        server: {
            baseDir: paths.dist
        }
    });
});


gulp.task('default', [
    'copy',
    'styles',
    'serve',
    'watch'
]);








