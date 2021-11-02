<template>
    <page>
        <page-head>
            <app-button property="success" icon="icon-add" @click="createModal">
                {{ translate('button.Add') }}
            </app-button>
        </page-head>

        <page-body>
            <data-grid
                :data-source="skills"
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
                            :label="translate(translateKey + '.Label.Profession')"
                            name="profession_id"
                        >
                            <form-tree-select :options="professions" v-model="form.profession_id"/>
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
const translateKey = 'crm.Skill';

export default {
    name: "SkillIndex",
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
                {
                    caption: translateKey + '.Label.Profession',
                    dataField: 'profession.name',
                    show: true,
                    width: 300
                },
            ],
            form: {}
        }
    },
    computed: {
        ...mapState('SkillStore', ['skills']),
        ...mapState('ProfessionStore', ['professions']),
        permission() {
            return this.currentPage.permission;
        }
    },
    methods: {
        ...mapActions('SkillStore', ['getSkills', 'setSkill', 'actionSkill', 'deleteSkill']),
        ...mapActions('ProfessionStore', ['getSelectProfessions']),
        /*
         * Form Create
         * */
        formCreate(item = {}) {
            const form = {
                id: item.id || null,
                profession_id: item.profession_id || null,
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
        remove(id) {
            this.alert().then(r => this.deleteSkill(id).then(r => this.getSkills()))
        },
        /*
         * Action
         * */
        action(item, type) {
            let action = item.action[type] ? 0 : 1;
            this.actionSkill({id: item.id, type, action}).then(r => this.getSkills())
        },
        /*
         * Save
         * */
        save() {
            this.setSkill(this.form)
            .then(r => {
                if (r) {
                    this.modal(this.modalId);
                    this.getSkills();
                }
            })
        }
    },
    created() {
        this.getSkills();
    }
}
</script>

<style scoped>

</style>
