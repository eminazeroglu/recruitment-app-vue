import Vue from 'vue'
import Directives from '../common/directives/index'

Object.keys(Directives).forEach(async i => {
    await Vue.use(Directives[i])
})
