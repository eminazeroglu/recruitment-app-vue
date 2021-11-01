<template>
    <span :class="'badge badge--' + property">
        <slot/>
    </span>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "Badge",
    props: {
        property: {
            default: 'gray'
        }
    },
    data() {
        return {}
    },
}
</script>

<style scoped>
@import "./Badge.css";
</style>
