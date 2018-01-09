export default {
    desc: 'Load .css file',
    schemes: [
        {
            desc: 'to <style> tag',
            test: '/\\.css$/',
            use: ['style-loader', 'css-loader']
        }, {
            desc: 'as string',
            test: '/\\.css$/',
            use: ['tostring-loader', 'css-loader']
        }
    ]
}