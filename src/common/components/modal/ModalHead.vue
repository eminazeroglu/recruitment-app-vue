<template>
    <div class="modal-header" v-bind="$props">
        <slot/>
        <button type="button" @click="modalClose" class="modal-close">
            <i class="icon icon-cancel"></i>
        </button>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "ModalHead",
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
