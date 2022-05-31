<template>
    <div class="flex flex-col h-full pb-10">
        <div class="route-tab" ref="RouteTab">
            <ul class="route-tab__contextmenu" ref="routeTabContextmenu" v-outside="contextmenuOutSide">
                <li
                    class="route-tab__contextmenu__item"
                    v-for="i in contextmenuItems"
                    @click="contextMenuAction(i)"
                >
                    <span>{{ i.name }}</span>
                </li>
            </ul>
            <ul class="route-tab__nav" :style="{'grid-template-columns': `repeat(${limit}, minmax(0, 1fr))`}">
                <li
                    :key="'route-tab' + i.path"
                    v-for="(i, index) in customItems.limit(limit)"
                    :title="i.title"
                    class="route-tab__link"
                    :class="{'route-tab__link--active': i.path === $route.path}"
                    @contextmenu="contextmenu(i, $event)"
                >
                    <router-link
                        tag="span"
                        :to="{path: i.path}"
                        class="route-tab__link__inner"
                    >
                        <svg v-if="!i.title" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="fill: currentColor" width="1.5rem" height="1.5rem" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <circle cx="50" cy="50" fill="none" style="stroke: currentColor" stroke-width="7" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.641025641025641s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                            </circle>
                        </svg>
                        <i :class="'route-tab__link__icon ' + i.icon" v-else-if="i.icon"></i>
                        <span class="route-tab__link__text">{{ i.title || '......' }}</span>
                    </router-link>
                    <span class="route-tab__link__arrow" v-if="customItems.length > 1" @click="removeItem(i)"></span>
                </li>
            </ul>

            <div class="route-tab__dropdown" v-if="customItems.length > limit">
                <button class="route-tab__dropdown__button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <nav tabindex="0" class="route-tab__dropdown__items">
                    <ul class="route-tab__dropdown__ul">
                        <li
                            class="route-tab__dropdown__li"
                            v-for="i in customItems.skip(limit)"
                            :key="'route-tab' + i.path"
                            @contextmenu="contextmenu(i, $event)"
                            :class="{'route-tab__dropdown__li--active': i.path === $route.path}"
                        >
                            <a
                                class="route-tab__dropdown__item"
                                @click="dropdownItem(i)"
                            >
                                <svg v-if="!i.title" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="fill: currentColor" width="1.5rem" height="1.5rem" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                                    <circle cx="50" cy="50" fill="none" style="stroke: currentColor" stroke-width="7" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
                                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.641025641025641s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                                    </circle>
                                </svg>
                                <i :class="'route-tab__link__icon ' + i.icon" v-else-if="i.icon"></i>
                                <span class="route-tab__link__text">{{ i.title || '......' }}</span>
                            </a>
                            <span class="route-tab__link__arrow" v-if="customItems.length > 1" @click="removeItem(i)"></span>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>

        <div class="pb-20 pt-5 px-6 overflow-y-auto">

            <transition name="route-tab__fade">
                <keep-alive v-if="renderComponent && alive">
                    <router-view :key="$route.fullPath"/>
                </keep-alive>
                <router-view v-else-if="renderComponent && !alive" :key="$route.fullPath"/>
            </transition>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */
import RouteTabMainMixin from "./RouteTabMainMixin";

export default {
    name: "RouteTab",
    mixins: [RouteTabMainMixin],
    props: {
        alive: {
            default: false
        }
    },
}
</script>

<style scoped>
@import "./RouteTab.css";
</style>
