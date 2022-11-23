const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: [
        purgecss({
            content: ['./**/*.hbs'],
            defaultExtractor: content => content.match(/[A-Za-z0-9-_:/] +/g) || []
        }),
        require('bootstrap'),
        require('postcss-import')
    ]
}
