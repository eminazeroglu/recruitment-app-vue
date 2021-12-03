import CandidateSendPool from "../components/candidate/CandidateSendPool";
import CandidateFilter from "../components/candidate/CandidateFilter";
import CandidateSendMessage from "../components/candidate/CandidateSendMessage";
import CandidateSendEmail from "../components/candidate/CandidateSendEmail";
import {mapActions, mapState} from "vuex";

const translateKey = 'crm.Candidate';

export default {
    components: {CandidateSendPool, CandidateFilter, CandidateSendMessage, CandidateSendEmail},
    props: {
        headTitle: {
            default: null
        },
        headSubTitle: {
            default: null
        },
        type: {
            default: null
        },
        params: {
            default: Object
        },
        items: {
            default: Array
        }
    },
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
        ...mapState('PoolStore', ['poolCandidates']),
        pageTitle() {
            return this.headTitle || this.currentPage.title;
        },
        pageSubTitle() {
            return this.headSubTitle || null;
        },
        permission() {
            return this.currentPage.permission;
        },
        dxInstance() {
            return this.$refs.dataGrid ? this.$refs.dataGrid.$refs.dataGrid.instance : null;
        },
        componentType() {
            return this.type || 'candidate';
        },
        dropdownMenus() {
            let items = [
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

            if (this.componentType === 'candidate-profile') {
                items = items.concat([
                    {
                        action: 'offer_vacancy',
                        icon: 'icon-share',
                        name: this.translate('button.OfferVacancy')
                    },
                    {
                        action: 'vacancy_note',
                        icon: 'icon-share',
                        name: this.translate('button.VacancyNotes')
                    },
                    {
                        action: 'candidate_note',
                        icon: 'icon-share',
                        name: this.translate('button.CandidateNotes')
                    },
                    {
                        action: 'exam_result',
                        icon: 'icon-share',
                        name: this.translate('button.ExamResult')
                    }
                ])
            }

            return items;
        }
    },
    watch: {
        params(val) {
            this.getPoolCandidate()
        }
    },
    methods: {
        ...mapActions('CandidateStore', ['getCandidates', 'setCandidate', 'actionCandidate', 'deleteCandidate', 'removeCandidatePool']),
        ...mapActions('PoolStore', ['getPoolCandidates', 'getPool']),
        /*
         * Reload
         * */
        reload() {
            if (this.componentType === 'pool_candidate') {
                this.getPoolCandidate();
            }
            else {
                this.getItems();
            }
        },
        /*
         * Send Email Popup
         * */
        sendEmailPopup(id = null) {
            this.$eventBus.$emit('CandidateSendEmail', {ids: id ? [id] : this.selectedItems, type: this.componentType});
        },
        /*
         * Send Message Popup
         * */
        sendMessagePopup(id = null) {
            this.$eventBus.$emit('CandidateSendMessage', {
                ids: id ? [id] : this.selectedItems,
                type: this.componentType
            });
        },
        /*
         * Send Pool Popup
         * */
        sendPoolPopup(id = null) {
            this.$eventBus.$emit('CandidateSendPool', {ids: id ? [id] : this.selectedItems, type: this.componentType});
        },
        /*
         * Dropdown Action
         * */
        dropdownAction(action, id = null) {
            if (action === 'email') this.sendEmailPopup(id);
            else if (action === 'message') this.sendMessagePopup(id);
            else if (action === 'send_pool') this.sendPoolPopup(id);
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
            if (this.componentType === 'candidate') {
                this.getItems();
                if (this.dxInstance)
                    this.dxInstance.clearSelection();
            }
        },
        /*
         * Checked Items
         * */
        checkedItems(item) {
            this.selectedItems = item.map(i => i.id);
        },
        /*
         * Remove Pool Popup
         * */
        removePoolPopup() {
            this.alert(this.translate('notification.CandidateRemovePoolAlert.Description'))
            .then(r => {
                this.removeCandidatePool({
                    ids: this.selectedItems,
                    pool_id: this.params.id
                })
                .then(r => {
                    if (r) {
                        this.dxInstance.clearSelection();
                        this.getPoolCandidate();
                    }
                })
            })
        },
        getPoolCandidate() {
            if (this.params.id) {
                this.getPoolCandidates({id: this.params.id})
                .then(r => {
                    this.datasource = this.poolCandidates;
                })
            }
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
        if (this.componentType === 'pool_candidate') {
            this.getPoolCandidate();
        }
        else {
            this.getItems();
        }
    }
}
