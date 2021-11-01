<template>
    <router-link v-if="route" :to="route" :class="customClass" v-bind="$props">
        <i :class="['button__icon', icon]"></i>
        <slot/>
        <span v-if="count" class="button__count">{{ count }}</span>
    </router-link>
    <button v-else :class="customClass" @click="buttonClick" v-bind="$props">
        <svg v-if="isLoading && $attrs.type === 'submit'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin-right: 5px; background: rgba(255, 255, 255, 0); display: block; shape-rendering: auto;" width="23px" height="23px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="7" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.641025641025641s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle>
        </svg>
        <i :class="['button__icon', icon]" v-if="icon"></i>
        <slot/>
        <span v-if="count" class="button__count">{{ count }}</span>
    </button>
</template>

<script>
/*
 * Import Components
 * */
import {mapState, mapActions} from 'vuex'

export default {
    name: "AppButton",
    props: {
        property: {
            default: 'light'
        },
        route: {
            default: null
        },
        full: {
            default: false
        },
        sm: {
            default: false
        },
        icon: {
            default: null
        },
        iconPosition: {
            default: 'left'
        },
        count: {
            default: null
        }
    },
    computed: {
        ...mapState('AppStore', ['isLoading']),
        customClass() {
            let className = 'button button--' + this.property;
            if (this.full) className += ' button--full';
            if (this.iconPosition === 'right') className += ' button--icon-right';
            if (this.iconPosition === 'left') className += ' button--icon-left';
            if (this.iconPosition === 'top') className += ' button--icon-top';
            if (this.sm) className += ' button--sm';
            return className;
        }
    },
    data() {
        return {}
    },
    methods: {
        ...mapActions('AppStore', ['setLoading']),
        buttonClick(event) {
            this.$emit('click', event);
            if (this.$attrs.type === 'submit') {
                this.setLoading(true);
            }
        }
    }
}
</script>

<style scoped>
    @import "AppButton.css";
</style>
