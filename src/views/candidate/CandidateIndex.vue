<template>
    <page>
        <page-head>
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

                <app-button property="warning" icon="icon-search" @click="filterModal">
                    {{ translate('button.Filter') }}
                </app-button>
            </div>
        </page-head>

        <page-body>
            <data-grid
                :data-source="candidates"
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

const modalId = 'createModal';
const translateKey = 'crm.Candidate';

export default {
    name: "CandidateIndex",
    components: {CandidateFilter, CandidateSendMessage, CandidateSendEmail},
    data() {
        return {
            translateKey,
            modalId,
            modelShow: false,
            dropdownItemStyle: 'justify-content: flex-start; text-align: left; align-items: center',
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
        permission() {
            return this.currentPage.permission;
        },
        dxInstance() {
            return this.$refs.dataGrid.$refs.dataGrid.instance;
        },
        dropdownMenus() {
            return [
                {
                    action: 'email',
                    icon: 'icon-envelope-o',
                    name: this.translate('button.SendEmail')
                },
                {
                    action: 'message',
                    icon: 'icon-chat',
                    name: this.translate('button.SendMessage')
                }
            ];
        }
    },
    methods: {
        ...mapActions('CandidateStore', ['getCandidates', 'setCandidate', 'actionCandidate', 'deleteCandidate']),
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
        * Dropdown Action
        * */
        dropdownAction(action) {
              if (action === 'email') this.sendEmailPopup();
              else if (action === 'message') this.sendMessagePopup();
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
            this.getCandidates();
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
        this.getCandidates();
    }
}
</script>

<style scoped>

</style>
