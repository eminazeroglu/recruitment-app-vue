<template>
    <page>
        <page-head></page-head>

        <page-body>
            <data-grid
                :data-source="permissionOptions"
                :columns="columns"
                :action-column="false"
            >

                <div slot="fullAccessTemplate" slot-scope="list" class="flex justify-center">
                    <label class="form-label inline-flex cursor-pointer">
                        <div class="checkbox" :class="{'checkbox-disabled': list.row.notAccess}">
                            <input
                                type="checkbox"
                                v-model="list.row.fullAccess"
                                class="hidden"
                                :disabled="list.row.notAccess"
                                @change="fullAccessChange($event, list.row.id)"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </label>
                </div>

                <div slot="notAccessTemplate" slot-scope="list" class="flex justify-center">
                    <label class="form-label inline-flex cursor-pointer">
                        <div class="checkbox" :class="{'checkbox-disabled': list.row.fullAccess}">
                            <input
                                type="checkbox"
                                v-model="list.row.notAccess"
                                class="hidden"
                                :disabled="list.row.fullAccess"
                                @change="notAccessChange($event, list.row.id)"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </label>
                </div>

                <div slot="readTemplate" slot-scope="list" class="flex justify-center">
                    <label class="form-label inline-flex cursor-pointer">
                        <div class="checkbox" :class="{'checkbox-disabled': list.row.notAccess}">
                            <input
                                type="checkbox"
                                v-model="list.row.read"
                                class="hidden"
                                :disabled="list.row.notAccess"
                                @change="permissionCheck($event, list.row.id)"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </label>
                </div>

                <div slot="createTemplate" slot-scope="list" class="flex justify-center">
                    <label class="form-label inline-flex cursor-pointer">
                        <div class="checkbox" :class="{'checkbox-disabled': list.row.notAccess}">
                            <input
                                type="checkbox"
                                v-model="list.row.create"
                                class="hidden"
                                :disabled="list.row.notAccess"
                                @change="permissionCheck($event, list.row.id)"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </label>
                </div>

                <div slot="updateTemplate" slot-scope="list" class="flex justify-center">
                    <label class="form-label inline-flex cursor-pointer">
                        <div class="checkbox" :class="{'checkbox-disabled': list.row.notAccess}">
                            <input
                                type="checkbox"
                                v-model="list.row.update"
                                class="hidden"
                                :disabled="list.row.notAccess"
                                @change="permissionCheck($event, list.row.id)"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </label>
                </div>

                <div slot="deleteTemplate" slot-scope="list" class="flex justify-center">
                    <label class="form-label inline-flex cursor-pointer">
                        <div class="checkbox" :class="{'checkbox-disabled': list.row.notAccess}">
                            <input
                                type="checkbox"
                                v-model="list.row.delete"
                                class="hidden"
                                :disabled="list.row.notAccess"
                                @change="permissionCheck($event, list.row.id)"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </label>
                </div>

                <div slot="otherTemplate" slot-scope="list" class="flex justify-center">
                    <label class="form-label inline-flex cursor-pointer">
                        <div class="checkbox" :class="{'checkbox-disabled': list.row.notAccess}">
                            <input
                                type="checkbox"
                                v-model="list.row.action"
                                class="hidden"
                                :disabled="list.row.notAccess"
                                @change="permissionCheck($event, list.row.id)"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </label>
                </div>

            </data-grid>
        </page-body>
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
    name: "PermissionOption",
    data() {
        return {
            translateKey,
            modalId,
            modelShow: false,
            item: {},
            columns: [
                {
                    caption: translateKey + '.Table.Name',
                    dataField: 'name',
                    show: true
                },
                {
                    caption: translateKey + '.Table.FullAccess',
                    dataField: 'fullAccess',
                    show: true,
                    width: 130,
                    alignment: 'center',
                    allowFiltering: false,
                    slot: 'fullAccessTemplate'
                },
                {
                    caption: translateKey + '.Table.NotAccess',
                    dataField: 'notAccess',
                    show: true,
                    width: 130,
                    alignment: 'center',
                    allowFiltering: false,
                    slot: 'notAccessTemplate'
                },
                {
                    caption: translateKey + '.Table.Read',
                    dataField: 'read',
                    show: true,
                    width: 130,
                    alignment: 'center',
                    allowFiltering: false,
                    slot: 'readTemplate'
                },
                {
                    caption: translateKey + '.Table.Create',
                    dataField: 'create',
                    show: true,
                    width: 130,
                    alignment: 'center',
                    allowFiltering: false,
                    slot: 'createTemplate'
                },
                {
                    caption: translateKey + '.Table.Edit',
                    dataField: 'update',
                    show: true,
                    width: 130,
                    alignment: 'center',
                    allowFiltering: false,
                    slot: 'updateTemplate'
                },
                {
                    caption: translateKey + '.Table.Delete',
                    dataField: 'delete',
                    show: true,
                    width: 130,
                    alignment: 'center',
                    allowFiltering: false,
                    slot: 'deleteTemplate'
                },
                {
                    caption: translateKey + '.Table.Other',
                    dataField: 'other',
                    show: true,
                    width: 130,
                    alignment: 'center',
                    allowFiltering: false,
                    slot: 'otherTemplate'
                },
            ],
            form: formObject()
        }
    },
    computed: {
        ...mapState('PermissionStore', ['permissionOptions', 'permission']),
    },
    methods: {
        ...mapActions('PermissionStore', ['getPermissionOptions', 'getPermission', 'setPermissionOption', 'deletePermission']),
        /*
         * Not Access Change
         * */
        notAccessChange(event, id) {
            const value = event.target.checked;
            const index = this.permissionOptions.findIndex(i => i.id === id);
            if (index >= 0) {
                if (value) {
                    this.permissionOptions[index].create = false;
                    this.permissionOptions[index].read = false;
                    this.permissionOptions[index].update = false;
                    this.permissionOptions[index].delete = false;
                    this.permissionOptions[index].action = false;
                    this.permissionOptions[index].fullAccess = false;
                    this.permissionOptions[index].notAccess = true;
                }
                else this.permissionOptions[index].notAccess = false;
                this.save(index);
            }
        },
        /*
         * Full Access Change
         * */
        fullAccessChange(event, id) {
            const value = event.target.checked;
            const index = this.permissionOptions.findIndex(i => i.id === id);
            if (index >= 0) {
                if (value) {
                    this.permissionOptions[index].create = true;
                    this.permissionOptions[index].read = true;
                    this.permissionOptions[index].update = true;
                    this.permissionOptions[index].delete = true;
                    this.permissionOptions[index].action = true;
                    this.permissionOptions[index].fullAccess = true;
                    this.permissionOptions[index].notAccess = false;
                }
                else this.permissionOptions[index].fullAccess = false;
                this.save(index);
            }
        },
        /*
         * Permission Check
         * */
        permissionCheck(event, id) {
            const index = this.permissionOptions.findIndex(i => i.id === id);
            this.save(index);
        },
        /*
         * Save
         * */
        save(index) {
            const item = this.permissionOptions[index];
            if (item && item.id) {
                const post = {
                    permission_id: item.id,
                    group_id: this.permission.id,
                    option: {
                        create: item.create,
                        read: item.read,
                        update: item.update,
                        delete: item.delete,
                        action: item.action,
                    }
                }
                this.setPermissionOption(post);
            }
        }
    },
    created() {
        this.getPermission(this.$route.params.id)
        .then(r => {
            this.getPermissionOptions(this.permission.id);
        })
        .catch(e => {
            this.$router.push({name: 'permission'})
        })
    }
}
</script>

<style scoped>

</style>
