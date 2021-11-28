<template>
    <page>
        <page-head>
            <app-button property="success" icon="icon-add" @click="createModal">
                {{ translate('button.Add') }}
            </app-button>
        </page-head>

        <page-body>
            <data-grid
                :data-source="pools"
                :columns="columns"
                :action-column-width="120"
                :action-column-text="translate(translateKey + '.Label.Action')"
            >
                <div slot="nameTemplate" slot-scope="list">
                    <router-link class="text-blue-700 underline" :to="{name: 'pool.candidate', params: {id: list.row.id}}">{{ list.row.name }}</router-link>
                </div>

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
                            :label="translate(translateKey + '.Label.Name')"
                            name="name"
                        >
                            <form-text v-model="form.name"/>
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
const translateKey = 'crm.Pool';

export default {
    name: "PoolIndex",
    data() {
        return {
            translateKey,
            modalId,
            modelShow: false,
            columns: [
                {
                    caption: translateKey + '.Label.Name',
                    dataField: 'name',
                    show: true,
                    slot: 'nameTemplate'
                },
                {
                    caption: translateKey + '.Label.User',
                    dataField: 'user.fullname',
                    show: true,
                    allowFiltering: false,
                    width: 140,
                    alignment: 'center'
                },
                {
                    caption: translateKey + '.Label.Candidates',
                    dataField: 'candidates_count',
                    show: true,
                    allowFiltering: false,
                    width: 140,
                    alignment: 'center'
                },
            ],
            form: {}
        }
    },
    computed: {
        ...mapState('PoolStore', ['pools']),
        permission() {
            return this.currentPage.permission;
        }
    },
    methods: {
        ...mapActions('PoolStore', ['getPools', 'setPool', 'actionPool', 'deletePool']),
        /*
         * Form Create
         * */
        formCreate(item = {}) {
            this.form = {
                id: item.id || null,
                name: item.name || null,
            };
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
            this.alert().then(r => this.deletePool(id).then(r => this.getPools()))
        },
        /*
         * Action
         * */
        action(item, type) {
            let action = item.action[type] ? 0 : 1;
            this.actionPool({id: item.id, type, action}).then(r => this.getPools())
        },
        /*
         * Save
         * */
        save() {
            this.setPool(this.form)
            .then(r => {
                if (r) {
                    this.modal(this.modalId);
                    this.getPools();
                }
            })
        }
    },
    created() {
        this.getPools();
    }
}
</script>

<style scoped>

</style>
