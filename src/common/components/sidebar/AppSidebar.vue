<template>
    <section class="sidebar">
        <div class="h-14 flex items-center px-6 flex-shrink-0">
            <img :src="photos.admin_logo" class="w-40" alt="">
        </div>
        <div class="h-full overflow-y-auto">
            <perfect-scrollbar>
                <ul class="sidebar-navbar">
                    <li v-for="(menu, menuIndex) in sidebars"
                        :key="menuIndex"
                        v-if="menu.can"
                        :data-type="menu.children && menu.children.find(i => i.route === $route.name) ? 'open' : ''"
                    >
                        <router-link :to="{name: menu.route}" :class="{'active': menu.route === $route.name }" v-if="!menu.children && menu.sidebar">
                            <span class="inner">
                                <i :class="'icon ' + menu.icon"></i>
                                <span class="text">
                                    {{ menu.label }}
                                </span>
                            </span>
                            <i class="arrow icon-chevron-down" v-if="menu.children && menu.children.length && menu.sidebar"></i>
                        </router-link>
                        <a v-else @click="openMenu($event)">
                        <span class="inner">
                            <i :class="'icon ' + menu.icon"></i>
                            <span class="text">
                                {{ menu.label }}
                            </span>
                        </span>
                            <i class="arrow"
                               :class="{
                                'icon-chevron-right': menu.children && !menu.children.find(i => i.route === $route.name),
                                'icon-chevron-down': menu.children && menu.children.find(i => i.route === $route.name)
                            }"
                               v-if="menu.children && menu.children.length">
                            </i>
                        </a>
                        <ul v-if="menu.children && menu.children.length"
                            :class="{
                                'open': menu.children && menu.children.find(i => i.route === $route.name)
                            }"
                        >
                            <li v-for="(subMenu, subIndex) in menu.children" :key="subIndex" v-if="subMenu.can">
                                <router-link :to="{name: subMenu.route}" :class="{'active': subMenu.route === $route.name }">
                                <span class="inner">
                                    <i :class="'icon ' + subMenu.icon"></i>
                                    <span class="text">
                                        {{ subMenu.label }}
                                    </span>
                                </span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </perfect-scrollbar>
        </div>
        <div class="h-14 flex flex-shrink-0 items-center px-6 text-white justify-center">
            version 1.0.1
        </div>
    </section>
</template>

<script>
/*
 * Import Components
 * */
import {mapActions} from 'vuex';
import {routers} from "../../../router/modules";

export default {
    name: "AppSidebar",
    data() {
        return {
            menus: routers.filter(i => i.sidebar)
        }
    },
    methods: {
        ...mapActions('AuthStore', ['logout']),
        /*
         * Open Menu
         * */
        openMenu($event) {
            const openIcon = 'icon-chevron-down';
            const closeIcon = 'icon-chevron-right';
            const obj = $event.target.closest('a') ? $event.target.closest('a') : $event.target;
            const parent = obj.closest('li');
            const type = parent.getAttribute('data-type') ? parent.getAttribute('data-type') : 'open';
            if (type === 'open') {
                if (obj.getElementsByClassName('arrow')[0]) obj.getElementsByClassName('arrow')[0].classList.remove(closeIcon);
                if (obj.getElementsByClassName('arrow')[0]) obj.getElementsByClassName('arrow')[0].classList.add(openIcon);
                parent.setAttribute('data-type', 'close');
                if (parent.getElementsByTagName('ul')[0]) parent.getElementsByTagName('ul')[0].classList.add('open');
            }
            else {
                if (obj.getElementsByClassName('arrow')[0]) obj.getElementsByClassName('arrow')[0].classList.remove(openIcon);
                if (obj.getElementsByClassName('arrow')[0]) obj.getElementsByClassName('arrow')[0].classList.add(closeIcon);
                parent.setAttribute('data-type', 'open');
                if (parent.getElementsByTagName('ul')[0]) parent.getElementsByTagName('ul')[0].classList.remove('open');
            }
        }
    }
}
</script>

<style scoped>
@import "./AppSidebar.css";
</style>
