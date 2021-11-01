<template>
    <header class="header">

       <AppHeaderUserDropdown />
    </header>
</template>

<script>
/*
 * Import Components
 * */

import AppHeaderUserDropdown from "./AppHeaderUserDropdown";
export default {
    name: "AppHeader",
    components: {AppHeaderUserDropdown},
    data() {
        return {}
    },
}
</script>

<style scoped>
    @import "./AppHeader.css";
</style>
