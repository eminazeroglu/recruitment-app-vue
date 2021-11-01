<template>
    <page>
        <page-head>
            <app-button property="success" icon="icon-add" @click="createModal">
                {{ translate('button.Add') }}
            </app-button>
        </page-head>

        <page-body>
            <data-grid
                :data-source="permissions"
                :columns="columns"
                :action-column-width="120"
                :action-column-text="translate(translateKey + '.Table.Action')"
            >
                <div slot="actionSlot" slot-scope="list">
                    <app-button
                        v-if="can(permission + '.update') && list.row.id !== 1 && list.row.id !== 2"
                        @click="createModal(list.row.form)"
                        :sm="true"
                        :title="translate('button.Edit')"
                        icon="icon-edit-2"
                        property="primary"
                    />

                    <app-button
                        v-if="can(permission + '.action') && list.row.id !== 1 && list.row.id !== 2"
                        :sm="true"
                        @click="action(list.row, 'active') && list.row.id !== 1 && list.row.id !== 2"
                        :title="list.row.action.active ? translate('button.DeActivate') : translate('button.Activate')"
                        :icon="!list.row.action.active ? 'icon-eye-off' : 'icon-eye'"
                        property="success"
                    />

                    <app-button
                        v-if="can(permission + '.action') && list.row.id !== 1 && list.row.id !== 2"
                        :sm="true"
                        :route="{name: 'permission.option', params: {id: list.row.id}}"
                        :title="translate('button.AddPermission')"
                        icon="icon-grid"
                        property="gray"
                    />

                    <app-button
                        v-if="can(permission + '.delete') && list.row.id !== 1 && list.row.id !== 2"
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
            <modal-body v-if="modelShow">
                <form @submit.prevent="save">
                    <grid>
                        <form-group
                            :label="translate(translateKey + '.Label.Name') + (appLanguages.length > 1 ? ' ('+lang.name+')' : '')"
                            :name="'translates.'+lang.code+'.name'"
                            v-for="(lang, index) in appLanguages"
                            :key="index"
                        >
                            <form-text v-model="form.translates[lang.code].name"/>
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
        translates: {}
    }
}

const modalId = 'createModal';
const translateKey = 'crm.Permission';

export default {
    name: "PermissionIndex",
    data() {
        return {
            translateKey,
            modalId,
            modelShow: false,
            permission: 'permission',
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
        ...mapState('PermissionStore', ['permissions']),
    },
    methods: {
        ...mapActions('PermissionStore', ['getPermissions', 'setPermission', 'actionPermission', 'deletePermission']),
        /*
         * Form Reset
         * */
        formCreate(item = {}) {
            const self = this;
            self.form = formObject(item);
            self.appLanguages.filter(i => {
                self.form.translates[i.code] = {
                    name: item.translates && item.translates[i.code] ? item.translates[i.code].name : null
                }
            });
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
            this.alert().then(r => this.deletePermission(id).then(r => this.getPermissions()))
        },
        /*
         * Action
         * */
        action(item, type) {
            let action = item.action[type] ? 0 : 1;
            this.actionPermission({id: item.id, type, action}).then(r => this.getPermissions())
        },
        /*
         * Save
         * */
        save() {
            this.setPermission(this.form)
            .then(r => {
                if (r) {
                    this.modal(this.modalId);
                    this.getPermissions();
                }
            })
        }
    },
    created() {
        this.getPermissions();
    }
}
</script>

<style scoped>

</style>
