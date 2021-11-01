<template>
    <div class="modal-body" v-bind="$props">
        <slot/>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "ModalBody",
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
