<template>
    <div
        class="form-element items-center flex"
        v-bind="$props"
    >
        <slot></slot>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "FormRead",
}
</script>

<style scoped>

</style>
