/*
	Tasks:

	$ gulp --handle 	: Build the "handle" component 
	$ gulp watch	    : Starts a watch on all components. 
                            Also starts a server at localhost:3000
*/

const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const cleancss = require('gulp-clean-css');
const typescript = require('gulp-typescript');
const replace = require('gulp-replace');
const fs = require('fs');
const connect = require('gulp-connect');

/** The webcomponent that is currently being build. */
let build = '';

const clear = () => {
    return src(`dist/${build}`, { 
        read: false,
        allowEmpty: true
    })
    .pipe(clean());
}

const css = () => {
    return src(`src/${build}/index.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleancss({
            format: 'keep-breaks'
        }))
        .pipe(dest(`tmp/${build}`));
};

const html = () => {
    return src(`src/${build}/index.html`)
        .pipe(dest(`tmp/${build}`));
};

const js = () => {
    return src( `src/${build}/**/*.ts`)
        .pipe(
            typescript({
                target: 'es6',
                module: 'es6'
            })
        )
        .pipe(dest(`tmp/${build}`))
        .pipe(dest(`dist/${build}`));
};

const concat = () => {
    const styles = fs.readFileSync(`tmp/${build}/index.css`);
    const html = fs.readFileSync(`tmp/${build}/index.html`);
    
    return src(`tmp/${build}/index.js`)
        .pipe(replace('<STYLE />', `<style>${styles}</style>`))
        .pipe(replace('<HTML />', html))
        .pipe(dest(`dist/${build}`));
};

const cleanup = () => {
    return src('tmp', { 
            read: false,
            allowEmpty: true
        })
        .pipe(clean());
};

const webcomponent = series(
    clear,
    parallel(html, css, js),
    concat,
    cleanup
);

exports.default = async cb => {
    build = process.argv[2];

    if (build) {
        build = build.replace('--', '');
    }

    try {
        if (fs.statSync(`src/${build}`).isDirectory()) {
            webcomponent()
        }
    } catch(err) {
        console.log('\x1b[31m', `Webcomponent "${build}" not found.`, '\x1b[0m');
    }
};

exports.watch = async cb => {
    connect.server({
        port: 3000
    });

    return watch('src/**/*')
        .on('change', (path) => {
            build = path.split('/')[1];
            console.log('\x1b[32m', 'Change detected to "' + build + '" webcomponent.', '\x1b[0m');
            webcomponent();
        });
    
};