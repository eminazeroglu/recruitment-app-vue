<template>
    <div class="layout">
        <AppSidebar />
        <div class="layout-content">
            <AppHeader />
            <div class="pb-20 pt-10 h-full overflow-y-auto">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */

import AppHeader from "../common/components/header/AppHeader";
import AppSidebar from "../common/components/sidebar/AppSidebar";
export default {
    name: "AppLayoutDefault",
    components: {AppSidebar, AppHeader},
    data() {
        return {}
    }
}
</script>

<style scoped>
    .layout {
        @apply flex h-full
    }
    .layout-content {
        @apply h-full overflow-hidden bg-gray-100 flex-1
    }
</style>
