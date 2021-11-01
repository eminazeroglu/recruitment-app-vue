<template>
    <input-tag
        input-class="form-element"
        v-bind="$props"
        v-model="element"
    />
</template>

<script>
/*
 * Import Components
 * */
import InputTag from 'vue-input-tag'
import FormMixin from "../../../mixins/FormMixin";

export default {
    name: "FormTag",
    components: {
        InputTag
    },
    mixins: [FormMixin],
    data() {
        return {
            element: []
        }
    },
}
</script>

<style scoped>

</style>
