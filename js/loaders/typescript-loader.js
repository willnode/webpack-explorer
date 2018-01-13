export default  {
    name: 'ts-loader',
    slug: 'Typescript',
    options: {
        appendTsSuffixTo: { keys: ['none', '.vue'], value: 'none' },
    },
    scheme: (op) => {
        var vue = op.appendTsSuffixTo.value === '.vue';
        return {
            detail: 'compile .ts to javascript before getting required' +
                (vue ? ' and enable Typescript in .vue using <script lang="ts">' : ''),
            warn: vue ? 'must add vue-loader explicitly' : undefined,
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