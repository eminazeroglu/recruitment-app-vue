<template>
    <CandidateIndex
        type="pool_candidate"
        :head-title="pageTitle"
        :head-sub-title="pageSubTitle"
        :params="query"
    />
</template>

<script>
/*
 * Import Components
 * */
import CandidateIndex from "../candidate/CandidateIndex";
import {mapState, mapActions} from 'vuex'

export default {
    name: "PoolCandidate",
    components: {CandidateIndex},
    computed: {
        ...mapState('PoolStore', ['poolCandidates', 'pool']),
        pageTitle() {
            return this.pool.name || '&nbsp;';
        },
        pageSubTitle() {
            return this.currentPage.title;
        },
        query() {
            return {id: this.pool.id};
        }
    },
    watch: {
        $route() {
            this.getById();
        }
    },
    methods: {
        ...mapActions('PoolStore', ['getPoolCandidates', 'getPool']),
        getById() {
            this.getPool(this.$route.params.id)
            .then(r => {
                this.setRouteTab({
                    title: this.pool.name + ' - ' + this.currentPage.title
                })
            })
            .catch(err => {
                this.closeRouteTab();
            })
        }
    },
    created() {
        this.getById();
    }
}
</script>

<style scoped>

</style>
