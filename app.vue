<template>
    <div>
        <div class="left">
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
                <input class="wide" v-model='output.filename' placeholder="file sname"></input>
                <input class="wide" v-bind:class='{ opt: !output.path }' v-model='output.path' placeholder="path"></input>
                <input class="wide" v-bind:class='{ opt: !output.publicpath }' v-model='output.publicpath' placeholder="public path"></input>
                <input class="wide" v-bind:class='{ opt: !output.library }' v-model='output.library' placeholder="library"></input>
            </div>
            <div class="group" id='loader'>
                <h2>Loader</h2>
                <div class="wide">
                    <select v-model='registry.selected'>
                        <option v-for='l in registry.loaders' v-bind:value='l'>{{ l.desc }}</option>
                    </select>
                    <select v-bind:disabled='!registry.selected' v-model='registry.active'>
                        <option v-for='l in registry.selected.schemes' v-bind:value='l'>{{ l.desc }}</option>
                    </select>
                    <button class="rem" v-bind:disabled='!registry.active' v-on:click='loaders.push(registry.active)'>+</button>
                </div>
                <div class="info" v-if='registry.active'> {{ registry.active.detail }} </div>
                <div v-for='(l, i) in loaders' class="wide">
                    <span v-bind:title="l.detail">
                        <b>{{ l.test.toString() }}</b> - {{ l.desc }}</span>
                    <button v-on:click='loaders.splice(i, 1)' class="rem">-</button>
                </div>
            </div>
        </div>
        <div class="right">
            <h2>webpack.config.js</h2>
            <pre id='generated' v-html='renderz()' class="hljs"></pre>
            <h2 style="cursor: pointer" v-on:click='registry.yarn=!registry.yarn'> {{ registry.yarn ? 'yarn' : 'npm' }} depedencies</h2>
            <pre id='generated' class="hljs wrap">{{ registry.yarn ? 'yarn add' : 'npm install' }} <span class="hljs-attr">{{ depedencies() }}</span> {{ registry.yarn ? '--dev' : '--save-dev' }}</pre>
            <h2>case example</h2>
            <pre class="hljs">TODO</pre>
        </div>
    </div>
</template>

<script>
    import Data from './js/data';
    export default {
        data: function () {
            return  Data;
        }
    }
</script>