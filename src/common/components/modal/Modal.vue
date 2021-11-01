<template>
    <div class="modal" v-bind="$props" @click="closeModal">
        <div :class="['modal-box modal-box--' + size, modalBoxClass]" :style="modalBoxStyle">
            <slot/>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "Modal",
    props: {
        size: {
            default: 'md'
        },
        bgStatic: {
            default: false
        },
        modalBoxClass: {
            default: null
        },
        modalBoxStyle: {
            default: null
        }
    },
    data() {
        return {}
    },
    methods: {
        closeModal(event) {
            if (event.target.classList.contains('modal-open') && !this.bgStatic) {
                this.modalClose(event)
            }
        }
    }
}
</script>

<style scoped>
@import "./Modal.css";
</style>
