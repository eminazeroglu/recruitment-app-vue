<template>
    <page>
        <page-head></page-head>
        <page-body>
            <div class="w-1/3">
                <form @submit.prevent="save">
                    <grid>
                        <form-group :label="translateKey + '.Label.SystemLanguage'" name="value.language">
                            <form-tree-select :options="system_languages" valueExpr="code" v-model="form.value.language"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Email'" name="value.emails">
                            <form-tag v-model="form.value.emails"/>
                        </form-group>

                        <form-label>{{ translate(translateKey + '.Label.Phone') }}</form-label>

                        <form-group name="value.phones" class="w-full" v-for="(phone, index) in form.value.phones" :key="index">
                            <grid cols="12">
                                <grid-col col="10" class="flex">
                                    <label class="bg-gray-300 flex items-center h-10 px-3">
                                        <input type="checkbox" v-model="phone.whatsapp" value="true"> <span class="ml-1">Whatsapp</span>
                                    </label>
                                    <form-number v-model="phone.number"/>
                                </grid-col>
                                <grid-col col="2" class="justify-end flex items-center pr-3">
                                    <app-button :sm="true" property="primary" v-if="index === 0" @click="addElement('phones')">
                                        <i class="icon-add"></i>
                                    </app-button>
                                    <app-button :sm="true" property="danger" v-else @click="removeElement(index, 'phones', form)">
                                        <i class="icon-cancel"></i>
                                    </app-button>
                                </grid-col>
                            </grid>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Address'" name="value.address">
                            <form-tag v-model="form.value.address"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Map'" name="value.map">
                            <form-text-area style="min-height: 120px" v-model="form.value.map" @input="mapInput"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.ThemeColor'" name="value.theme_color">
                            <form-color v-model="form.value.theme_color"/>
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
    name: "GeneralIndex",
    data() {
        return {
            translateKey,
            form: {
                key: 'general',
                value: {
                    phones: [
                        {number: null, whatsapp: false}
                    ]
                }
            }
        }
    },
    computed: {
        ...mapState('SystemLanguageStore', ['system_languages']),
        ...mapState('SettingStore', ['setting'])
    },
    methods: {
        ...mapActions('SystemLanguageStore', ['getSelectSystemLanguages']),
        ...mapActions('SettingStore', ['getSetting', 'setSetting']),
        /*
         * Add Element
         * */
        addElement(type) {
            this.form.value[type].push({number: null, whatsapp: false})
        },
        /*
         * Remove Element
         * */
        removeElement(index, type) {
            this.form.value[type].splice(index, 1);
        },
        /*
         * Map Input
         * */
        mapInput(val) {
            this.form.value.map = val ? this.getIframeSrc(val) : null;
        },
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
        this.getSelectSystemLanguages();
        this.getSetting(this.form.key)
        .then(r => {
            this.form.value = this.setting.value;
        })
    }
}
</script>

<style scoped>

</style>
