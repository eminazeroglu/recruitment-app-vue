<template>
    <div class="accordion flex flex-col border border-gray-200 rounded">
        <button class="flex items-center p-4 bg-gray-100 font-medium justify-between text-sm" @click="action">
            <span>{{ label }}</span>
            <span class="flex items-center justify-center w-7 h-7 bg-white border border-gray-200 rounded-full">
                <i class="accordion-icon icon-chevron-right"></i>
            </span>
        </button>
        <div class="accordion-body transition-all" :class="{'accordion-body--open': open}">
            <div class="p-4 border-t border-gray-200">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "AccordionItem",
    props: {
        label: {
            default: null
        },
        open: {
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        action (e) {
            let obj = e.target;
            let parent = obj.closest('.accordion');
            let iconElement = obj.querySelector('.accordion-icon');
            let body = parent.querySelector('.accordion-body');
            if (body.classList.contains('accordion-body--open')) {
                iconElement.classList.remove('icon-chevron-down');
                iconElement.classList.add('icon-chevron-right');
            }
            else {
                iconElement.classList.remove('icon-chevron-right');
                iconElement.classList.add('icon-chevron-down');
            }
            body.classList.toggle('accordion-body--open');
        }
    }
}
</script>

<style scoped>

</style>
