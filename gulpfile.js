/* global exports process console __dirname Buffer */
/* eslint-disable no-console */
'use strict';

// Проверка количества съедаемой памяти
// setInterval(function(){ // eslint-disable-line
//   let memory = process.memoryUsage()
//   let date = new Date();
//   console.log(`[${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(date.getSeconds())}]`, 'Memory usage (heapUsed):', (memory.heapUsed / 1024 / 1024).toFixed(2) + 'Mb');
// }, 1000 * 10);
// function addZero(i) { return (i < 10) ? i = "0" + i : i;}

// Пакеты, использующиеся при обработке
const { series, parallel, src, dest, watch, lastRun } = require('gulp');
const fs = require('fs');
const plumber = require('gulp-plumber');
const del = require('del');
const pug = require('gulp-pug');
const through2 = require('through2');
const rename = require('gulp-rename');
const getClassesFromHtml = require('get-classes-from-html');
const browserSync = require('browser-sync').create();
const debug = require('gulp-debug');
const sass = require('gulp-sass')(require('sass'));
const webpackStream = require('webpack-stream');
const buffer = require('vinyl-buffer');
const postcss = require('gulp-postcss');
const atImport = require("postcss-import");
const autoprefixer = require("autoprefixer");
const mqpacker = require("css-mqpacker");
const csso = require('gulp-csso');
const inlineSVG = require('postcss-inline-svg');
const objectFitImages = require('postcss-object-fit-images');
const cpy = require('cpy');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const imagemin = require('gulp-imagemin');
const prettyHtml = require('gulp-pretty-html');
const replace = require('gulp-replace');
const ghpages = require('gh-pages');
const path = require('path');
const tailwindcss = require('tailwindcss');
const concat = require('gulp-concat');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const terser = require("gulp-terser");

// import imagemin from 'imagemin';

// Глобальные настройки этого запуска
// const buildLibrary = process.env.BUILD_LIBRARY == 'yes' ? true : false;
const buildLibrary = true;
const nth = {};
nth.config = require('./config.js');
nth.blocksFromHtml = Object.create(nth.config.alwaysAddBlocks); // блоки из конфига сразу добавим в список блоков
nth.scssImportsList = []; // список импортов стилей
const dir = nth.config.dir;

// Сообщение для компилируемых файлов
let doNotEditMsg = '\n ВНИМАНИЕ! Этот файл генерируется автоматически.\n Любые изменения этого файла будут потеряны при следующей компиляции.\n Любое изменение проекта без возможности компиляции ДОЛЬШЕ И ДОРОЖЕ в 2-5 раз.\n\n';

// Настройки pug-компилятора
let pugOption = {
  data: { repoUrl: 'https://github.com/nicothin/NTH-start-project', },
  filters: { 'show-code': filterShowCode, },
};

// Настройки бьютификатора
let prettyOption = {
  indent_size: 2,
  indent_char: ' ',
  unformatted: ['code', 'em', 'strong', 'span', 'i', 'b', 'br', 'script'],
  content_unformatted: [],
};

// Список и настройки плагинов postCSS
let postCssPlugins = [
  atImport(),
  tailwindcss(),
  //!!! autoprefixer({ grid: true }),
  // mqpacker({
  //   sort: true
  // }),
  inlineSVG(),
  objectFitImages(),
];



// function minifyImgs(cb) {
//   let minifyImgs = [];
//   nth.blocksFromHtml.forEach(function(block) {
//     let src = `${dir.blocks}${block}/img`;
//     if (fileExist(src)) minifyImgs.push(src);
//   });
//   nth.config.alwaysAddBlocks.forEach(function(block) {
//     let src = `${dir.blocks}${block}/img`;
//     if (fileExist(src)) minifyImgs.push(src);
//   });
//   if (minifyImgs.length) {
//     for (let src of minifyImgs) {
//       (async () => {
//         await imagemin(src, {
//           destination: src,
//           plugins: [
//             imageminJpegtran(),
//             imageminPngquant({
//               quality: [0.6, 0.8]
//             })
//           ]
//         });
//       })();
//     }
//     cb();
//   }
//   else {
//     cb();
//   }
// }
// exports.minifyImgs = minifyImgs;


function minifyImgs(cb) {
  (async () => {
     const files = await imagemin(['src/img/*.{png,jpg}'], {
      destination: 'src/img/test/',
      plugins: [
        imageminJpegtran(),
        imageminPngquant({
          quality: [0.6, 0.8]
        })
      ]
    });
       // console.log(files);

  })();
  cb();
}
exports.minifyImgs = minifyImgs;


