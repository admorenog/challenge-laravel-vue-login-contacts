const mix = require('laravel-mix');

mix
    .sourceMaps(false)
    .js('resources/js/app.js', 'public/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css');
