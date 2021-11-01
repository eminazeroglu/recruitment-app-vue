<template>
    <input
        class="form-element"
        type="text"
        v-float
        v-model="element"
        v-bind="$props"
    >
</template>

<script>
/*
 * Import Components
 * */

import FormMixin from "../../../mixins/FormMixin";

export default {
    name: "FormNumber",
    mixins: [FormMixin]
}
</script>

<style scoped>

</style>
