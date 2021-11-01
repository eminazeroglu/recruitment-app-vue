<template>
    <div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow border border-gray-100">
        <router-link :to="route" class="absolute inset-0 z-10" v-if="route"></router-link>
        <a class="absolute inset-0 z-10" @click="$emit('click', $event)" v-else></a>
        <div class="flex-auto p-4">
            <div class="flex flex-wrap">
                <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 class="text-blueGray-400 uppercase font-bold text-xs" v-if="title"> {{ title }}</h5>
                    <span class="font-semibold text-xl text-blueGray-700" v-if="count">{{ count }}</span>
                </div>
                <div class="relative w-auto pl-4 flex-initial">
                    <div :class="['p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full', iconBg]">
                        <i v-if="icon" :class="icon"></i>
                    </div>
                </div>
            </div>
            <p class="text-sm text-blueGray-400 mt-4" v-if="bottomText || bottomCount || bottomIcon">
                <span class="text-emerald-500 mr-2" v-if="bottomCount || bottomIcon">
                    <i :class="bottomIcon" v-if="bottomIcon"></i>
                    {{ bottomCount }}
                </span>
                <span class="whitespace-nowrap" v-if="bottomText">{{ bottomText }}</span>
            </p>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "StatsBox",
    props: {
        route: {
            default: null
        },
        title: {
            default: 'Title'
        },
        count: {
            default: 0
        },
        iconBg: {
            default: null
        },
        icon: {
            default: null
        },
        bottomText: {
            default: null
        },
        bottomCount: {
            default: null
        },
        bottomIcon: {
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
