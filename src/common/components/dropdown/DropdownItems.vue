<template>
    <nav tabindex="0" v-bind="$props" :class="'dropdown-items '+position+'-0'">
        <div :class="titleClass" class="flex text-sm p-3" v-if="$slots.title">
            <slot name="title" />
        </div>
        <ul class="divide-y">
            <slot/>
        </ul>
    </nav>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "DropdownItems",
    props: {
        position: {
            default: 'right'
        },
        titleClass: {
            default: null
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
