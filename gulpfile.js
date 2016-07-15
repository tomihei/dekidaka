var gulp = require("gulp");
var typescript = require("gulp-typescript");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");
var tsConfig = require("./tsconfig.json");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js");
var jade = require('gulp-jade');

gulp.task("server", function () {
    browser({
        server: {
            baseDir: "./public"                       //サーバー起動時のベースディレクトリ
        }
    });
});

gulp.task("sass", function () {
    gulp.src("./src/css/*.scss")             // 対象となるSASSファイルを全部指定
        .pipe(plumber())                        //エラー時にwatchを止めない
        .pipe(sass())                           //SASSのコンパイル
        .pipe(postcss([
          autoprefixer({browsers: '> 3%'})
        ]))                   //CSSのベンダープレフィックス付与を自動化
        .pipe(gulp.dest("./public/"))      //指定ディレクトリにCSS出力
        .pipe(browser.reload({stream: true}));
});

gulp.task('jade', function () {
    gulp.src("./src/html/*.jade")
      .pipe(jade({
        pretty:true
      }))
      .pipe(gulp.dest("./public/"))
      .pipe(browser.reload({stream: true}));
});

/*gulp.task("typescript", function () {
    gulp.src(["./src/cli/ts/*.ts","!./node_modules/**"])              // 対象となるTypeScriptファイルを全部指定
        .pipe(typescript(tsConfig.compilerOptions))
        .pipe(webpack(webpackConfig))   // プロジェクトを渡す事で差分コンパイル
        .pipe(gulp.dest("./public/javascript"))       //指定ディレクトリにJS出力
        .pipe(browser.reload({stream: true}));  //ブラウザを更新
});
*/
gulp.task("typescript", function () {
    gulp.src(["./src/**/*.ts","./src/**/*.tsx"])              // 対象となるTypeScriptファイルを全部指定
        .pipe(typescript(tsConfig))
        .pipe(gulp.dest("./src/js/"))
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest("./public/"))       //指定ディレクトリにJS出力
        .pipe(browser.reload({stream: true}));  //ブラウザを更新
});



gulp.task("default", ["sass", "typescript", "server","jade"], function () {
    gulp.watch("./src/**/*.scss", ["sass"]);
    gulp.watch("./src/**/*.ts", ["typescript"]);
    gulp.watch("./src/**/*.tsx", ["typescript"]);
    gulp.watch("./src/**/*.jade", ["jade"]);
});
