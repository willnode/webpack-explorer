<template>
    <div>
        <div class="left">
            <input type="radio" class='hide' name='hide' id='show-all' checked>
            <label for='show-all'><h1 class="hero">Webpack Explorer</h1></label>
            <span class="hero-name" title="So you don't have to waste time dangling with docs!">Webpack config template and generator</span>
            <label for='entry-hide'>
                <h2>Entry</h2>
            </label>
            <input type="radio" class='hide' name='hide' id='entry-hide'>
            <div class="group" id='entry'>
                <div class="wide" v-for='(e, i) in entry'>
                    <input v-model='entry[i].key' placeholder="Chunkname"></input>
                    <input v-model='entry[i].value' placeholder="Entry path"></input>
                    <button class="rem" v-on:click='entry.splice(i, 1)' tabindex="-1">-</button>
                </div>
                <button class="opt" v-on:click='entry.push({key: "", value: ""})' tabindex="-1">+</button>
            </div>
            <!---->
            <label for='output-hide'>
                <h2>Output</h2>
            </label>
            <input type="radio" class='hide' name='hide' id='output-hide'>
            <div class="group" id='output'>
                <input class="wide" v-model='output.filename' placeholder="file name"></input>
                <input class="wide" :class='{ opt: !output.path }' v-model='output.path' placeholder="path"></input>
                <input class="wide" :class='{ opt: !output.publicPath }' v-model='output.publicPath' placeholder="public path"></input>
                <input class="wide" :class='{ opt: !output.library }' v-model='output.library' placeholder="library"></input>
            </div>
            <!---->
            <label for='loader-hide'>
                <h2>Loader</h2>
            </label>
            <input type="radio" class='hide' name='hide' id='loader-hide'>
            <div class="group" id='loader'>
                <div id='loader-add' class="opt">
                    <div class="wide">
                        <select v-model='registry.selected'>
                            <option v-for='l in registry.loaders' :value='l'>{{ l.name }}</option>
                        </select>
                        <button class="rem" :disabled='!registry.active' v-on:click='loaders.push(registry.active)'>+</button>
                    </div>
                    <div class="setup-wide" v-if='registry.selected' v-html='loader_filter()'>
                    </div>
                    <div class="info" v-if='registry.active'> {{ registry.active.detail }} </div>
                </div>
                <div v-for='(l, i) in loaders' class="wide">
                    <span :title="l.detail">
                        <b>{{ l.test.toString() }}</b> - {{ l.is.toString() }}</span>
                    <button v-on:click='loaders.splice(i, 1)' class="rem">-</button>
                </div>
            </div>
            <!---->
            <label for='plugin-hide'>
                <h2>Plugin</h2>
            </label>
            <input type="radio" class='hide' name='hide' id='plugin-hide'>
            <div class="group" id='plugin'>
                <div id='plugin-add' class="opt">
                    <div class="wide">
                        <select v-model='registry.picked'>
                            <option v-for='l in registry.plugins' :value='l'>{{ l.name }}</option>
                        </select>
                        <button class="rem" :disabled='!registry.candidate' v-on:click='plugins.push(registry.candidate)'>+</button>
                    </div>
                    <div class="setup-wide" v-if='registry.picked' v-html='plugin_filter()'>
                    </div>
                    <div class="info" v-if='registry.candidate'> {{ registry.candidate.detail }} </div>
                </div>
                <div v-for='(l, i) in plugins' class="wide">
                    <span :title="l.detail">
                        <b>{{ l.depends[0] }}</b> - {{ l.is.toString() }}</span>
                    <button v-on:click='plugins.splice(i, 1)' class="rem">-</button>
                </div>
            </div>
        </div>
        <div class="right">
            <h1 class="hero-2">Output</h1>
            <h2>webpack.config.js</h2>
            <pre id='generated' v-html='renderz()' class="hljs"></pre>
            <h2 style="cursor: pointer" v-on:click='registry.yarn=!registry.yarn'> {{ registry.yarn ? 'yarn' : 'npm' }} depedencies</h2>
            <pre id='generated' class="hljs wrap">{{ registry.yarn ? 'yarn add' : 'npm install' }} <span class="hljs-attr npm-link" v-html='depedencies()'></span> {{ registry.yarn ? '--dev' : '--save-dev' }}</pre>
            <h2>case example</h2>
            <pre class="hljs">TODO</pre>
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
    @import 'style';
    @import 'highlighting';
</style>