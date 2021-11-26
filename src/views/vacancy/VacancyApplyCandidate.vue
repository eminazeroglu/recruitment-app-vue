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
                :action-column="false"
                :selection-mode="true"
                :search-visible="false"
                :remote-operations="false"
                @selectedItem="checkedItems"
                :instance="'dataGridTable'"
                ref="dataGrid"
            >
                <div slot-scope="list" slot="fullnameTemplate">
                    <router-link class="text-blue-700 underline" :to="{name: 'candidate.profile', params: {id: list.row.candidate.id}}">
                        {{ list.row.candidate.fullname }}
                    </router-link>
                </div>
            </data-grid>
        </page-body>

        <div class="mt-5" v-if="selectedItems.length">
            <dropdown>
                <dropdown-button>
                    {{ translate(translateKey + '.Label.Action') }}
                </dropdown-button>
                <dropdown-items position="left">
                    <dropdown-item :style="dropdownItemStyle" @click="changeCompatibilityPopup()">
                        <i class="icon-repeat"></i>
                        {{ translate('button.ChangeCompatibility') }}
                    </dropdown-item>
                    <dropdown-item :style="dropdownItemStyle" @click="changeStatusPopup()">
                        <i class="icon-repeat"></i>
                        {{ translate('button.ChangeStatus') }}
                    </dropdown-item>
                    <dropdown-item :style="dropdownItemStyle" @click="sendEmailPopup()">
                        <i class="icon-envelope-o"></i>
                        {{ translate('button.SendEmail') }}
                    </dropdown-item>
                    <dropdown-item :style="dropdownItemStyle" @click="sendMessagePopup()">
                        <i class="icon-chat"></i>
                        {{ translate('button.SendMessage') }}
                    </dropdown-item>
                </dropdown-items>
            </dropdown>
        </div>

        <div class="mt-5">
            <CandidateFilter/>
        </div>

        <!-- Change Compatibility Popup -->
        <modal id="CandidateCompatibilityChangePopup" size="xs" modal-box-style="overflow: initial">
            <modal-head>
                <modal-title>{{ translate(translateKey + '.Label.ChangeCompatibility') }}</modal-title>
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
                <modal-title>{{ translate(translateKey + '.Label.ChangeStatus') }}</modal-title>
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

        <!-- Send Email -->
        <CandidateSendEmail @success="successSendModal"/>

        <!-- Send Message -->
        <CandidateSendMessage @success="successSendModal"/>
    </page>
</template>

<script>
/*
 * Import Components
 * */
import {mapActions, mapState} from 'vuex';
import CandidateFilter from "../../common/components/candidate/CandidateFilter";
import CandidateSendEmail from "../../common/components/candidate/CandidateSendEmail";
import CandidateSendMessage from "../../common/components/candidate/CandidateSendMessage";

const translateKey = 'crm.VacancyCandidate';

const changeCompatibilityForm = (item = {}) => {
    return {
        ids: item.ids || null,
        vacancy_compatibility_id: item.vacancy_compatibility_id || null
    }
}

const changeStatusForm = (item = {}) => {
    return {
        ids: item.ids || null,
        apply_status_id: item.apply_status_id || null
    }
}

const sendMessageForm = (item = {}) => {
    return {
        ids: item.ids || null,
        message: null
    }
}

export default {
    name: "VacancyApplyCandidate",
    components: {CandidateSendMessage, CandidateSendEmail, CandidateFilter},
    data() {
        return {
            translateKey,
            selectedItems: [],
            dataGridInstance: {},
            columns: [
                {
                    caption: translateKey + '.Label.Fullname',
                    dataField: 'fullname',
                    show: true,
                    slot: 'fullnameTemplate'
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
            changeStatusForm: changeStatusForm(),
            sendMessageForm: sendMessageForm(),
        }
    },
    computed: {
        ...mapState('VacancyStore', ['vacancyCandidates', 'vacancy']),
        ...mapState('VacancyCompatibilityStore', ['vacancyCompatibilities']),
        ...mapState('ApplyStatusStore', ['applyStatuses']),
        dxInstance() {
            return this.$refs.dataGrid.$refs.dataGrid.instance;
        }
    },
    methods: {
        ...mapActions('VacancyStore', ['getVacancyCandidates', 'getVacancy', 'setApplyCandidateCompatibility', 'setApplyCandidateStatus', 'sendApplyCandidateEmail', 'sendApplyCandidateMessage']),
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
        changeCompatibilityPopup() {
            this.modal('CandidateCompatibilityChangePopup');
            this.getSelectVacancyCompatibilities();
            console.log(this.selectedItems);
            this.changeCompatibilityForm = changeCompatibilityForm({
                ids: this.selectedItems,
                vacancy_compatibility_id: null,
            });
        },
        /*
         * Change Compatibility
         * */
        changeCompatibility() {
            this.setApplyCandidateCompatibility(this.changeCompatibilityForm)
            .then(r => {
                if (r) {
                    this.dxInstance.clearSelection();
                    this.modal('CandidateCompatibilityChangePopup');
                    this.getById();
                }
            })
        },
        /*
         * Change Status Popup
         * */
        changeStatusPopup() {
            this.modal('CandidateStatusChangePopup');
            this.getSelectApplyStatuses();
            this.changeStatusForm = changeStatusForm({
                ids: this.selectedItems,
                apply_status_id: null,
            });
        },
        /*
         * Change Status
         * */
        changeStatus() {
            this.setApplyCandidateStatus(this.changeStatusForm)
            .then(r => {
                if (r) {
                    this.dxInstance.clearSelection();
                    this.modal('CandidateStatusChangePopup');
                    this.getById();
                }
            })
        },
        /*
         * Send Email Popup
         * */
        sendEmailPopup() {
            this.$eventBus.$emit('CandidateSendEmail', this.selectedItems);
        },
        /*
         * Send Message Popup
         * */
        sendMessagePopup() {
            this.$eventBus.$emit('CandidateSendMessage', this.selectedItems);
        },
        /*
         * Success Send Email
         * */
        successSendModal() {
            this.getById();
            this.dxInstance.clearSelection();
        },
        /*
         * Checked Items
         * */
        checkedItems(item) {
            this.selectedItems = item.map(i => i.id);
        },
    },
    created() {
        this.getById();
    },
}
</script>

<style scoped>

</style>
