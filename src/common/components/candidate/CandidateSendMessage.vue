<template>
    <modal id="SendMessagePopup" size="xs" modal-box-style="overflow: initial">
        <modal-head>
            <modal-title>{{ translate(translateKey + '.Label.SendMessageForm') }}</modal-title>
        </modal-head>
        <modal-body style="overflow: initial">
            <form @submit.prevent="submit">
                <grid>
                    <form-group :label="translateKey + '.Label.Message'" name="message">
                        <form-text-area style="min-height: 120px" v-model="form.message"/>
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
        message: null
    }
}

export default {
    name: "CandidateSendMessage",
    data() {
        return {
            translateKey,
            type: 'candidate',
            form: formObject()
        }
    },
    created() {
        this.$eventBus.$off('CandidateSendMessage');
        this.$eventBus.$on('CandidateSendMessage', item => {
            this.setErrors([]);
            this.modal('SendMessagePopup');
            this.form = formObject(item.ids);
            this.type = item.type || 'candidate'
        });
    },
    methods: {
        ...mapActions('AppStore', ['setErrors']),
        ...mapActions('CandidateStore', ['sendCandidateMessage']),
        submit() {
            this.sendCandidateMessage(this.form)
            .then(r => {
                if (r) {
                    this.modal('SendMessagePopup');
                    if (this.type === 'candidate-profile') this.alert(this.translate('notification.CandidateSendMessageSuccess.Description'), ' ', 'success', false);
                    else this.notification(this.translate('notification.CandidateSendMessageSuccess.Description'));
                    this.$emit('success', true);
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
