<template>
    <div :class="'alert-box ' + (property ? 'alert-box--' + property : '')">
        <div class="alert-box__icon" v-if="icon">
            <i :class="'icon ' + icon"></i>
        </div>
        <div class="alert-box__text">
            <slot/>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "Alert",
    props: {
        property: {
            default: null
        },
        icon: {
            default: null
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped>
@import "./Alert.css";
</style>
