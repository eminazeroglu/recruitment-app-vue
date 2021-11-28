<script>
/*
 * Import Components
 * */
import CandidateIndex from "../candidate/CandidateIndex";
import {mapState, mapActions} from 'vuex'

export default {
    name: "PoolCandidate",
    extends: CandidateIndex,
    computed: {
        ...mapState('PoolStore', ['poolCandidates', 'pool']),
        pageTitle() {
            return this.pool.name || '&nbsp;';
        },
        pageSubTitle() {
            return this.currentPage.title;
        },
        componentType() {
            return 'pool_candidate';
        },
    },
    methods: {
        ...mapActions('PoolStore', ['getPoolCandidates', 'getPool']),
        ...mapActions('CandidateStore', ['removeCandidatePool']),
        /*
         * Remove Pool Popup
         * */
        removePoolPopup() {
            this.alert(this.translate('notification.CandidateRemovePoolAlert.Description'))
            .then(r => {
                this.removeCandidatePool({
                    ids: this.selectedItems,
                    pool_id: this.pool.id
                })
                .then(r => {
                    if (r) {
                        this.dxInstance.clearSelection();
                        this.getItems();
                    }
                })
            })
        },
        getItems() {
            if (this.pool.id) {
                this.getPoolCandidates({id: this.pool.id})
                .then(r => {
                    this.datasource = this.poolCandidates;
                })
            }
        }
    },
    created() {
        this.getPool(this.$route.params.id)
        .then(r => {
            this.getItems();
        })
        .catch(err => {
            this.$tabs.close();
        })
    }
}
</script>

<style scoped>

</style>
