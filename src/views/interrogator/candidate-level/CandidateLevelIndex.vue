<template>
    <page>
        <page-head>
            <app-button property="success" icon="icon-add" @click="createModal">
                {{ translate('button.Add') }}
            </app-button>
        </page-head>

        <page-body>
            <data-grid
                :data-source="candidateLevels"
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
                        v-if="can(permission + '.action')"
                        :sm="true"
                        @click="action(list.row, 'active')"
                        :title="list.row.action.active ? translate('button.DeActivate') : translate('button.Activate')"
                        :icon="!list.row.action.active ? 'icon-eye-off' : 'icon-eye'"
                        property="success"
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

const modalId = 'createModal';
const translateKey = 'crm.CandidateLevel';

export default {
    name: "CandidateLevelIndex",
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
        ...mapState('CandidateLevelStore', ['candidateLevels']),
        permission() {
            return this.currentPage.permission;
        }
    },
    methods: {
        ...mapActions('CandidateLevelStore', ['getCandidateLevels', 'setCandidateLevel', 'actionCandidateLevel', 'deleteCandidateLevel']),
        /*
         * Form Create
         * */
        formCreate(item = {}) {
            const form = {
                id: item.id || null,
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
            this.formCreate(item);
        },
        /*
         * Remove
         * */
        remove(id) {
            this.alert().then(r => this.deleteCandidateLevel(id).then(r => this.getCandidateLevels()))
        },
        /*
         * Action
         * */
        action(item, type) {
            let action = item.action[type] ? 0 : 1;
            this.actionCandidateLevel({id: item.id, type, action}).then(r => this.getCandidateLevels())
        },
        /*
         * Save
         * */
        save() {
            this.setCandidateLevel(this.form)
            .then(r => {
                if (r) {
                    this.modal(this.modalId);
                    this.getCandidateLevels();
                }
            })
        }
    },
    created() {
        this.getCandidateLevels();
    }
}
</script>

<style scoped>

</style>
