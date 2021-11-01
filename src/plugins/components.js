import Vue from 'vue'
import Component from "../common/components/index"

Object.keys(Component).forEach(async i => {
    await Vue.component(i,  Component[i])
})

