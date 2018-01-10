<template>
    <div>
        <div class="left">
            <h1 class="hero">Webpack Explorer</h1>
            <span class="hero-desc" title="And don't waste time dangling with docs!">Webpack config template and generator</span>
            <div class="group" id='entry'>
                <h2>Entry</h2>
                <div class="wide" v-for='(e, i) in entry'>
                    <input v-model='entry[i]' placeholder="Add an entry"></input>
                    <button class="rem" v-on:click='entry.splice(i, 1)' tabindex="-1">-</button>
                </div>
                <button class="opt" v-on:click='entry.push("")' tabindex="-1">+</button>
            </div>
            <div class="group" id='output'>
                <h2>Output</h2>
                <input class="wide" v-model='output.filename' placeholder="file name"></input>
                <input class="wide" :class='{ opt: !output.path }' v-model='output.path' placeholder="path"></input>
                <input class="wide" :class='{ opt: !output.publicpath }' v-model='output.publicpath' placeholder="public path"></input>
                <input class="wide" :class='{ opt: !output.library }' v-model='output.library' placeholder="library"></input>
            </div>
            <div class="group" id='loader'>
                <h2>Loader</h2>
                <div id='loader-add' class="opt">
                    <div class="wide">
                        <select v-model='registry.selected'>
                            <option v-for='l in registry.loaders' :value='l'>{{ l.desc }}</option>
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