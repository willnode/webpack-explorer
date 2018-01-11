module.exports = {
    name: '.ts\t(ts-loader)',
    options: {
        appendTsSuffixTo: ['none', '.vue'],
    },
    schemes: [
        {
            if: 'appendTsSuffixTo',
            is: 'none',
            detail: 'Compile typescript to javascript before getting loaded.',
            depends: ['ts-loader', 'typescript'],

            test: /\.tsx?$/,
            use: ['ts-loader']
        }, {
            if: 'appendTsSuffixTo',
            is: '.vue',
            detail: 'Compile typescript to javascript before getting loaded. Use Typescript in .vue script using <script lang="ts">',
            depends: ['ts-loader', 'typescript'],

            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: /\.vue$/
                }
            }]
        }
    ]
}