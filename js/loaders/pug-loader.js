import { is, allFalsy, ofIndex } from '../toolkit';

export default {
    name: 'pug-loader',
    options: {
        jade: false,
    },
    scheme: (op) => {
        return {
            detail: 'template function from .pug' + is(op.jade, ' or .jade'),
            depends: ['pug-loader'],

            test: op.jade ? /\.(pug|jade)$/ : /\.pug$/,
            use: ['pug-loader']
        }
    }
}