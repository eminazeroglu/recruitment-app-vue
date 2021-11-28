<template>
    <modal id="SendPoolPopup" size="xs" modal-box-style="overflow: initial">
        <modal-head>
            <modal-title>{{ translate(translateKey + '.Label.SendPoolForm') }}</modal-title>
        </modal-head>
        <modal-body style="overflow: initial">
            <form @submit.prevent="submit">
                <grid>
                    <form-group :label="translateKey + '.Label.Pool'" name="pool_id">
                        <form-tree-select :options="selectPools" v-model="form.pool_id"/>
                    </form-group>

                    <app-button property="success" class="justify-center" type="submit">
                        {{ translate('button.Send') }}
                    </app-button>
                </grid>
            </form>
        </modal-body>
    </modal>
</template>

<script>
/*
 * Import Components
 * */
import {mapActions, mapState} from 'vuex';

const translateKey = 'crm.Candidate';

const formObject = (item = null) => {
    return {
        ids: item,
        pool_id: null,
    }
}

export default {
    name: "CandidateSendPool",
    data() {
        return {
            translateKey,
            form: formObject()
        }
    },
    created() {
        this.$eventBus.$off('CandidateSendPool');
        this.$eventBus.$on('CandidateSendPool', item => {
            this.setErrors([]);
            this.modal('SendPoolPopup');
            this.getSelectPools();
            this.form = formObject(item);
        });
    },
    computed: {
        ...mapState('PoolStore', ['selectPools']),
    },
    methods: {
        ...mapActions('AppStore', ['setErrors']),
        ...mapActions('PoolStore', ['getSelectPools']),
        ...mapActions('CandidateStore', ['sendCandidatePool']),
        submit() {
            this.sendCandidatePool(this.form)
            .then(r => {
                if (r) {
                    this.modal('SendPoolPopup');
                    this.notification(this.translate('notification.CandidateSendPoolSuccess.Description'));
                    this.$emit('success', true);
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
