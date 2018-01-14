<template>
    <div>
        <div class="left">
            <input type="radio" class='hide' name='hide' id='show-all' checked>
            <label for='show-all'>
                <h1 class="hero">Webpack Explorer</h1>
            </label>
            <span class="hero-name group" title="So you don't have to waste time dangling with docs!">Webpack config template and generator</span>
            <!--ENTRY-->
            <label for='entry-hide'>
                <h2>Entry</h2>
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
            </label>
            <input type="radio" class='hide' name='hide' id='loader-hide'>
            <div class="group" id='loader'>
                <div id='loader-add'>
                    <div class="wide">
                        <select v-model='registry.selected' @change='loader_choose()'>
                            <option v-for='l in registry.loaders' :value='l'>{{ l.name }}</option>
                        </select>
                        <button class="rem" :disabled='!registry.active' v-on:click='loaders.push(registry.active); registry.selected=registry.active=""'>+</button>
                    </div>
                    <div class="setup-wide" v-if='registry.selected'>
                        <div v-for='(v, k) in registry.selected.options'>
                            <span>{{k}}</span>
                            <select v-if='v.keys' v-model='registry.selected.options[k].value' @change='loader_choose()'>
                                <option v-for='k in v.keys'>{{k}}</option>
                            </select>
                            <input v-if='typeof v === "number"' type="number" v-model.number='registry.selected.options[k]' @change='plugin_choose()'>
                            <input v-if='typeof v === "string"' type="text" v-model='registry.selected.options[k]' @change='loader_choose()'>
                            <input v-if='typeof v === "boolean"' type="checkbox" v-model='registry.selected.options[k]' @change='loader_choose()'>
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
                        <pre v-html='loader_renderz()' class="hljs"></pre>
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
            </label>
            <input type="radio" class='hide' name='hide' id='plugin-hide'>
            <div class="group" id='plugin'>
                <div id='plugin-add'>
                    <div class="wide">
                        <select v-model='registry.picked' @change='plugin_choose()'>
                            <option v-for='l in registry.plugins' :value='l'>{{ l.name }}</option>
                        </select>
                        <button class="rem" :disabled='!registry.candidate' v-on:click='plugins.push(registry.candidate); registry.picked=registry.candidate=""'>+</button>
                    </div>
                    <div class="setup-wide" v-if='registry.picked'>
                        <div v-for='(v, k) in registry.picked.options'>
                            <span>{{k}}</span>
                            <select v-if='v.keys' v-model='registry.picked.options[k].value' @change='plugin_choose()'>
                                <option v-for='k in v.keys'>{{k}}</option>
                            </select>
                            <input v-if='typeof v === "number"' type="number" v-model.number='registry.picked.options[k]' @change='plugin_choose()'>
                            <input v-if='typeof v === "string"' type="text" v-model='registry.picked.options[k]' @change='plugin_choose()'>
                            <input v-if='typeof v === "boolean"' type="checkbox" v-model='registry.picked.options[k]' @change='plugin_choose()'>
                        </div>
                    </div>
                    <div v-if='registry.candidate' class="info">
                        <span>Use {{ registry.picked.name }} to</span>
                        <span>
                            <i>{{ registry.candidate.detail }}</i>
                        </span>
                        <pre v-html='plugin_renderz()' class="hljs"></pre>
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
        <div>
            <a target="_blank" href="https://github.com/willnode/webpack-explorer" class="github-corner" title="View source (and explanation) on Github">
                <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#70B7FD; color:#fff; position: absolute; top: 0; border: 0; right: 0;"
                    aria-hidden="true">
                    <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                    <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                        fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                    <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                        fill="currentColor" class="octo-body"></path>
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
    import Data from './js/data';
    export default {
        data: function () {
            return Data;
        }
    }
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Lato:400,400i,700');
    @import 'node_modules/highlight.js/styles/vs2015.css';
    @import 'style';

    .github-corner:hover .octo-arm {
        animation: octocat-wave 560ms ease-in-out
    }

    @keyframes octocat-wave {
        0%,
        100% {
            transform: rotate(0)
        }
        20%,
        60% {
            transform: rotate(-25deg)
        }
        40%,
        80% {
            transform: rotate(10deg)
        }
    }

    @media (max-width:500px) {
        .github-corner:hover .octo-arm {
            animation: none
        }
        .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out
        }
    }
</style>