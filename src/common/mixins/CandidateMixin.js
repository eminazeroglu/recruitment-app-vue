import {mapActions, mapState} from 'vuex';

const translateKey = 'crm.Candidate';
export default {
    data() {
        return {
            translateKey,
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
            return 'pool';
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