function generateSvgSprite(cb) {
  let spriteSvgPath = `${dir.blocks}sprite-svg/svg/`;
  if (nth.config.alwaysAddBlocks.indexOf('sprite-svg') > -1 && fileExist(spriteSvgPath)) {
    return src(spriteSvgPath + '*.svg')
      // .pipe(svgmin(function() {
      //   return { plugins: [
      //     { cleanupIDs: { minify: true } },
      //     { removeViewBox: { active: false } }
      //   ]}
      // }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(rename('sprite.svg'))
      .pipe(dest(`${dir.blocks}sprite-svg/img/`));
  } else {
    cb();
  }
}
exports.generateSvgSprite = generateSvgSprite;


function generateInlineSvgSprite(cb) {
  let spriteSvgPath = `${dir.blocks}sprite-svg-inline/svg/`;
  if (nth.config.alwaysAddBlocks.indexOf('sprite-svg-inline') > -1 && fileExist(spriteSvgPath)) {
    return src(spriteSvgPath + '*.svg')
      .pipe(svgmin(function() {
        return { plugins: [{ cleanupIDs: { minify: true } }] }
      }))
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(rename('sprite-inline.svg'))
      .pipe(dest(`${dir.blocks}sprite-svg-inline/img/`));
  } else {
    cb();
  }
}
exports.generateInlineSvgSprite = generateInlineSvgSprite;


function generatePngSprite(cb) {
  let spritePngPath = `${dir.blocks}sprite-png/png/`;
  if (nth.config.alwaysAddBlocks.indexOf('sprite-png') > -1 && fileExist(spritePngPath)) {
    del(`${dir.blocks}sprite-png/img/*.png`);
    let fileName = 'sprite.png';
    let spriteData = src(spritePngPath + '*.png')
      .pipe(spritesmith({
        imgName: fileName,
        cssName: 'sprite-png.scss',
        padding: 4,
        imgPath: '../img/' + fileName,
        cssTemplate: 'handlebarsStrDefault.css.handlebars',
      }));
    let imgStream = spriteData.img
      .pipe(buffer())
      .pipe(imagemin([imagemin.optipng({ optimizationLevel: 5 })]))
      .pipe(dest(`${dir.blocks}sprite-png/img/`));
    let cssStream = spriteData.css
      .pipe(dest(`${dir.blocks}sprite-png/`));
    return merge(imgStream, cssStream);
  } else {
    cb();
  }
}
exports.generatePngSprite = generatePngSprite;


function compileSass() {
  const fileList = [
    `${dir.src}scss/index.scss`,
  ];
  return src(fileList, { sourcemaps: true })
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(debug({ title: 'Compiles:' }))
    .pipe(sass({ includePaths: [__dirname + '/', 'node_modules'] }))
    .pipe(postcss(postCssPlugins))
    // .pipe(csso({
    //   restructure: false,
    // }))
    .pipe(rename('style.css'))
    .pipe(dest(`${dir.build}css`, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
}
exports.compileSass = compileSass;


function compileTailwind() {
  let plugins = [
    atImport(),
    tailwindcss(),
  ];
  return src([`${dir.src}input.css`])
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err);
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(debug({ title: 'Compiles tailwindcss:' }))
    .pipe(postcss(plugins))
    .pipe(dest(`${dir.src}css`, { sourcemaps: '.' }))
  // .pipe(browserSync.stream());
}
exports.compileTailwind = compileTailwind;



function buildJs() {
  const entryList = {
    'main': `./${dir.src}js/entry.js`,
  };
  return src(`${dir.src}js/entry.js`)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(webpackStream({
      mode: 'development',
      entry: entryList,
      output: {
        filename: '[name].js',
      },
      module: {
        rules: [{
            test: /\.src\/input.css$/i,
            exclude: /node_modules/,
            use: [{
                loader: MiniCssExtractPlugin.loader
              },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  url: false
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    config: path.resolve(__dirname, 'postcss.config.js'),
                  },
                },
              }
            ]
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "css/test.css",
        })
      ],
      // externals: {
      //   jquery: 'jQuery'
      // }
    }))
    .pipe(dest(`${dir.build}js`));
}
exports.buildJs = buildJs;


// These functions loop through the tailwind custom config objects set in your tailwind.config.js file and exposes them as variables in sass

// Usage:
// Just add these functions the gulpfile.js and then call writeTailwindToSass() in your task
// change the file directories to whatever fits for your theme

var tailwindConfig = require('./tailwind.config.js');

function getTailwindScreens() {
  let sass = `// This file is automatically generated, do not edit \n`;
  for (let key in tailwindConfig.theme.screens) {
    if (tailwindConfig.theme.screens.hasOwnProperty(key)) {
      let value = tailwindConfig.theme.screens[key];
      sass += `$screen-${key}: ${value}; \n`;
      let container;
      if (tailwindConfig.theme.container.padding.hasOwnProperty(key)) {
        container = parseInt(tailwindConfig.theme.container.padding[key]);
      } else {
        container = parseInt(tailwindConfig.theme.container.padding['DEFAULT']);
      }
      sass += `$container-${key}: ${value}-${container}*2; \n`;
    }
  }
  return sass;

}

