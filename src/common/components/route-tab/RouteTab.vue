<template>
    <div class="route-tab" ref="RouteTab">
        <ul class="route-tab__nav" :style="{'grid-template-columns': `repeat(${limit}, minmax(0, 1fr))`}">
            <li
                :key="'route-tab' + i.path"
                v-for="(i, index) in customItems.limit(limit)"
                :title="i.title"
                class="route-tab__link"
                :class="{'route-tab__link--active': i.path === $route.path}"
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
                        :class="{'route-tab__dropdown__li--active': i.path === $route.path}"
                    >
                        <router-link
                            :to="{path: i.path}"
                            class="route-tab__dropdown__item"
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
            </nav>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */
import {mapState} from 'vuex'

export default {
    name: "RouteTab",
    data() {
        return {
            items: [],
            limit: 5
        }
    },
    watch: {
        $route(val) {
            this.setItem(val);
        },
        routeTabCurrent(val) {
           if (val) {
               this.setParamsItem(val)
           }
        },
        routeTabClose(val) {
            if (val) {
                this.removeItem(val)
            }
        }
    },
    computed: {
        ...mapState('RouteTabStore', ['routeTabCurrent', 'routeTabClose']),
        customItems() {
            return this.items.sort((a, b) => {
                return b.time - a.time
            });
        }
    },
    created() {
        this.initialItem();
        this.calculateLimit();
        this.windowResize();
    },
    methods: {
        /*
         * Calculate Limit
         * */
        calculateLimit() {
            const screen = this.currentScreen();
            if (screen.md.status) this.limit = 5
            if (screen.lg.status) this.limit = 8
            if (screen.xl.status) this.limit = 11
        },
        /*
         * Window Resize
         * */
        windowResize() {
            window.onresize = () => {
                this.calculateLimit()
            }
        },
        /*
         * Set Session
         * */
        setSession() {
            sessionStorage.routeTab = JSON.stringify(this.items);
        },
        /*
        * Set Params Item
        * */
        setParamsItem(item = {}) {
            if (item.path) {
                const index = this.items.findIndex(i => i.path === item.path);
                if (index >= 0 && this.items[index] && this.items[index].title !== item.title) {
                    this.items[index].title = item.title;
                    this.setSession();
                    this.$forceUpdate();
                }
            }
        },
        /*
         * Set Object
         * */
        setObject(item = {}) {
            const meta = {...item.meta};
            let title = item.title ? item.title : this.translate(meta.title);
            delete meta.title;
            return {
                path: item.path,
                name: item.name,
                time: item.time,
                title,
                ...meta
            }
        },
        /*
         * Redirect
         * */
        redirect(item = {}) {
            const l = this.items.filter(i => i.time > item.time).pop();
            const r = this.items.filter(i => i.time < item.time).shift();
            if (this.$route.path === item.path) {
                if (l && l.path && this.$route.path !== l.path) this.$router.push(l.path);
                else if (r && r.path && this.$route.path !== r.path) this.$router.push(r.path);
                else this.$router.push('/')
            }
        },
        /*
         * Initial Item
         * */
        initialItem() {
            try {
                const sessionItems = sessionStorage.routeTab && JSON.parse(sessionStorage.routeTab) ? JSON.parse(sessionStorage.routeTab) : [];
                if (sessionItems.length)
                    this.items = sessionItems;
                else
                    this.items.push(this.setObject({time: new Date().getTime(), ...this.$route}));
            }
            catch (e) {

            }
        },
        /*
         * Set Item
         * */
        setItem(item) {
            const index = this.items.findIndex(i => i.path === item.path);
            if (index >= 0) this.items[index] = this.setObject({time: this.items[index].time || new Date().getTime(), ...item})
            else this.items.push(this.setObject({time: new Date().getTime(), ...item}));
            this.setSession();
        },
        /*
         * Remove Item
         * */
        removeItem(item) {
            this.items = this.items.filter(i => i.path !== item.path);
            this.setSession();
            this.redirect(item);
        }
    }
}
</script>

<style scoped>
@import "./RouteTab.css";
</style>
