<template>
    <li class="dropdown-li">
        <router-link :to="route" v-if="route" :class="className">
            <slot/>
        </router-link>
        <a :class="className" v-bind="$props" @click="$emit('click', $event)" v-else>
            <slot/>
        </a>
    </li>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "DropdownItem",
    props: {
        route: {
            default: null
        },
        href: {
            default: null
        },
        target: {
            default: null
        }
    },
    data() {
        return {
            className: 'dropdown-item'
        }
    }
}
</script>

<style scoped>

</style>
