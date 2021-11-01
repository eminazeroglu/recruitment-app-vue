<template>
    <DxColorBox
        v-bind="$props"
        v-model="element"
    />
</template>

<script>
/*
 * Import Components
 * */

import FormMixin from "../../../mixins/FormMixin";
import DxColorBox from 'devextreme-vue/color-box'

export default {
    name: "FormColor",
    mixins: [FormMixin],
    components: {
        DxColorBox
    }
}
</script>

<style scoped>

</style>
