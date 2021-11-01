<template>
    <textarea
        class="form-element"
        v-model="element"
        v-bind="$props"
    ></textarea>
</template>

<script>
/*
 * Import Components
 * */

import FormMixin from "../../../mixins/FormMixin";

export default {
    name: "FormTextArea",
    mixins: [FormMixin]
}
</script>

<style scoped>

</style>
