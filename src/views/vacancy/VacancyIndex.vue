<template>
    <page>
        <page-head>
            <div class="flex space-x-5">
                <app-button property="warning" icon="icon-filter" @click="filterModal">
                    {{ translate('button.Filter') }}
                </app-button>
                <app-button property="danger" icon="icon-cancel" v-if="Object.keys(filterQuery).map(i => filterQuery[i] !== null).includes(true)" @click="filterReset">
                    {{ translate('button.Reset') }}
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
                    <badge property="success" v-if="list.row.status.key === 'published'">
                        {{ list.row.status.name }}
                    </badge>
                    <badge v-else-if="list.row.status.key === 'draft'">
                        {{ list.row.status.name }}
                    </badge>
                    <badge property="dark" v-else-if="list.row.status.key === 'completed'">
                        {{ list.row.status.name }}
                    </badge>
                    <badge property="danger" v-else-if="list.row.status.key === 'canceled'">
                        {{ list.row.status.name }}
                    </badge>
                </div>
                <div slot="actionSlot" slot-scope="list">
                    <dropdown v-if="can(permission + '.action')">
                        <dropdown-button :arrow="false" :scroll-has="true" style="padding: 0; width: 30px; height: 30px; justify-content: center">
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
                            <dropdown-item :style="dropdownItemStyle" @click="changeRecruitPopup(list.row)">
                                <i class="icon-user-check"></i>
                                {{ translate('button.ChangeRecruit') }}
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
                            <form-tree-select :clearable="false" :options="select_vacancyPublishStatuses" v-model="changeStatusForm.status_id"/>
                        </form-group>

                        <app-button property="success" class="justify-center">
                            {{ translate('button.Save') }}
                        </app-button>
                    </grid>
                </form>
            </modal-body>
        </modal>
        <!-- #Change Status Popup -->

        <!-- Recruit Popup -->
        <modal id="VacancyChangeRecruitPopup" size="xs" modal-box-style="overflow: initial">
            <modal-head>
                <modal-title>{{ changeRecruitForm.title }}</modal-title>
            </modal-head>
            <modal-body style="overflow: initial">
                <form @submit.prevent="changeRecruit">
                    <grid>
                        <form-group :label="translateKey + '.Label.Hr'">
                            <form-tree-select :clearable="false" displayExpr="fullname" :options="select_recruiters" v-model="changeRecruitForm.user_id"/>
                        </form-group>

                        <app-button property="success" class="justify-center">
                            {{ translate('button.Save') }}
                        </app-button>
                    </grid>
                </form>
            </modal-body>
        </modal>
        <!-- #Recruit Popup -->

        <!-- Filter Popup -->
        <modal id="VacancyFilterPopup" size="xs" modal-box-style="overflow: initial">
            <modal-head>
                <modal-title>{{ translate(translateKey + '.Label.Filter') }}</modal-title>
            </modal-head>
            <modal-body style="overflow: initial">
                <form @submit.prevent="filter">
                    <grid>
                        <form-group :label="translateKey + '.Label.Code'">
                            <form-text v-model="filterQuery.code"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Name'">
                            <form-text v-model="filterQuery.name"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Hr'">
                            <form-tree-select displayExpr="fullname" :options="select_recruiters" v-model="filterQuery.user_id"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.City'">
                            <form-tree-select :options="select_cities" v-model="filterQuery.city_id"/>
                        </form-group>

                        <form-group :label="translateKey + '.Label.Profession'">
                            <form-tree-select :options="listProfessions" v-model="filterQuery.profession_id"/>
                        </form-group>

                        <app-button property="success" class="justify-center">
                            {{ translate('button.Search') }}
                        </app-button>
                    </grid>
                </form>
            </modal-body>
        </modal>
        <!-- #Filter Popup -->
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

const changeRecruitForm = () => {
    return {
        title: null,
        id: null,
        user_id: null
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
            changeRecruitForm: changeRecruitForm(),
            filterQuery: {
                code: null,
                name: null,
                user_id: null,
                city_id: null,
                profession_id: null,
            },
            columns: [
                {
                    caption: translateKey + '.Label.Code',
                    dataField: 'code',
                    show: true,
                    width: 100,
                    alignment: 'center'
                },
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
        ...mapState('VacancyPublishStatusStore', ['select_vacancyPublishStatuses']),
        ...mapState('UserStore', ['select_recruiters']),
        ...mapState('CityStore', ['select_cities']),
        ...mapState('ProfessionStore', ['listProfessions']),
        permission() {
            return this.currentPage.permission;
        }
    },
    methods: {
        ...mapActions('VacancyStore', ['getVacancies', 'changeStatusVacancy', 'changeRecruitVacancy']),
        ...mapActions('VacancyPublishStatusStore', ['getSelectVacancyPublishStatuses']),
        ...mapActions('UserStore', ['getSelectRecruiters']),
        ...mapActions('CityStore', ['getSelectCities']),
        ...mapActions('ProfessionStore', ['getSelectProfessions']),
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
        },
        /*
         * Change Recruit Popup
         * */
        changeRecruitPopup(item) {
            this.modal('VacancyChangeRecruitPopup');
            this.getSelectRecruiters();
            this.changeRecruitForm = changeRecruitForm();
            this.changeRecruitForm.title = item.name;
            this.changeRecruitForm.id = item.id;
            this.changeRecruitForm.user_id = item.user.id;
        },
        /*
         * Change Recruit
         * */
        changeRecruit() {
            delete this.changeRecruitForm.title;
            this.changeRecruitVacancy(this.changeRecruitForm);
            this.modal('VacancyChangeRecruitPopup');
        },
        /*
         * Filter Modal
         * */
        filterModal() {
            this.modal('VacancyFilterPopup');
            this.getSelectUsers({type: 'hr'});
            this.getSelectCities({orderName: 'asc'});
            this.getSelectProfessions({orderName: 'asc'});
        },
        /*
         * Filter
         * */
        filter() {
            this.modal('VacancyFilterPopup');
            this.getVacancies(this.filterQuery);
        },
        /*
         * Filter Reset
         * */
        filterReset() {
            this.filterQuery = Object.keys(this.filterQuery).map(i => this.filterQuery[i] = null)
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
