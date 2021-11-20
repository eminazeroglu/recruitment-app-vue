<template>
    <page>
        <page-head>
            <app-button property="warning" icon="icon-search" @click="filterModal">
                {{ translate('button.Filter') }}
            </app-button>
        </page-head>

        <page-body>
            <data-grid
                :data-source="vacancyCandidates"
                :columns="columns"
                :action-column-width="45"
                :action-column-text="''"
            >
                <div slot="actionSlot" slot-scope="list">
                    <dropdown>
                        <dropdown-button :arrow="false" style="width: 30px; height: 30px; padding: 0; justify-content: center">
                            <i class="icon-ellipsis-v"></i>
                        </dropdown-button>
                        <dropdown-items>
                            <dropdown-item :style="dropdownItemStyle" @click="changeCompatibilityPopup(list.row)">
                                <i class="icon-repeat"></i>
                                {{ translate('button.ChangeCompatibility') }}
                            </dropdown-item>
                            <dropdown-item :style="dropdownItemStyle" @click="changeStatusPopup(list.row)">
                                <i class="icon-repeat"></i>
                                {{ translate('button.ChangeStatus') }}
                            </dropdown-item>
                        </dropdown-items>
                    </dropdown>
                </div>
            </data-grid>
        </page-body>

        <div class="mt-5">
            <candidate-filter/>
        </div>

        <!-- Change Compatibility Popup -->
        <modal id="CandidateCompatibilityChangePopup" size="xs" modal-box-style="overflow: initial">
            <modal-head>
                <modal-title>{{ changeCompatibilityForm.title }}</modal-title>
            </modal-head>
            <modal-body style="overflow: initial">
                <form @submit.prevent="changeCompatibility">
                    <grid>
                        <form-group :label="translateKey + '.Label.VacancyCompatibility'" name="vacancy_compatibility_id">
                            <form-tree-select :clearable="false" :options="vacancyCompatibilities" v-model="changeCompatibilityForm.vacancy_compatibility_id"/>
                        </form-group>

                        <app-button property="success" class="justify-center" type="submit">
                            {{ translate('button.Save') }}
                        </app-button>
                    </grid>
                </form>
            </modal-body>
        </modal>

        <!-- Change Status Popup -->
        <modal id="CandidateStatusChangePopup" size="xs" modal-box-style="overflow: initial">
            <modal-head>
                <modal-title>{{ changeStatusForm.title }}</modal-title>
            </modal-head>
            <modal-body style="overflow: initial">
                <form @submit.prevent="changeStatus">
                    <grid>
                        <form-group :label="translateKey + '.Label.Status'" name="apply_status_id">
                            <form-tree-select :clearable="false" :options="applyStatuses" v-model="changeStatusForm.apply_status_id"/>
                        </form-group>

                        <app-button property="success" class="justify-center" type="submit">
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

const translateKey = 'crm.VacancyCandidate';

const changeCompatibilityForm = (item = {}) => {
    return {
        title: item.title || null,
        id: item.id || null,
        vacancy_compatibility_id: item.vacancy_compatibility_id || null
    }
}

const changeStatusForm = (item = {}) => {
    return {
        title: item.title || null,
        id: item.id || null,
        apply_status_id: item.apply_status_id || null
    }
}

export default {
    name: "VacancyApplyCandidate",
    data() {
        return {
            translateKey,
            columns: [
                {
                    caption: translateKey + '.Label.Fullname',
                    dataField: 'candidate.fullname',
                    show: true
                },
                {
                    caption: translateKey + '.Label.Status',
                    dataField: 'apply_status.name',
                    customizeText: data => data.value || this.translate(translateKey + '.Label.NotSpecified'),
                    show: true,
                    width: 200,
                    alignment: 'center',
                    allowFiltering: false
                },
                {
                    caption: translateKey + '.Label.VacancyCompatibility',
                    dataField: 'vacancy_compatibility.name',
                    customizeText: data => data.value || this.translate(translateKey + '.Label.NotSpecified'),
                    show: true,
                    width: 200,
                    alignment: 'center',
                    allowFiltering: false
                },
                {
                    caption: translateKey + '.Label.ApplyDate',
                    dataField: 'date',
                    show: true,
                    width: 150,
                    alignment: 'center',
                    allowFiltering: false
                },
            ],
            dropdownItemStyle: 'justify-content: flex-start; text-align: left; align-items: center',
            changeCompatibilityForm: changeCompatibilityForm(),
            changeStatusForm: changeStatusForm()
        }
    },
    computed: {
        ...mapState('VacancyStore', ['vacancyCandidates', 'vacancy']),
        ...mapState('VacancyCompatibilityStore', ['vacancyCompatibilities']),
        ...mapState('ApplyStatusStore', ['applyStatuses']),
    },
    methods: {
        ...mapActions('VacancyStore', ['getVacancyCandidates', 'getVacancy', 'setApplyCandidateCompatibility', 'setApplyCandidateStatus']),
        ...mapActions('VacancyCompatibilityStore', ['getSelectVacancyCompatibilities']),
        ...mapActions('ApplyStatusStore', ['getSelectApplyStatuses']),
        /*
         * Get By Id
         * */
        getById() {
            this.getVacancy(this.$route.params.id)
            .then(vacancy => {
                if (vacancy.id && vacancy.apply_candidates_count > 0) {
                    this.getVacancyCandidates({vacancy_id: vacancy.id});
                }
                else {
                    this.$tabs.close();
                }
            })
        },
        /*
         * Filter Modal
         * */
        filterModal() {
            this.modal('CandidateFilterModal')
        },
        /*
         * Change Compatibility Popup
         * */
        changeCompatibilityPopup(item) {
            this.modal('CandidateCompatibilityChangePopup');
            this.getSelectVacancyCompatibilities();
            this.changeCompatibilityForm = changeCompatibilityForm({
                id: item.id,
                vacancy_compatibility_id: item.vacancy_compatibility.id,
                title: item.candidate.fullname
            });
        },
        /*
         * Change Compatibility
         * */
        changeCompatibility() {
            delete this.changeCompatibilityForm.title;
            this.setApplyCandidateCompatibility(this.changeCompatibilityForm)
            .then(r => {
                if (r) {
                    this.modal('CandidateCompatibilityChangePopup');
                    this.getById();
                }
            })
        },
        /*
         * Change Status Popup
         * */
        changeStatusPopup(item) {
            this.modal('CandidateStatusChangePopup');
            this.getSelectApplyStatuses();
            this.changeStatusForm = changeStatusForm({
                id: item.id,
                apply_status_id: item.apply_status.id,
                title: item.candidate.fullname
            });
        },
        /*
         * Change Status
         * */
        changeStatus() {
            delete this.changeStatusForm.title;
            this.setApplyCandidateStatus(this.changeStatusForm)
            .then(r => {
                if (r) {
                    this.modal('CandidateStatusChangePopup');
                    this.getById();
                }
            })
        },
    },
    created() {
        this.getById();
    }
}
</script>

<style scoped>

</style>
