
export default function () {
    this.loaders = [], // modules as filename located in our /modules/
    this.plugins = [], // plugins as filename located in our /plugins/
    this.options = [], // advanced options as filename located in our /options/
    this.entry = ['main.js'], // entries
    this.output = {
        path: '', // out directory
        filename: 'bundle.js', // out bundle
        publicPath: '', // out html asset directory
        library: '', // out as module name
    }
}
