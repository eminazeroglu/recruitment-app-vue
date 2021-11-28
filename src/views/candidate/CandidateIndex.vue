<template>
    <page>
        <page-head :title="pageTitle" :sub-title="pageSubTitle">
            <div class="flex items-center space-x-3">
                <dropdown v-if="selectedItems.length">
                    <dropdown-button>
                        {{ translate(translateKey + '.Label.Action') }}
                    </dropdown-button>
                    <dropdown-items position="left" class="top-full">
                        <dropdown-item :style="dropdownItemStyle" v-for="i in dropdownMenus" @click="dropdownAction(i.action)">
                            <i :class="i.icon"></i>
                            {{ i.name }}
                        </dropdown-item>
                    </dropdown-items>
                </dropdown>

                <app-button property="gray" icon="icon-reload" @click="reload">
                    {{ translate('button.Reload') }}
                </app-button>

                <app-button property="warning" icon="icon-search" @click="filterModal">
                    {{ translate('button.Filter') }}
                </app-button>
            </div>
        </page-head>

        <page-body>
            <data-grid
                :data-source="datasource"
                :columns="columns"
                :action-column="false"
                :search-visible="false"
                :selection-mode="true"
                @selectedItem="checkedItems"
                ref="dataGrid"
            >
                <div slot="photoTemplate" slot-scope="list">
                    <img :src="list.row.photo" class="w-10 h-10 object-cover rounded-full" alt="">
                </div>
                <div slot-scope="list" slot="fullnameTemplate">
                    <router-link class="text-blue-700 underline" :to="{name: 'candidate.profile', params: {id: list.row.id}}">
                        {{ list.row.fullname }}
                    </router-link>
                </div>
            </data-grid>

            <div class="mt-5" v-if="selectedItems.length">
                <dropdown>
                    <dropdown-button>
                        {{ translate(translateKey + '.Label.Action') }}
                    </dropdown-button>
                    <dropdown-items position="left" class="bottom-full">
                        <dropdown-item :style="dropdownItemStyle" v-for="i in dropdownMenus" @click="dropdownAction(i.action)">
                            <i :class="i.icon"></i>
                            {{ i.name }}
                        </dropdown-item>
                    </dropdown-items>
                </dropdown>
            </div>
        </page-body>

        <!-- Filter -->
        <CandidateFilter/>

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
import CandidateSendEmail from "../../common/components/candidate/CandidateSendEmail";
import CandidateSendMessage from "../../common/components/candidate/CandidateSendMessage";
import CandidateFilter from "../../common/components/candidate/CandidateFilter";
import CandidateSendPool from "../../common/components/candidate/CandidateSendPool";

const translateKey = 'crm.Candidate';

export default {
    name: "CandidateIndex",
    components: {CandidateSendPool, CandidateFilter, CandidateSendMessage, CandidateSendEmail},
    data() {
        return {
            translateKey,
            modelShow: false,
            dropdownItemStyle: 'justify-content: flex-start; text-align: left; align-items: center',
            datasource: [],
            columns: [
                {
                    caption: translateKey + '.Label.Photo',
                    dataField: 'photo',
                    show: true,
                    width: 58,
                    alignment: 'center',
                    slot: 'photoTemplate'
                },
                {
                    caption: translateKey + '.Label.Fullname',
                    dataField: 'fullname',
                    show: true,
                    slot: 'fullnameTemplate'
                },
                {
                    caption: translateKey + '.Label.Phone',
                    dataField: 'phone',
                    show: true,
                    alignment: 'center',
                    width: 150
                },
                {
                    caption: translateKey + '.Label.Email',
                    dataField: 'email',
                    show: true,
                    alignment: 'center',
                    width: 200
                },
                {
                    caption: translateKey + '.Label.Birthday',
                    dataField: 'date_of_birth',
                    show: true,
                    alignment: 'center',
                    width: 130
                },
                {
                    caption: translateKey + '.Label.Age',
                    dataField: 'age',
                    show: true,
                    alignment: 'center',
                    width: 60
                },
                {
                    caption: translateKey + '.Label.Gender',
                    dataField: 'gender',
                    show: true,
                    alignment: 'center',
                    width: 100
                },
                {
                    caption: translateKey + '.Label.Profession',
                    dataField: 'profession.name',
                    show: true,
                    alignment: 'center',
                    width: 180
                },
                {
                    caption: translateKey + '.Label.City',
                    dataField: 'city.name',
                    show: true,
                    alignment: 'center',
                    width: 180
                },
                {
                    caption: translateKey + '.Label.Nationality',
                    dataField: 'nationality.name',
                    show: true,
                    alignment: 'center',
                    width: 180
                },
            ],
            selectedItems: [],
        }
    },
    computed: {
        ...mapState('CandidateStore', ['candidates']),
        pageTitle() {
            return this.currentPage.title;
        },
        pageSubTitle() {
            return null;
        },
        permission() {
            return this.currentPage.permission;
        },
        dxInstance() {
            return this.$refs.dataGrid.$refs.dataGrid.instance;
        },
        componentType() {
            return 'candidate';
        },
        dropdownMenus() {
            const items = [
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
            ];

            if (this.componentType === 'pool_candidate') {
                items.push({
                    action: 'remove_pool',
                    icon: 'icon-folder',
                    name: this.translate('button.RemovePool')
                })
            }

            return items;
        }
    },
    methods: {
        ...mapActions('CandidateStore', ['getCandidates', 'setCandidate', 'actionCandidate', 'deleteCandidate']),
        /*
         * Reload
         * */
        reload() {
            this.getItems();
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
         * Send Pool Popup
         * */
        sendPoolPopup() {
            this.$eventBus.$emit('CandidateSendPool', this.selectedItems);
        },
        /*
         * Dropdown Action
         * */
        dropdownAction(action) {
            if (action === 'email') this.sendEmailPopup();
            else if (action === 'message') this.sendMessagePopup();
            else if (action === 'send_pool') this.sendPoolPopup();
            else if (action === 'remove_pool' && this.componentType === 'pool_candidate') this.removePoolPopup();
        },
        /*
         * Filter Modal
         * */
        filterModal() {
            this.modal('CandidateFilterModal')
        },
        /*
         * Success Send Email
         * */
        successSendModal() {
            this.getItems();
            this.dxInstance.clearSelection();
        },
        /*
         * Checked Items
         * */
        checkedItems(item) {
            this.selectedItems = item.map(i => i.id);
        },
        /*
         * Get Items
         * */
        getItems() {
            this.getCandidates()
            .then(r => {
                this.datasource = this.candidates;
            })
        }
    },
    created() {
        this.getItems();
    }
}
</script>

<style scoped>

</style>
