<template>
    <div :class="'w-full grid gap-'+space+' grid-cols-'+cols">
        <slot></slot>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "Grid",
    props: {
        cols: {
            default: 1
        },
        space: {
            default: 5
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
