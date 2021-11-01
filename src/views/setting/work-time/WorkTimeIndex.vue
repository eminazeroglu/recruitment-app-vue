<template>
    <page>
        <page-head></page-head>
        <page-body>
            <div class="w-1/3">
                <form @submit.prevent="save">
                    <grid>
                        <form-group :label="translateKey + '.Label.Weekdays'" name="value.weekdays">
                            <form-text v-model="form.value.weekdays"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Weekend'" name="value.weekend">
                            <form-text v-model="form.value.weekend"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Sunday'" name="value.sunday">
                            <form-text v-model="form.value.sunday"/>
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
    name: "WorkTimeIndex",
    data() {
        return {
            translateKey,
            form: {
                key: 'work-time',
                value: {}
            }
        }
    },
    computed: {
        ...mapState('LanguageStore', ['languages']),
        ...mapState('SettingStore', ['setting'])
    },
    methods: {
        ...mapActions('LanguageStore', ['getSelectLanguages']),
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
        this.getSelectLanguages();
        this.getSetting(this.form.key)
        .then(r => {
            this.form.value = this.setting.value;
        })
    }
}
</script>

<style scoped>

</style>
