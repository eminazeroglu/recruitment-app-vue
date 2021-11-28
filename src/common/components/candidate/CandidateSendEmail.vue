<template>
    <modal id="SendEmailPopup" size="xs" modal-box-style="overflow: initial">
        <modal-head>
            <modal-title>{{ translate(translateKey + '.Label.SendEmailForm') }}</modal-title>
        </modal-head>
        <modal-body style="overflow: initial">
            <form @submit.prevent="submit">
                <grid>
                    <form-group :label="translateKey + '.Label.Subject'" name="subject">
                        <form-text v-model="form.subject"/>
                    </form-group>

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
        subject: null,
        message: null
    }
}

export default {
    name: "CandidateSendEmail",
    data() {
        return {
            translateKey,
            type: 'candidate',
            form: formObject()
        }
    },
    created() {
        this.$eventBus.$off('CandidateSendEmail');
        this.$eventBus.$on('CandidateSendEmail', item => {
            this.setErrors([]);
            this.modal('SendEmailPopup');
            this.form = formObject(item.ids);
            this.type = item.type || 'candidate'
        });
    },
    methods: {
        ...mapActions('AppStore', ['setErrors']),
        ...mapActions('CandidateStore', ['sendCandidateEmail']),
        submit() {
            this.sendCandidateEmail(this.form)
            .then(r => {
                if (r) {
                    this.modal('SendEmailPopup');
                    if (this.type === 'candidate-profile') this.alert(this.translate('notification.CandidateSendEmailSuccess.Description'), ' ', 'success', false);
                    else this.notification(this.translate('notification.CandidateSendEmailSuccess.Description'));
                    this.$emit('success', true);
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
