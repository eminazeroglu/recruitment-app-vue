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
                :action-column-width="120"
                :action-column-text="translate(translateKey + '.Label.Action')"
            >
                <div slot="actionSlot" slot-scope="list">


                </div>
            </data-grid>
        </page-body>

        <div class="mt-5">
            <candidate-filter />
        </div>
    </page>
</template>

<script>
/*
 * Import Components
 * */
import {mapActions, mapState} from 'vuex';

const translateKey = 'crm.VacancyCandidate';

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
        }
    },
    computed: {
        ...mapState('VacancyStore', ['vacancyCandidates', 'vacancy']),
    },
    methods: {
        ...mapActions('VacancyStore', ['getVacancyCandidates', 'getVacancy']),
        /*
        * Filter Modal
        * */
        filterModal() {
            this.modal('CandidateFilterModal')
        }
    },
    created() {
        this.getVacancy(this.$route.params.id)
        .then(vacancy => {
            if (vacancy.id && vacancy.apply_candidates_count > 0) {
                this.getVacancyCandidates({vacancy_id: vacancy.id});
            }
            else {
                this.$tabs.close();
            }
        })
    }
}
</script>

<style scoped>

</style>
