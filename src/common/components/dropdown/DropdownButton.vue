<template>
    <button v-bind="$props" class="dropdown-button">
        <slot/>
        <svg v-if="!!arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="['feather feather-chevron-down', arrowClass]">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    </button>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "DropdownButton",
    props: {
        arrow: {
            default: true
        },
        arrowClass: {
            default: null
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