function getTailwindColours() {
  let sass = `// This file is automatically generated, do not edit \n`;
  let colors = {};
  colors = tailwindConfig.theme.colors({ colors });
  let myColors = colors;
  for (let key in myColors) {
    if (myColors.hasOwnProperty(key)) {
      let property = myColors[key];

      if (typeof property === 'object' && property !== null) {
        for (let subkey in property) {
          if (property.hasOwnProperty(subkey)) {
            let subvalue = property[subkey];
            sass += `$tw-${key}-${subkey}: ${subvalue}; \n`;
          }
        }
      } else {
        sass += `$tw-${key}: ${property}; \n`;
      }
    }
  }

  return sass;
}


async function writeTailwindToSass() {
  let screenData = getTailwindScreens();
  fs.writeFile(`${dir.src}scss/_tailwind-screens.scss`, screenData, function(err, file) {
    if (err) throw err;
  })

  let coloursData = getTailwindColours();
  fs.writeFile(`${dir.src}scss/_tailwind-colours.scss`, coloursData, function(err, file) {
    if (err) throw err;
  })
}

exports.writeTailwindToSass = writeTailwindToSass;



function clearBuildDir() {
  return del([
    `${dir.build}**/*`,
    `!${dir.build}readme.md`,
  ]);
}
exports.clearBuildDir = clearBuildDir;

function copyAssets(cb) {
  for (let item in nth.config.addAssets) {
    let dest = `${dir.build}${nth.config.addAssets[item]}`;
    cpy(item, dest);
  }
  cb();
}
exports.copyAssets = copyAssets;

function minCss() {

  return src('./initial/assets/css/meanmenu.css')
    // .pipe(sourcemaps.init())
    // .pipe(postcss([ autoprefixer({grid: 'autoplace'}) ]))
    .pipe(csso({
      restructure: false,
    }))
    .pipe(rename(function (path) {
      path.extname = ".min.css";
    }))
    // .pipe(sourcemaps.write('.'))
    .pipe(dest('initial/assets/css'))
}
exports.minCss = minCss;


function minJs() {

  return src('./initial/assets/js/jquery.meanmenu.js')
      .pipe(terser())
      .pipe(rename(function (path) {
        // Updates the object in-place
        path.extname = ".min.js";
      }))
      .pipe(
        dest('initial/assets/js'))
};
exports.minJs = minJs;

function reload(done) {
  browserSync.reload();
  done();
}

function deploy(cb) {
  ghpages.publish(path.join(process.cwd(), dir.build), cb);
}
exports.deploy = deploy;


function serve() {

  browserSync.init({
    server: dir.build,
    port: 8080,
    startPath: 'index.html',
    open: false,
    notify: false,
  });

  // Страницы: изменение, добавление


  // Страницы: удаление

  // Разметка Блоков: изменение

  // Разметка Блоков: добавление

  // Разметка Блоков: удаление
  // Шаблоны pug: все события

  // HTML: изменение
  watch([`./*.html`], { events: ['change'], delay: 100 }, series(
    copyAssets,
    reload
    // compileTailwind,
    // concatCss
  ));


  // SCSS: изменение
  watch([`${dir.src}scss/*.scss`], { events: ['change'], delay: 100 }, series(
    compileSass,
    // compileTailwind,
    // concatCss
  ));

  // CSS: изменение
  watch([`${dir.src}css/*.css`], { events: ['change'], delay: 100 }, series(
    copyAssets,
    // compileTailwind,
    // concatCss
  ));

  // JS: изменение
  watch([`${dir.src}js/*.js`], { events: ['change'], delay: 100 }, series(
    buildJs
  ));

  // // Стили Блоков: добавление
  // watch([`${dir.blocks}**/*.scss`], { events: ['add'], delay: 100 }, series(
  //   compileSass,
  //   // compileTailwind,
  //   // concatCss
  // ));

  // // Стилевые глобальные файлы: все события
  // watch([`${dir.src}scss/**/*.scss`, `!${dir.src}scss/style.scss`], { events: ['all'], delay: 100 }, series(
  //   compileSass,
  //   // compileTailwind,
  //   // concatCss
  // ));

  // // Скриптовые глобальные файлы: все события
  // watch([`${dir.src}js/**/*.js`, `!${dir.src}js/entry.js`, `${dir.blocks}**/*.js`], { events: ['all'], delay: 100 }, series(
  //   buildJs,
  //   reload
  // ));

  // // Картинки: все события
  // watch([`${dir.blocks}**/img/*.{jpg,jpeg,png,gif,svg,webp}`], { events: ['all'], delay: 100 }, series(copyImg, reload));

  // // Спрайт SVG
  // watch([`${dir.blocks}sprite-svg/svg/*.svg`], { events: ['all'], delay: 100 }, series(
  //   generateSvgSprite,
  //   copyImg,
  //   reload,
  // ));

  // // Спрайт PNG
  // watch([`${dir.blocks}sprite-png/png/*.png`], { events: ['all'], delay: 100 }, series(
  //   generatePngSprite,
  //   copyImg,
  //   compileSass,
  //   // compileTailwind,
  //   // concatCss,
  //   reload,
  // ));
}


