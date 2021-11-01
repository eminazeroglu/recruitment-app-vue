<template>
    <page>
        <page-head></page-head>
        <page-body>
            <div class="w-2/4">
                <form @submit.prevent="save">
                    <grid>

                        <div>
                            <grid cols="4">
                                <form-group :border="false" :label="translateKey + '.Label.Logo'" name="value.logo">
                                    <form-photo imgHeight="150px" :photo="form.value.logo_path ? form.value.logo_path : null" v-model="form.value.logo"/>
                                </form-group>

                                <form-group :border="false" :label="translateKey + '.Label.FooterLogo'" name="value.footer">
                                    <form-photo imgHeight="150px" :photo="form.value.footer_path ? form.value.footer_path : null" v-model="form.value.footer"/>
                                </form-group>

                                <form-group :border="false" :label="translateKey + '.Label.MobileLogo'" name="value.mobile">
                                    <form-photo imgHeight="150px" :photo="form.value.mobile_path ? form.value.mobile_path : null" v-model="form.value.mobile"/>
                                </form-group>

                                <form-group :border="false" :label="translateKey + '.Label.Favicon'" name="value.favicon">
                                    <form-photo imgHeight="150px" :photo="form.value.favicon_path ? form.value.favicon_path : null" v-model="form.value.favicon"/>
                                </form-group>
                            </grid>
                        </div>

                        <div>
                            <grid cols="12">
                                <grid-col col="6">
                                    <form-group :border="false" :label="translateKey + '.Label.Wallpaper'" name="value.wallpaper">
                                        <form-photo imgHeight="150px" :photo="form.value.wallpaper_path ? form.value.wallpaper_path : null" v-model="form.value.wallpaper"/>
                                    </form-group>
                                </grid-col>
                            </grid>
                        </div>

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
    name: "LogoIndex",
    data() {
        return {
            translateKey,
            form: {
                key: 'logo',
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
                if (r) {
                    this.notification('notification.CreateOrUpdateSuccess.Description');
                    this.getSetting(this.form.key)
                }
            });
        }
    },
    created() {
        this.getSelectLanguages();
        this.getSetting(this.form.key)
        .then(r => {
            const data = this.setting.value;
            let value = {};
            Object.keys(data).map(i => {
                if (i.indexOf('_path') < 0) {
                    value[i] = null
                }
            });
            value = {...data, ...value};
            this.form.value = value;
        })
    }
}
</script>

<style scoped>

</style>
