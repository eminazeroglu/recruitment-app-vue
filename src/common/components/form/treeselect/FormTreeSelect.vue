<template>
    <TreeSelect
        v-bind="$attrs"
        :options="options"
        :normalizer="normalizer"
        :clearable="clearable"
        v-model="element"
        @input="$emit('select', $event)"
    />
</template>

<script>
/*
 * Import Components
 * */
import TreeSelect from '@riophae/vue-treeselect'
import FormMixin from "../../../mixins/FormMixin";

export default {
    name: "FormTreeSelect",
    props: {
        options: {
            default: []
        },
        clearable: {
            default: true
        }
    },
    components: {
        TreeSelect
    },
    mixins: [FormMixin],
    data() {
        return {
            element: null,
            normalizer(item) {
                return {
                    id: this.$attrs.valueExpr ? item[this.$attrs.valueExpr] : item.id,
                    label: this.$attrs.displayExpr ? item[this.$attrs.displayExpr] : item.name,
                    children: this.$attrs.childrenExpr ? item[this.$attrs.childrenExpr] : item.children,
                }
            },
        }
    },
}
</script>

<style scoped>
    @import "~@riophae/vue-treeselect/dist/vue-treeselect.min.css";
</style>
