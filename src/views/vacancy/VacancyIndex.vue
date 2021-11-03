<template>
    <page>
        <page-head>
            <div class="flex space-x-5">
                <app-button property="warning" icon="icon-filter" @click="createModal">
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
                    <badge property="success" v-if="list.row.status.key === 'active'">{{ list.row.status.name }}</badge>
                    <badge v-if="list.row.status.key === 'draft'">{{ list.row.status.name }}</badge>
                    <badge property="dark" v-if="list.row.status.key === 'archive'">{{ list.row.status.name }}</badge>
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
                            <dropdown-item :style="dropdownItemStyle">
                                <i class="icon-repeat"></i>
                                {{ translate('button.ChangeStatus') }}
                            </dropdown-item>
                            <dropdown-item :style="dropdownItemStyle" :route="{name: 'vacancy.clone', params: {id: list.row.id}}">
                                <i class="icon-clone"></i>
                                {{ translate('button.Copy') }}
                            </dropdown-item>
                        </dropdown-items>
                    </dropdown>
<!--                    <app-button
                        v-if="can(permission + '.update')"
                        :route="{name: 'vacancy.form', params: {id: list.row.id}}"
                        :sm="true"
                        :title="translate('button.Edit')"
                        icon="icon-edit-2"
                        property="primary"
                    />

                    <app-button
                        v-if="can(permission + '.action') && list.row.apply_candidates_count > 0"
                        :route="{name: 'vacancy.apply', params: {id: list.row.id}}"
                        :sm="true"
                        :title="translate('button.Candidates')"
                        icon="icon-users"
                        property="warning"
                    />

                    <app-button
                        v-if="can(permission + '.delete')"
                        :sm="true"
                        @click="remove(list.row.id)"
                        :title="translate('button.Delete')"
                        icon="icon-trash-2"
                        property="danger"
                    />-->

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

const translateKey = 'crm.Vacancy';

export default {
    name: "VacancyIndex",
    data() {
        return {
            translateKey,
            modelShow: false,
            dropdownItemStyle: 'justify-content: flex-start; text-align: left; align-items: center',
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
                    width: 100,
                    alignment: 'center'
                },
            ],
        }
    },
    computed: {
        ...mapState('VacancyStore', ['vacancies']),
        permission() {
            return this.currentPage.permission;
        }
    },
    methods: {
        ...mapActions('VacancyStore', ['getVacancies', 'actionVacancy', 'deleteVacancy']),
        /*
         * Remove
         * */
        remove(id) {
            this.alert().then(r => this.deleteVacancy(id).then(r => this.getVacancies()))
        },
        /*
         * Action
         * */
        action(item, type) {
            let action = item.action[type] ? 0 : 1;
            this.actionVacancy({id: item.id, type, action}).then(r => this.getVacancies())
        },
    },
    created() {
        this.getVacancies();
    }
}
</script>

<style scoped>

</style>
