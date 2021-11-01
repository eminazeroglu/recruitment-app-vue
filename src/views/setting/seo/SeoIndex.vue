<template>
    <page>
        <page-head>
            <app-button property="success" icon="icon-add" @click="createModal">
                {{ translate('button.Add') }}
            </app-button>
        </page-head>

        <page-body>

            <data-grid
                :data-source="seos"
                :columns="columns"
                :action-column-width="120"
                :action-column-text="translate(translateKey + '.Table.Action')"
            >

                <div slot="keywordTemplate" slot-scope="list">
                    <span class="bg-gray-300 inline-flex h-7 items-center px-3 rounded me-2" v-for="key in list.row.keywords">{{ key }}</span>
                </div>
                <div slot="botTemplate" slot-scope="list">
                    <p v-for="(item, index) in botArr" v-if="list.row.bots[item]" style="margin-left: 0" :class="{'mb-1': index !== (botArr.length-1)}" :key="item+'_'+index">
                        <b>{{ item.toTitleCase() }}:</b> {{ list.row.bots[item] }}
                    </p>
                </div>

                <div slot="actionSlot" slot-scope="list">
                    <app-button
                        v-if="can(permission + '.update')"
                        @click="createModal(list.row)"
                        :sm="true"
                        :title="translate('button.Edit')"
                        icon="icon-edit-2"
                        property="primary"
                    />

                    <app-button
                        v-if="can(permission + '.delete')"
                        :sm="true"
                        @click="remove(list.row.id)"
                        :title="translate('button.Delete')"
                        icon="icon-trash-2"
                        property="danger"
                    />

                </div>
            </data-grid>
        </page-body>

        <modal :id="modalId" size="sm">
            <modal-head>
                <modal-title>{{ currentPage.title }}</modal-title>
            </modal-head>
            <modal-body v-if="modelShow">
                <form @submit.prevent="save">
                    <grid>
                        <form-group
                            :label="translateKey + '.Table.Url'"
                            name="url"
                        >
                            <form-text v-model="form.url"/>
                        </form-group>

                        <form-group
                            :label="translateKey + '.Table.Title'"
                            name="title"
                        >
                            <form-text v-model="form.title"/>
                        </form-group>

                        <form-group
                            :label="translateKey + '.Table.Description'"
                            name="description"
                        >
                            <form-text-area style="min-height: 120px" v-model="form.description"/>
                        </form-group>

                        <form-group
                            :label="translateKey + '.Table.Keywords'"
                            name="keywords"
                        >
                            <form-tag v-model="form.keywords" />
                        </form-group>

                        <form-group
                            :label="item.toTitleCase()"
                            name="bots.robots"
                            v-for="(item, index) in botArr"
                            :key="index"
                        >
                            <form-text v-model="form.bots[item]"/>
                        </form-group>

                        <app-button class="justify-center" property="success" type="submit">
                            {{ translate('button.Save') }}
                        </app-button>
                    </grid>
                </form>
            </modal-body>
        </modal>
    </page>
</template>

<script>
/*
 * Import Components
 * */
import {mapActions, mapState} from 'vuex';

const formObject = (item = {}) => {
    return {
        id: item.id || null,
        url: item.url || null,
        title: item.title || null,
        description: item.description || null,
        keywords: item.keywords || [],
        bots: item.bots || {},
    }
}

const modalId = 'createModal';
const translateKey = 'crm.Seo';

export default {
    name: "SeoIndex",
    data() {
        return {
            translateKey,
            modalId,
            modelShow: false,
            columns: [
                {
                    caption: translateKey + '.Table.Url',
                    dataField: 'url',
                    show: true
                },
                {
                    caption: translateKey + '.Table.Title',
                    dataField: 'title',
                    show: true
                },
                {
                    caption: translateKey + '.Table.Description',
                    dataField: 'description',
                    show: true,
                    allowFiltering: false
                },
                {
                    caption: translateKey + '.Table.Keywords',
                    dataField: 'keywords',
                    show: true,
                    allowFiltering: false,
                    slot: 'keywordTemplate'
                },
                {
                    caption: translateKey + '.Table.Bots',
                    dataField: 'bots',
                    show: true,
                    allowFiltering: false,
                    slot: 'botTemplate'
                },
            ],
            form: formObject()
        }
    },
    computed: {
        ...mapState('SeoStore', ['seos', 'botArr']),
        permission() {
            return this.currentPage.permission;
        }
    },
    methods: {
        ...mapActions('SeoStore', ['getSeos', 'setSeo', 'actionSeo', 'deleteSeo']),
        /*
         * Form Reset
         * */
        formCreate(item = {}) {
            const self = this;
            self.form = formObject(item);
            self.modelShow = true;
        },
        /*
         * Create Modal
         * */
        createModal(item = {}) {
            this.modal(this.modalId)
            this.modelShow = false;
            this.resetError();
            this.formCreate(item);
        },
        /*
         * Remove
         * */
        remove(id) {
            this.alert().then(r => this.deleteSeo(id).then(r => this.getSeos()))
        },
        /*
         * Action
         * */
        action(item, type) {
            let action = item.action[type] ? 0 : 1;
            this.actionSeo({id: item.id, type, action}).then(r => this.getSeos())
        },
        /*
         * Save
         * */
        save() {
            this.setSeo(this.form)
            .then(r => {
                if (r) {
                    this.modal(this.modalId);
                    this.getSeos();
                }
            })
        }
    },
    created() {
        this.getSeos();
    }
}
</script>

<style scoped>

</style>
