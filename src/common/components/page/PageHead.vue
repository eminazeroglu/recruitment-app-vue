<template>
    <div class="flex justify-between items-center">
        <div class="flex flex-col space-y-1">
            <h3 class="font-bold text-xl uppercase" :lang="'az'" v-if="pageTitle">{{ pageTitle }}</h3>
            <p class="font-normal text-gray-500" v-if="pageSubTitle">{{ pageSubTitle }}</p>
        </div>
        <div>
            <slot/>
        </div>
    </div>
</template>

<script>
/*
 * Import Components
 * */

export default {
    name: "PageHead",
    props: {
        title: {
            default: null
        },
        subTitle: {
            default: null
        }
    },
    watch: {
        title(val) {
            this.pageTitle = val;
        },
        subTitle(val) {
            this.pageSubTitle = val;
        }
    },
    data() {
        return {
            pageTitle: null,
            pageSubTitle: null,
        }
    },
    created() {
        this.pageTitle = this.title || this.translate(this.$route.meta.title);
        this.pageSubTitle = this.subTitle || this.translate(this.$route.meta.subTitle);
    }
}
</script>

<style scoped>

</style>
