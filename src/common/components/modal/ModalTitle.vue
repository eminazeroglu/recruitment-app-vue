<template>
    <h5 class="modal-title" v-bind="$props">
        <slot/>
    </h5>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "ModalTitle",
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
