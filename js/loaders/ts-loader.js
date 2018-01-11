export default  {
    name: 'ts-loader',
    options: {
        appendTsSuffixTo: { keys: ['none', '.vue'], value: 'none' },
    },
    scheme: (op) => {
        var vue = op.appendTsSuffixTo === '.vue';
        return {
            detail: 'compile .ts to javascript before getting required' +
                (vue ? ' and enable Typescript in .vue using <script lang="ts"> (must enable .vue explicitly)' : ''),
            depends: ['ts-loader', 'typescript'],

            test: /\.tsx?$/,
            use: [vue ? {
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: /\.vue$/
                }
            } : 'ts-loader']
        }
    }
}