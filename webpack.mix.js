let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.setPublicPath('vendor');
mix.js('resources/assets/js/page.js', '/featherwebs/mari/src/public/js/dist')
  .js('resources/assets/js/post.js', '/featherwebs/mari/src/public/js/dist')
  .js('resources/assets/js/user.js', '/featherwebs/mari/src/public/js/dist')
  .js('resources/assets/js/menu.js', '/featherwebs/mari/src/public/js/dist')
  .js('resources/assets/js/role.js', '/featherwebs/mari/src/public/js/dist')
  .js('resources/assets/js/post-type.js', '/featherwebs/mari/src/public/js/dist')
  .js('resources/assets/js/setting.js', '/featherwebs/mari/src/public/js/dist')
  .react('resources/assets/js/blocks.jsx', 'public/js');
;
