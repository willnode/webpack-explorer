// two distict loader yet same popularity? This will going difficult.....

import { is, ofIndex } from '../toolkit'

export default {
    name: 'typescript-loader',
    slug: 'Typescript',
    options: {
        loader: { keys: ['ts-loader', 'awesome-typescript-loader'], value: 'ts-loader' },
        babel: { keys: ['none', 'env', 'env + react'], value: 'none' },
        transpileOnly: false,
        vue: false,
    },
    scheme: (op) => {
        var babel = ofIndex(op.babel);
        var dets = 'transpiled javascript from typescript' +
            is(babel, ` and enable babel ${op.babel.value} compiler`) +
            is(op.vue, ' and enable Typescript in .vue using <script lang="ts">') +
            is(op.transpileOnly, ' with type-checking disabled (favor to speed)');
        var deps = [op.loader.value, 'typescript']
            .concat(babel > 0 && ['babel-loader', 'babel-core', 'babel-preset-env'])
            .concat(babel > 1 && ['babel-preset-react']);
        var test = babel === 2 ? /\.tsx?$/ : /\.ts$/;

        if (op.loader.value === 'ts-loader') {
            return {
                detail: dets, depends: deps, test: test,
                warn: op.vue ? 'don\'t forget to add vue-loader' : (babel ? 'may need to setup .babelrc separately' : undefined),
                use: [(op.vue | op.transpileOnly | babel) ? {
                    loader: op.babel ? 'babel-loader!ts-loader' : 'ts-loader',
                    options: (op.vue | op.transpileOnly) ? {
                        appendTsSuffixTo: op.vue ? /\.vue$/ : undefined,
                        transpileOnly: op.transpileOnly || undefined,
                    } : undefined
                } : 'ts-loader']
            }
        } else {
            return {
                detail: dets, depends: deps, test: test,
                warn: op.vue ? 'vue is not <a href="https://github.com/s-panferov/awesome-typescript-loader/issues/356" target="_blank">implemented in ATL yet</a>' : undefined,
                use: [(op.vue | op.transpileOnly | babel) ? {
                    loader: 'awesome-typescript-loader',
                    options: (babel | op.transpileOnly) ? {
                        useBabel: babel > 0 || undefined,
                        babelOptions: babel > 0 ? {
                            babelrc: false,
                            presets: babel === 1 ? ['env'] : ['env', 'react']
                        } : undefined,
                        transpileOnly: op.transpileOnly || undefined,
                    } : undefined
                } : 'awesome-typescript-loader']
            }
        }
    }
}