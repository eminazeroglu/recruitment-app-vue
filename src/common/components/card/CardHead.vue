<template>
    <div class="flex items-center justify-between bg-gray-100 border-b border-gray-200 py-3 px-4">
        <h5 class="font-medium" v-html="title"></h5>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "CardHead",
    props: {
        title: {
            default: null
        }
    }
}
</script>

<style scoped>

</style>
