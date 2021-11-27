<template>
    <button v-bind="$attrs" @click="dropdown" class="dropdown-button">
        <slot/>
        <svg v-if="!!arrow" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="['feather feather-chevron-down', arrowClass]">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    </button>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "DropdownButton",
    props: {
        arrow: {
            default: true
        },
        arrowClass: {
            default: null
        },
        scrollHas: {
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        dropdown (event) {
            if (this.scrollHas) {
                const obj = event.target;
                const items = obj.closest('.dropdown').querySelector('.dropdown-items');
                let t;
                let scrollTop = (((t = document.documentElement) || (t = document.body.parentNode)) &&
                typeof t.scrollTop == 'number' ? t : document.body).scrollTop;
                let topOffset = items.getBoundingClientRect().top;
                let relativeOffset = topOffset - scrollTop;
                let windowHeight = window.innerHeight;

                Array.from(document.querySelectorAll('.dropdown-items')).forEach(i => {
                    i.classList.remove('bottom-full')
                })

                if (relativeOffset > windowHeight / 2) {
                    items.classList.add("bottom-full");
                }
                else {
                    items.classList.remove("bottom-full");
                }
            }
        }
    },
    created() {

    }
}
</script>

<style scoped>

</style>
