<template>
    <label class="form-label inline-flex cursor-pointer">
        <div class="checkbox">
            <input type="checkbox" :value="true" class="hidden" @change="$emit('change', $event.target.value)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check svg">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <span class="text">
            <slot/>
        </span>
    </label>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "FormCheckbox",
    data() {
        return {
            element: null
        }
    },
    watch: {
        element(val) {
            this.$emit('input', val || null);
        }
    },
}
</script>

<style scoped>

</style>