exports.build = series(
  clearBuildDir,
  copyAssets,
  parallel(generateSvgSprite, generateInlineSvgSprite, generatePngSprite),
  writeTailwindToSass,
  compileSass,
  buildJs,
);


exports.default = series(
  clearBuildDir,
  copyAssets,
  parallel(generateSvgSprite, generateInlineSvgSprite, generatePngSprite),
  writeTailwindToSass,
  compileSass,
  buildJs,
  serve,
);





// Функции, не являющиеся задачами Gulp ----------------------------------------

/**
 * Получение списка классов из HTML и запись его в глоб. переменную nth.blocksFromHtml.
 * @param  {object}   file Обрабатываемый файл
 * @param  {string}   enc  Кодировка
 * @param  {Function} cb   Коллбэк
 */
function getClassesToBlocksList(file, enc, cb) {
  // Передана херь — выходим
  if (file.isNull()) {
    cb(null, file);
    return;
  }
  // Проверяем, не является ли обрабатываемый файл исключением
  let processThisFile = true;
  nth.config.notGetBlocks.forEach(function(item) {
    if (file.relative.trim() == item.trim()) processThisFile = false;
  });
  // Файл не исключён из обработки, погнали
  if (processThisFile) {
    const fileContent = file.contents.toString();
    let classesInFile = getClassesFromHtml(fileContent);
    // nth.blocksFromHtml = [];
    // Обойдём найденные классы
    for (let item of classesInFile) {
      // Не Блок или этот Блок уже присутствует?
      if ((item.indexOf('__') > -1) || (item.indexOf('--') > -1) || (nth.blocksFromHtml.indexOf(item) + 1)) continue;
      // Класс совпадает с классом-исключением из настроек?
      if (nth.config.ignoredBlocks.indexOf(item) + 1) continue;
      // У этого блока отсутствует папка?
      // if (!fileExist(dir.blocks + item)) continue;
      // Добавляем класс в список
      nth.blocksFromHtml.push(item);
    }
    // console.log('---------- Used HTML blocks: ' + nth.blocksFromHtml.join(', '));
    file.contents = new Buffer.from(fileContent);
  }
  this.push(file);
  cb();
}

//
/**
 * Pug-фильтр, выводящий содержимое pug-файла в виде форматированного текста
 */
function filterShowCode(text, options) {
  var lines = text.split('\n');
  var result = '<pre class="code">\n';
  if (typeof(options['first-line']) !== 'undefined') result = result + '<code>' + options['first-line'] + '</code>\n';
  for (var i = 0; i < (lines.length - 1); i++) { // (lines.length - 1) для срезания последней строки (пустая)
    result = result + '<code>' + lines[i].replace(/</gm, '&lt;') + '</code>\n';
  }
  result = result + '</pre>\n';
  result = result.replace(/<code><\/code>/g, '<code>&nbsp;</code>');
  return result;
}

/**
 * Проверка существования файла или папки
 * @param  {string} path      Путь до файла или папки
 * @return {boolean}
 */
function fileExist(filepath) {
  let flag = true;
  try {
    fs.accessSync(filepath, fs.F_OK);
  } catch (e) {
    flag = false;
  }
  return flag;
}

/**
 * Получение всех названий поддиректорий, содержащих файл указанного расширения, совпадающий по имени с поддиректорией
 * @param  {string} ext    Расширение файлов, которое проверяется
 * @return {array}         Массив из имён блоков
 */
function getDirectories(ext) {
  let source = dir.blocks;
  let res = fs.readdirSync(source)
    .filter(item => fs.lstatSync(source + item).isDirectory())
    .filter(item => fileExist(source + item + '/' + item + '.' + ext));
  return res;
}

/**
 * Получение разницы между двумя массивами.
 * @param  {array} a1 Первый массив
 * @param  {array} a2 Второй массив
 * @return {array}    Элементы, которые отличаются
 */
function getArraysDiff(a1, a2) {
  return a1.filter(i => !a2.includes(i)).concat(a2.filter(i => !a1.includes(i)))
}
