<template>
    <div v-if="applicationStart" class="h-full">
        <template v-if="isLogin && user.permission">
            <app-layout-default v-if="user.permission.id > 1">
                <RouteTab/>
            </app-layout-default>
            <div v-else class="w-full h-full flex items-center justify-center">
                <div class="w-full lg:w-96 flex flex-col space-y-4">
                    <alert icon="icon-info" property="danger">
                        {{ translate('notification.UserNotAccess.Description') }}
                    </alert>
                    <app-button class="justify-center" @click="userLogout">
                        {{ translate('button.Logout') }}
                    </app-button>
                </div>
            </div>
        </template>
        <app-layout-auth v-else>
            <router-view/>
        </app-layout-auth>
    </div>
</template>

<script>

import AppLayoutDefault from "./layouts/AppLayoutDefault";
import AppLayoutAuth from "./layouts/AppLayoutAuth";
import RouteTab from "./common/components/route-tab/RouteTab";

export default {
    components: {RouteTab, AppLayoutAuth, AppLayoutDefault},
    data() {
        return {}
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
