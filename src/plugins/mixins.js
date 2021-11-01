import Vue from 'vue'
import GlobalMixin from "../common/mixins/GlobalMixin";
import Mixins from '../common/mixins/index'

Vue.mixin(GlobalMixin)

Object.keys(Mixins).forEach(async i => {
    await Vue.mixin(Mixins[i])
})
