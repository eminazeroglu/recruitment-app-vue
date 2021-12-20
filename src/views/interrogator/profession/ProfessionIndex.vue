<template>
    <page>
        <page-head>
            <app-button property="success" icon="icon-add" @click="createModal">
                {{ translate('button.Add') }}
            </app-button>
        </page-head>

        <page-body>
            <tree-list
                :data-source="professions"
                :columns="columns"
                :action-column-width="120"
                :action-column-text="translate(translateKey + '.Label.Action')"
            >
                <div slot="actionSlot" slot-scope="list">
                    <app-button
                        v-if="can(permission + '.update')"
                        @click="createModal(list.row.form)"
                        :sm="true"
                        :title="translate('button.Edit')"
                        icon="icon-edit-2"
                        property="primary"
                    />

                    <app-button
                        v-if="can(permission + '.action') && !list.row.hasChild"
                        :sm="true"
                        @click="action(list.row, 'active')"
                        :title="list.row.action.active ? translate('button.DeActivate') : translate('button.Activate')"
                        :icon="!list.row.action.active ? 'icon-eye-off' : 'icon-eye'"
                        property="success"
                    />

                    <app-button
                        v-if="can(permission + '.delete') && !list.row.hasChild"
                        :sm="true"
                        @click="remove(list.row)"
                        :title="translate('button.Delete')"
                        icon="icon-trash-2"
                        property="danger"
                    />

                </div>
            </tree-list>
        </page-body>

        <modal :id="modalId" size="xs" modal-box-style="overflow: initial">
            <modal-head>
                <modal-title>{{ currentPage.title }}</modal-title>
            </modal-head>
            <modal-body v-if="modelShow" style="overflow: initial">
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

                        <form-group
                            :label="translate(translateKey + '.Label.Parent')"
                            name="parent_id"
                        >
                            <form-tree-select :options="parents" v-model="form.parent_id"/>
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

const modalId = 'createModal';
const translateKey = 'crm.Profession';

export default {
    name: "ProfessionIndex",
    data() {
        return {
            translateKey,
            modalId,
            modelShow: false,
            columns: [
                {
                    caption: translateKey + '.Label.Name',
                    dataField: 'name',
                    show: true
                },
            ],
            form: {}
        }
    },
    computed: {
        ...mapState('ProfessionStore', ['professions', 'listProfessions']),
        permission() {
            return this.currentPage.permission;
        },
        parents() {
            if (this.form.id) return this.listProfessions.filter(i => i.id !== this.form.id);
            return this.listProfessions;
        }
    },
    methods: {
        ...mapActions('ProfessionStore', ['getProfessions', 'setProfession', 'getSelectProfessions', 'actionProfession', 'deleteProfession']),
        /*
         * Form Create
         * */
        formCreate(item = {}) {
            const form = {
                id: item.id || null,
                parent_id: item.parent_id || null,
                translates: {}
            }
            this.appLanguages.filter(i => {
                form.translates[i.code] = {
                    name: item.translates && item.translates[i.code] ? item.translates[i.code].name : null,
                }
            });
            this.form = form;
            this.modelShow = true;
        },
        /*
         * Create Modal
         * */
        createModal(item = {}) {
            this.modal(this.modalId)
            this.modelShow = false;
            this.resetError();
            this.getSelectProfessions();
            this.formCreate(item);
        },
        /*
         * Remove
         * */
        remove(item) {
            if (!item.hasChild) {
                this.alert().then(r => this.deleteProfession(item.id))
            }
        },
        /*
         * Action
         * */
        action(item, type) {
            if (!item.hasChild) {
                let action = item.action[type] ? 0 : 1;
                this.actionProfession({id: item.id, type, action})
            }
        },
        /*
         * Save
         * */
        save() {
            this.setProfession(this.form)
            .then(r => {
                if (r) {
                    this.modal(this.modalId);
                }
            })
        }
    },
    created() {
        this.getProfessions();
    }
}
</script>

<style scoped>

</style>
