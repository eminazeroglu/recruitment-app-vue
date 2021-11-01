import Vue from "vue";

const eventBus = new Vue()

Vue.use({
    install(Vue, options = null) {
        Vue.eventBus = eventBus;
        Vue.prototype.$eventBus = eventBus;
    }
})
