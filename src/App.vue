<template>
    <div v-if="applicationStart" class="h-full">
        <app-layout-default v-if="isLogin && user.permission && user.permission.id > 1">
            <router-tab :lang="tabTranslate" :keep-last-tab="false" restore/>
        </app-layout-default>
        <app-layout-auth v-else>
            <router-view />
        </app-layout-auth>
    </div>
</template>

<script>

import AppLayoutDefault from "./layouts/AppLayoutDefault";
import AppLayoutAuth from "./layouts/AppLayoutAuth";

export default {
    components: {AppLayoutAuth, AppLayoutDefault},
    data() {
        return {
            tabTranslate: {
                tab: {
                    //untitled: 'Bilinməyən',
                },
                contextmenu: {
                    refresh: 'Yenilə',
                    refreshAll: 'Hamısını yenilə',
                    close: 'Bağla',
                    closeLefts: 'Sol tərəfdəkiləri bağla',
                    closeRights: 'Sağ tərəfdəkiləri bağla',
                    closeOthers: 'Hamsını bağla'
                },
                msg: {
                    keepLastTab: ''
                }
            }
        }
    },
    computed: {
        isLogin() {
            return this.token ? this.token : localStorage.token;
        },
    },
    created() {
        this.start();
    }
}
</script>
