<template>
    <page>
        <page-head></page-head>
        <page-body>
            <div class="w-1/3">
                <form @submit.prevent="save">
                    <grid cols="12">

                        <grid-col col="6">
                            <form-label>
                                {{ translate(translateKey + '.Label.Icon') }}
                                <a :href="iconUrl" class="text-blue-600 ml-2" target="_blank">(Icons)</a>
                            </form-label>
                        </grid-col>

                        <grid-col col="6">
                            <form-label>
                                {{ translate(translateKey + '.Label.Link') }}
                            </form-label>
                        </grid-col>

                        <grid-col col="12">

                            <div v-for="(item, index) in form.value" class="mb-4">
                                <grid cols="12">

                                    <grid-col col="4">
                                        <form-group>
                                            <form-text v-model="item.icon" />
                                        </form-group>
                                    </grid-col>

                                    <grid-col col="6">
                                        <form-group>
                                            <form-text v-model="item.url" />
                                        </form-group>
                                    </grid-col>

                                    <grid-col col="2"  class="flex items-center pr-3">
                                        <app-button type="button" :sm="true" property="primary" v-if="index === 0" @click="addElement('phones')">
                                            <i class="icon-add"></i>
                                        </app-button>
                                        <app-button type="button" :sm="true" property="danger" v-else @click="removeElement(index, 'phones', form)">
                                            <i class="icon-cancel"></i>
                                        </app-button>
                                    </grid-col>

                                </grid>
                            </div>

                        </grid-col>

<!--                        <form-group name="value.phones" class="w-full">
                            <grid cols="12">
                                <grid-col col="10" class="flex">
                                    <grid cols="2">
                                        <form-text v-model="phone.number"/>
                                        <form-text v-model="phone.number"/>
                                    </grid>
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
                        </form-group>-->

<!--                        <form-group name="value.phones" class="w-full" v-for="(phone, index) in form.value" :key="index">
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
                        </form-group>-->

                        <grid-col col="12">
                            <div>
                                <app-button type="submit" property="success">
                                    {{ translate('button.Save') }}
                                </app-button>
                            </div>
                        </grid-col>
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
    name: "SocialPageIndex",
    data() {
        return {
            translateKey,
            iconUrl: null,
            form: {
                key: 'social-page',
                value: {
                    phones: [
                        {number: null, whatsapp: false}
                    ]
                }
            }
        }
    },
    computed: {
        ...mapState('SettingStore', ['setting'])
    },
    methods: {
        ...mapActions('SettingStore', ['getSetting', 'setSetting']),
        /*
         * Add Element
         * */
        addElement() {
            this.form.value.push({number: null, whatsapp: false})
        },
        /*
         * Remove Element
         * */
        removeElement(index) {
            this.form.value.splice(index, 1);
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
        this.getSetting(this.form.key)
        .then(r => {
            this.iconUrl = this.setting.icon_url;
            this.form.value = this.setting.value;
        })
    }
}
</script>

<style scoped>

</style>
