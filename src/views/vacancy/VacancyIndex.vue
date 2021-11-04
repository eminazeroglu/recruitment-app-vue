<template>
    <page>
        <page-head>
            <div class="flex space-x-5">
                <app-button property="warning" icon="icon-filter">
                    {{ translate('button.Filter') }}
                </app-button>
                <app-button property="success" icon="icon-add" :route="{name: 'vacancy.form'}">
                    {{ translate('button.Add') }}
                </app-button>
            </div>
        </page-head>

        <page-body>
            <data-grid
                :data-source="vacancies"
                :search-visible="false"
                :columns="columns"
                :action-column-width="50"
                :action-column-text="''"
            >
                <div slot="statusSlot" slot-scope="list">
                    <badge property="success" v-if="list.row.status.key === 'published'">{{
                            list.row.status.name
                                                                                         }}
                    </badge>
                    <badge v-else-if="list.row.status.key === 'draft'">{{ list.row.status.name }}</badge>
                    <badge property="dark" v-else-if="list.row.status.key === 'completed'">{{
                            list.row.status.name
                                                                                           }}
                    </badge>
                    <badge property="danger" v-else-if="list.row.status.key === 'canceled'">{{
                            list.row.status.name
                                                                                            }}
                    </badge>
                </div>
                <div slot="actionSlot" slot-scope="list">
                    <dropdown v-if="can(permission + '.action')">
                        <dropdown-button :arrow="false" style="padding: 0; width: 30px; height: 30px; justify-content: center">
                            <i class="icon-ellipsis-v"></i>
                        </dropdown-button>
                        <dropdown-items>
                            <dropdown-item
                                :style="dropdownItemStyle"
                                v-if="can(permission + '.update')"
                                :route="{name: 'vacancy.form', params: {id: list.row.id}}"
                            >
                                <i class="icon-edit-2"></i>
                                {{ translate('button.Edit') }}
                            </dropdown-item>
                            <dropdown-item
                                :route="{name: 'vacancy.apply', params: {id: list.row.id}}"
                                :style="dropdownItemStyle"
                                v-if="list.row.apply_candidates_count > 0"
                            >
                                <i class="icon-users"></i>
                                {{ translate('button.Candidates') }}
                            </dropdown-item>
                            <dropdown-item :style="dropdownItemStyle" @click="changeStatusPopup(list.row)">
                                <i class="icon-repeat"></i>
                                {{ translate('button.ChangeStatus') }}
                            </dropdown-item>
                            <dropdown-item :style="dropdownItemStyle" :route="{name: 'vacancy.clone', params: {id: list.row.id}}">
                                <i class="icon-clone"></i>
                                {{ translate('button.Copy') }}
                            </dropdown-item>
                        </dropdown-items>
                    </dropdown>

                </div>
            </data-grid>
        </page-body>


        <!-- Change Status Popup -->
        <modal id="VacancyChangeStatusPopup" size="xs" modal-box-style="overflow: initial">
            <modal-head>
                <modal-title>{{ changeStatusForm.title }}</modal-title>
            </modal-head>
            <modal-body style="overflow: initial">
                <form @submit.prevent="changeStatus">
                    <grid>
                        <form-group :label="translateKey + '.Label.Status'">
                            <form-tree-select :clearable="false" :options="vacancyPublishStatuses" v-model="changeStatusForm.status_id"/>
                        </form-group>

                        <app-button property="success" class="justify-center">
                            {{ translate('button.Save') }}
                        </app-button>
                    </grid>
                </form>
            </modal-body>
        </modal>
        <!-- #Change Status Popup -->
    </page>
</template>

<script>
/*
 * Import Components
 * */
import {mapActions, mapState} from 'vuex';

const translateKey = 'crm.Vacancy';


const changeStatusForm = () => {
    return {
        title: null,
        id: null,
        status_id: null
    }
}

export default {
    name: "VacancyIndex",
    data() {
        return {
            translateKey,
            modelShow: false,
            dropdownItemStyle: 'justify-content: flex-start; text-align: left; align-items: center',
            changeStatusForm: changeStatusForm(),
            columns: [
                {
                    caption: translateKey + '.Label.Name',
                    dataField: 'name',
                    show: true
                },
                {
                    caption: translateKey + '.Label.Hr',
                    dataField: 'user.fullname',
                    show: true,
                    width: 200
                },
                {
                    caption: translateKey + '.Label.City',
                    dataField: 'city.name',
                    show: true,
                    width: 200
                },
                {
                    caption: translateKey + '.Label.Profession',
                    dataField: 'profession.name',
                    show: true,
                    width: 200
                },
                {
                    caption: translateKey + '.Label.VacancyCount',
                    dataField: 'vacancy_count',
                    show: true,
                    width: 80,
                    alignment: 'center'
                },
                {
                    caption: translateKey + '.Label.ApplyCandidateCount',
                    dataField: 'apply_candidates_count',
                    show: true,
                    width: 80,
                    alignment: 'center'
                },
                {
                    caption: translateKey + '.Label.Status',
                    dataField: 'status',
                    show: true,
                    slot: 'statusSlot',
                    width: 150,
                    alignment: 'center'
                },
            ],
        }
    },
    computed: {
        ...mapState('VacancyStore', ['vacancies']),
        ...mapState('VacancyPublishStatusStore', ['vacancyPublishStatuses']),
        permission() {
            return this.currentPage.permission;
        }
    },
    methods: {
        ...mapActions('VacancyStore', ['getVacancies', 'changeStatusVacancy']),
        ...mapActions('VacancyPublishStatusStore', ['getSelectVacancyPublishStatuses']),
        /*
         * Change Status Popup
         * */
        changeStatusPopup(item) {
            this.modal('VacancyChangeStatusPopup');
            this.getSelectVacancyPublishStatuses();
            this.changeStatusForm = changeStatusForm();
            this.changeStatusForm.title = item.name;
            this.changeStatusForm.id = item.id;
            this.changeStatusForm.status_id = item.status.id;
        },
        /*
         * Change Status
         * */
        changeStatus() {
            delete this.changeStatusForm.title;
            this.changeStatusVacancy(this.changeStatusForm);
            this.modal('VacancyChangeStatusPopup');
            this.getVacancies();
        }
    },
    created() {
        this.getVacancies();
    }
}
</script>

<style scoped>

</style>
