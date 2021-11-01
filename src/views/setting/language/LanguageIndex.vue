<template>
    <page>
        <page-head>
            <app-button property="success" icon="icon-add" @click="createModal">
                {{ translate('button.Add') }}
            </app-button>
        </page-head>

        <page-body>
            <data-grid
                :data-source="languages"
                :columns="columns"
                :action-column-width="120"
                :action-column-text="translate(translateKey + '.Table.Action')"
            >
                <div slot="actionSlot" slot-scope="list">
                    <app-button
                        v-if="can(permission + '.update') && list.row.id !== 1"
                        @click="createModal(list.row.form)"
                        :sm="true"
                        :title="translate('button.Edit')"
                        icon="icon-edit-2"
                        property="primary"
                    />

                    <app-button
                        v-if="can(permission + '.action') && list.row.id !== 1"
                        :sm="true"
                        @click="action(list.row, 'active')"
                        :title="list.row.action.active ? translate('button.DeActivate') : translate('button.Activate')"
                        :icon="!list.row.action.active ? 'icon-eye-off' : 'icon-eye'"
                        property="success"
                    />

                    <app-button
                        v-if="can(permission + '.delete') && list.row.id !== 1"
                        :sm="true"
                        @click="remove(list.row.id)"
                        :title="translate('button.Delete')"
                        icon="icon-trash-2"
                        property="danger"
                    />

                </div>
            </data-grid>
        </page-body>

        <modal :id="modalId" size="xs">
            <modal-head>
                <modal-title>{{ currentPage.title }}</modal-title>
            </modal-head>
            <modal-body>
                <form @submit.prevent="save">
                    <grid>
                        <form-group :label="translateKey + '.Label.Name'" name="name">
                            <form-text v-model="form.name"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Code'" name="code">
                            <form-text v-model="form.code"/>
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
        name: item.name || null,
        code: item.code || null,
    }
}

const modalId = 'createModal';
const translateKey = 'crm.Language';

export default {
    name: "LanguageIndex",
    data() {
        return {
            translateKey,
            modalId,
            permission: 'language',
            columns: [
                {
                    caption: translateKey + '.Table.Name',
                    dataField: 'name',
                    show: true
                },
            ],
            form: formObject()
        }
    },
    computed: {
        ...mapState('LanguageStore', ['languages']),
    },
    methods: {
        ...mapActions('LanguageStore', ['getLanguages', 'setLanguage', 'actionLanguage', 'deleteLanguage']),
        /*
         * Form Create
         * */
        formCreate(item = {}) {
            const self = this;
            self.form = formObject(item);
        },
        /*
         * Create Modal
         * */
        createModal(item = {}) {
            this.modal(this.modalId)
            this.resetError();
            this.formCreate(item);
        },
        /*
         * Remove
         * */
        remove(id) {
            this.alert().then(r => this.deleteLanguage(id).then(r => this.getLanguages()))
        },
        /*
         * Action
         * */
        action(item, type) {
            let action = item.action[type] ? 0 : 1;
            this.actionLanguage({id: item.id, type, action}).then(r => window.location.reload())
        },
        /*
         * Save
         * */
        save() {
            this.setLanguage(this.form)
            .then(r => {
                if (r) {
                    this.modal(this.modalId);
                    this.getLanguages();
                }
            })
        }
    },
    created() {
        this.getLanguages();
    }
}
</script>

<style scoped>

</style>
