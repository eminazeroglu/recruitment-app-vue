<template>
    <page>
        <page-head></page-head>
        <page-body>
            <div class="w-1/3">
                <form @submit.prevent="save">
                    <grid>
                        <form-group :label="translateKey + '.Label.HeadTag'" name="value.head">
                            <form-text-area style="min-height: 200px" v-model="form.value.head"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.BodyTag'" name="value.body">
                            <form-text-area style="min-height: 200px" v-model="form.value.body"/>
                        </form-group>

                        <div>
                            <app-button type="submit" property="success">
                                {{ translate('button.Save') }}
                            </app-button>
                        </div>
                    </grid>
                </form>
            </div>
        </page-body>
    </page>
</template>

<script>
/*
 * Import Components
 * */

const translateKey = 'crm.Setting';
import {mapActions, mapState} from 'vuex'

export default {
    name: "HtmlIndex",
    data() {
        return {
            translateKey,
            form: {
                key: 'html',
                value: {}
            }
        }
    },
    computed: {
        ...mapState('SettingStore', ['setting'])
    },
    methods: {
        ...mapActions('SettingStore', ['getSetting', 'setSetting']),
        /*
         * Save
         * */
        save() {
            this.setSetting(this.form).then(r => {
                this.notification('notification.CreateOrUpdateSuccess.Description');
                this.getSetting(this.form.key)
            });
        }
    },
    created() {
        this.getSetting(this.form.key)
        .then(r => {
            this.form.value = this.setting.value;
        })
    }
}
</script>

<style scoped>

</style>
