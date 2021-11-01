<template>
    <div>
        <grid cols="5">
            <stats-box
                v-for="i in 5"
                :key="i"
                :title="'Stats ' + i"
                :count="i"
                icon="icon-home"
            />
        </grid>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "HomeIndex",
    data() {
        return {}
    }
}
</script>

<style scoped>

</style>
