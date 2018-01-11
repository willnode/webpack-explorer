// this file has 4*2*2 = 16 variants! Keep the DRY!

var files = ['images', 'audio and videos', 'document', 'data'];
var tests = [/\.(gif|jpe?g|png|svg)/, /\.(wav|mp3|mp4|mkv|webm)/,
    /\.(txt|md|pdf|rtf|docx|xlsx|pptx)/, /\.(raw|bin|zip|rar|json|ya?ml|csv)/]
var names = ['[hash].[ext]', '[path][name].[ext]'];

module.exports = {
    name: 'file\t(file-loader)',
    options: {
        files: files,
        name: names,
        emitFile: true,
    },
    schemes: (() => {
        var bools = [false, true];
        var schemes = [];
        for (var a = 0; a < files.length; a++)
            for (var b = 0; b < names.length; b++)
                for (var c of bools) {
                    schemes.push({
                        if: ['files', 'name', 'emitFile'],
                        is: [files[a], names[b], c],
                        detail: 'Retrieve path of loaded ' + files[a] + (b === 1 ? ' with custom format [path][name].[ext]' : '')
                            + (!c ? ' without emitting to publicPath' : ''),

                        depends: ['file-loader'],
                        test: tests[a],

                        use: [c ? 'file-loader' : {
                            loader: 'file-loader',
                            options: {
                                emitFile: false
                            }
                        }]
                    })
                }
        return schemes;
    })()

}