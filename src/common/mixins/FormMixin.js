export default {
    data() {
        return {
            element: null
        }
    },
    watch: {
        element(val) {
            this.$emit('input', val || null);
        },
        '$attrs.value'(val) {
            this.element = val;
        }
    },
    created() {
        if(this.$attrs.value) this.element = this.$attrs.value
    },
}
