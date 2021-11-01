<template>
    <div :class="'col-span-'+col">
        <slot></slot>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "GridCol",
    props: {
        col: {
            default: 12
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
