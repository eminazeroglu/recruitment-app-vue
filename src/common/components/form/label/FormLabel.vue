<template>
    <label v-bind="$props" class="form-label">
        <slot/>
    </label>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "FormLabel",
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
