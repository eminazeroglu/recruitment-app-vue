<template>
    <div class="h-full z-50 bg-center bg-no-repeat bg-cover" style="background-image: url('https://images.unsplash.com/photo-1572021335469-31706a17aaef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')">
        <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div class="h-full relative">
            <slot/>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "AppLayoutAuth",
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
