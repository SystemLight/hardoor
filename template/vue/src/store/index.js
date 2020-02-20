import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const moduleA = {
    state: {},
    mutations: {},
    actions: {},
    getters: {}
};

const moduleB = {
    state: {},
    mutations: {},
    actions: {}
};


export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        moduleA,
        moduleB
    }
})
