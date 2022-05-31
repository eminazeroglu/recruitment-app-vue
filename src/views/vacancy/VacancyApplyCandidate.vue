<template>
    <page>
        <page-head :title="vacancy.name || '&nbsp;'" :sub-title="currentPage.title">
            <div class="flex items-center space-x-3">
                <dropdown v-if="selectedItems.length">
                    <dropdown-button>
                        {{ translate(translateKey + '.Label.Action') }}
                    </dropdown-button>
                    <dropdown-items position="right" class="top-full">
                        <dropdown-item v-for="(i, index) in dropdownMenus" :key="'dropdown' + index" :style="dropdownItemStyle" @click="dropdownAction(i.action)">
                            <i :class="i.icon"></i>
                            {{ i.name }}
                        </dropdown-item>
                    </dropdown-items>
                </dropdown>
                <app-button property="warning" icon="icon-search" @click="filterModal">
                    {{ translate('button.Filter') }}
                </app-button>
            </div>
        </page-head>

        <page-body>
            <data-grid
                :data-source="vacancyCandidates"
                :columns="columns"
                :action-column="false"
                :selection-mode="true"
                :search-visible="false"
                @selectedItem="checkedItems"
                ref="dataGrid"
            >
                <div slot-scope="list" slot="photoTemplate">
                    <img :src="list.row.candidate.photo" class="w-10 h-10 object-cover rounded-full" alt="">
                </div>
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
                <dropdown-items position="left" class="bottom-full">
                    <dropdown-item v-for="(i, index) in dropdownMenus" :key="'dr' + index" :style="dropdownItemStyle" @click="dropdownAction(i.action)">
                        <i :class="i.icon"></i>
                        {{ i.name }}
                    </dropdown-item>
                </dropdown-items>
            </dropdown>
        </div>

        <!-- Candidate Filter Popup -->
        <CandidateFilter/>

        <!-- Change Compatibility Popup -->
        <modal id="CandidateCompatibilityChangePopup" size="xs" modal-box-style="overflow: initial">
            <modal-head>
                <modal-title>{{ translate(translateKey + '.Label.ChangeCompatibility') }}</modal-title>
            </modal-head>
            <modal-body style="overflow: initial">
                <form @submit.prevent="changeCompatibility">
                    <grid>
                        <form-group :label="translateKey + '.Label.VacancyCompatibility'" name="vacancy_compatibility_id">
                            <form-tree-select :clearable="false" :options="select_vacancyCompatibilities" v-model="changeCompatibilityForm.vacancy_compatibility_id"/>
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
                            <form-tree-select :clearable="false" :options="applySelectStatuses" v-model="changeStatusForm.apply_status_id"/>
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

        <!-- Send Pool -->
        <CandidateSendPool @success="successSendModal"/>
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
import CandidateSendPool from "../../common/components/candidate/CandidateSendPool";

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

export default {
    name: "VacancyApplyCandidate",
    components: {CandidateSendPool, CandidateSendMessage, CandidateSendEmail, CandidateFilter},
    data() {
        return {
            translateKey,
            selectedItems: [],
            dataGridInstance: {},
            columns: [
                {
                    caption: translateKey + '.Label.Photo',
                    dataField: 'photo',
                    show: true,
                    slot: 'photoTemplate',
                    alignment: 'center',
                    width: 58
                },
                {
                    caption: translateKey + '.Label.Fullname',
                    dataField: 'fullname',
                    show: true,
                    slot: 'fullnameTemplate'
                },
                {
                    caption: translateKey + '.Label.Email',
                    dataField: 'candidate.email',
                    show: true,
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
        }
    },
    computed: {
        ...mapState('VacancyStore', ['vacancyCandidates', 'vacancy']),
        ...mapState('VacancyCompatibilityStore', ['select_vacancyCompatibilities']),
        ...mapState('ApplyStatusStore', ['applySelectStatuses']),
        dxInstance() {
            return this.$refs.dataGrid.$refs.dataGrid.instance;
        },
        dataSource() {
            return this.dxInstance.getDataSource().items();
        },
        dropdownMenus() {
            return [
                {
                    action: 'compatibility',
                    icon: 'icon-repeat',
                    name: this.translate('button.ChangeCompatibility')
                },
                {
                    action: 'status',
                    icon: 'icon-repeat',
                    name: this.translate('button.ChangeStatus')
                },
                {
                    action: 'email',
                    icon: 'icon-envelope-o',
                    name: this.translate('button.SendEmail')
                },
                {
                    action: 'message',
                    icon: 'icon-chat',
                    name: this.translate('button.SendMessage')
                },
                {
                    action: 'send_pool',
                    icon: 'icon-folder',
                    name: this.translate('button.SendPool')
                }
            ]
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
                    this.closeRouteTab();
                }
            })
        },
        /*
         * Dropdown Action
         * */
        dropdownAction(action) {
            if (action === 'compatibility') this.changeCompatibilityPopup();
            else if (action === 'status') this.changeStatusPopup();
            else if (action === 'email') this.sendEmailPopup();
            else if (action === 'message') this.sendMessagePopup();
            else if (action === 'send_pool') this.sendPoolPopup();
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
            let ids = this.selectedItems.map(i => {
                let find = this.dataSource.find(d => parseFloat(d.id) === parseFloat(i));
                return find.candidate.id;
            });
            this.$eventBus.$emit('CandidateSendEmail', {ids});
        },
        /*
         * Send Message Popup
         * */
        sendMessagePopup() {
            let ids = this.selectedItems.map(i => {
                let find = this.dataSource.find(d => parseFloat(d.id) === parseFloat(i));
                return find.candidate.id;
            });
            this.$eventBus.$emit('CandidateSendMessage', {ids});
        },
        /*
         * Send Pool Popup
         * */
        sendPoolPopup() {
            let ids = this.selectedItems.map(i => {
                let find = this.dataSource.find(d => parseFloat(d.id) === parseFloat(i));
                return find.candidate.id;
            });
            this.$eventBus.$emit('CandidateSendPool', {ids});
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
