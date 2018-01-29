<template>
    <div>
        <div class="left">
            <input type="radio" class='hide' name='hide' id='show-all' checked>
            <label for='show-all'>
                <h1 class="hero">Webpack Explorer </h1>
            </label>
            <span class="hero-name group" title="So you don't have to waste time dangling with docs!">Webpack config template and generator</span>
            <!--ENTRY-->
            <label for='entry-hide'>
                <h2>Entry</h2>
                <a class="rem help" href='https:/webpack.js.org/concept/entry' target="_blank">i</a>
            </label>
            <input type="radio" class='hide' name='hide' id='entry-hide'>
            <div class="group" id='entry'>
                <div class="wide" v-for='(e, i) in entry'>
                    <input v-model='entry[i].key' placeholder="Chunkname" title='For multiple entries, chunkname helps identify each entry'></input>
                    <input v-model='entry[i].value' placeholder="Entry path" title='Relative path to the source'></input>
                    <button v-if='i === entry.length - 1' class="rem" v-on:click='entry.push({key: "", value: ""})' tabindex="-1" title="Add new entry">+</button>
                    <button v-if='entry.length &gt; 1' class="rem" v-on:click='entry.splice(i, 1)' tabindex="-1">-</button>
                </div>
            </div>
            <!--OUTPUT-->
            <label for='output-hide'>
                <h2>Output</h2>
                <a class="rem help" href='https:/webpack.js.org/concept/output' target="_blank">i</a>
            </label>
            <input type="radio" class='hide' name='hide' id='output-hide'>
            <div class="group" id='output'>
                <input class="wide" v-model='output.filename' placeholder="file name" title="name of the output. For multiple entries use either [name] [id] [hash] or [chunkhash]"></input>
                <input class="wide" v-model='output.path' placeholder="path" title="absolute path where bundles will be written (here you can write as the relative path)"></input>
                <input class="wide" v-model='output.publicPath' placeholder="public path" title="relative path to external assets. In production this must be written as http://. Must end with slash (/)."></input>
                <!--input class="wide" v-model='output.library' placeholder="library"></input-->
            </div>
            <!--LOADER-->
            <label for='loader-hide'>
                <h2>Loader</h2>
                <a class="rem help" href='https:/webpack.js.org/concept/loaders' target="_blank">i</a>
            </label>
            <input type="radio" class='hide' name='hide' id='loader-hide'>
            <div class="group" id='loader'>
                <div id='loader-add'>
                    <div class="wide">
                        <select v-model='registry.selected' @change='chooseLoader()'>
                            <optgroup :label="g.title" v-for='g in registry.loaderGroups'>
                                <option v-for='l in g.loaders' :value='l'>{{ l.slug }}</option>
                            </optgroup>
                        </select>
                        <a class="rem help" v-if='registry.active' :href='"https://github.com/"+registry.selected.git+"#readme"' target="_blank">?</a>
                        <button class="rem" :disabled='!registry.active' v-on:click='loaders.push(registry.active); registry.selected=registry.active=""'>+</button>
                    </div>
                    <div class="setup-wide" v-if='registry.selected'>
                        <div v-for='(v, k) in registry.selected.options'>
                            <span>{{k}}</span>
                            <select v-if='v.keys' v-model='registry.selected.options[k].value' @change='chooseLoader()'>
                                <option v-for='k in v.keys'>{{k}}</option>
                            </select>
                            <input v-if='typeof v === "number"' type="number" v-model.number='registry.selected.options[k]' @input='chooseLoader()'>
                            <input v-if='typeof v === "string"' type="text" v-model='registry.selected.options[k]' @input='chooseLoader()'>
                            <input v-if='typeof v === "boolean"' type="checkbox" v-model='registry.selected.options[k]' @change='chooseLoader()'>
                        </div>
                    </div>
                    <div v-if='registry.active' class="info">
                        <span>require() with {{ registry.selected.name }} will return</span>
                        <span>
                            <i>{{ registry.active.detail }}</i>
                        </span>
                        <div v-if='registry.active.warn'>
                            <br>
                            <span>NOTE:</span>
                            <span v-html='registry.active.warn'></span>
                        </div>
                        <pre v-html='renderLoader()' class="hljs"></pre>
                    </div>
                </div>
                <div v-for='(l, i) in loaders' class="wide list">
                    <span :title="l.depends">
                        <b>{{ l.test.toString() }}</b> - {{ l.detail }}</span>
                    <button v-on:click='loaders.splice(i, 1)' class="rem">-</button>
                </div>
            </div>
            <!--PLUGIN-->
            <label for='plugin-hide'>
                <h2>Plugin</h2>
                <a class="rem help" href='https:/webpack.js.org/concept/plugins' target="_blank">i</a>
            </label>
            <input type="radio" class='hide' name='hide' id='plugin-hide'>
            <div class="group" id='plugin'>
                <div id='plugin-add'>
                    <div class="wide">
                        <select v-model='registry.picked' @change='choosePlugin()'>
                            <option v-for='l in registry.plugins' :value='l'>{{ l.name }}</option>
                        </select>
                        <button class="rem" :disabled='!registry.candidate' v-on:click='plugins.push(registry.candidate); registry.picked=registry.candidate=""'>+</button>
                    </div>
                    <div class="setup-wide" v-if='registry.picked'>
                        <div v-for='(v, k) in registry.picked.options'>
                            <span>{{k}}</span>
                            <select v-if='v.keys' v-model='registry.picked.options[k].value' @change='choosePlugin()'>
                                <option v-for='k in v.keys'>{{k}}</option>
                            </select>
                            <input v-if='typeof v === "number"' type="number" v-model.number='registry.picked.options[k]' @input='choosePlugin()'>
                            <input v-if='typeof v === "string"' type="text" v-model='registry.picked.options[k]' @input='choosePlugin()'>
                            <input v-if='typeof v === "boolean"' type="checkbox" v-model='registry.picked.options[k]' @change='choosePlugin()'>
                        </div>
                    </div>
                    <div v-if='registry.candidate' class="info">
                        <span>Use {{ registry.picked.name }} to</span>
                        <span>
                            <i>{{ registry.candidate.detail }}</i>
                        </span>
                        <pre v-html='renderPlugin()' class="hljs"></pre>
                    </div>
                </div>
                <div v-for='(l, i) in plugins' class="wide list">
                    <span :title="l.depends">
                        <b>{{ l.depends[0] }}</b> - {{ l.detail }}</span>
                    <button v-on:click='plugins.splice(i, 1)' class="rem">-</button>
                </div>
            </div>
        </div>
        <div class="right">
            <h1 class="hero-2">Output</h1>
            <h2>webpack.config.js</h2>
            <pre id='generated' v-html='renderz()' class="hljs"></pre>
            <h2 style="cursor: pointer" v-on:click='registry.yarn=!registry.yarn'> {{ registry.yarn ? 'yarn' : 'npm' }} depedencies</h2>
            <pre id='generated' class="hljs wrap">{{ registry.yarn ? 'yarn add' : 'npm install' }} <span class="hljs-attr npm-link" v-html='depedencies()'></span><span style="white-space:nowrap"> {{ registry.yarn ? '--dev' : '--save-dev' }}</span></pre>
            <!--h2>case example</h2>
            <pre class="hljs">TODO</pre-->
        </div>
        <the-cat/>
    </div>
</template>

<script>
    import data from '../js/data';
    import cat from './octocat.vue';
    export default {
        components: {
            'the-cat': cat,
        },
        data: function () {
            return data;
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Lato:400,400i,700');
    @import '../node_modules/highlight.js/styles/vs2015.css';
    @import 'style';
</style>