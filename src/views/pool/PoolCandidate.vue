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
    methods: {
        ...mapActions('PoolStore', ['getPoolCandidates', 'getPool']),
    },
    created() {
        this.getPool(this.$route.params.id)
        .catch(err => {
            this.$tabs.close();
        })
    }
}
</script>

<style scoped>

</style>
