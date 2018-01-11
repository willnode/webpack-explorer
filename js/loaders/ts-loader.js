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
            detail: 'Compile typescript to javascript before getting loaded. Enable Typescript in .vue using <script lang="ts"> (must enable .vue explicitly)',
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