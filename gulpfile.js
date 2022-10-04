const { src, dest, watch, series, parallel } = require('gulp');
const browserSync =  require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');


// Определяем логику работы Browsersync
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: 'dist/' }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}

function styles() {
    return src('src/sass/*.+(scss|sass|css)') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
        .pipe(sass().on('error', sass.logError))
        // .pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
        // .pipe(concat('app.min.css')) // Конкатенируем в файл app.min.js
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
        .pipe(dest('dist/css/')) // Выгрузим результат в папку "app/css/"
        .pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function html () {
    return src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
}

function scripts () {
    return src('src/js/**/*.js')
        .pipe(dest('dist/js'));
}

function fonts () {
    return src('src/fonts/**/*')
        .pipe(dest('dist/fonts'));
}

function icons () {
    return src('src/icons/**/*')
        .pipe(dest('dist/icons'));
}

function startwatch() {
    // Мониторим файлы препроцессора на изменения
    watch('src/sass/*.+(scss|sass|css)', styles);
    watch('src/sass/**/*.+(scss|sass|css)', styles);
    watch('src/*.html', html);
    watch('src/js/script.js', scripts);
    watch('src/*.html', browserSync.reload());
}

function img () {
    return src('src/img/**/*')
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.startwatch = startwatch;
exports.html = html;
exports.scripts = scripts;
exports.fonts = fonts;
exports.icons = icons;
exports.img = img;

exports.default = parallel(browsersync, styles, startwatch, html, scripts, fonts, icons, img);