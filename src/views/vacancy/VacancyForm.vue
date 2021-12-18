<template>
    <page>
        <page-head>
            <div class="flex space-x-5">
                <app-button property="success" icon="icon-save">
                    {{ translate('button.Save') }}
                </app-button>
            </div>
        </page-head>
        <page-body>
            <form @submit.prevent="submit">
                <grid cols="12" space="20">
                    <grid-col col="8">
                        <card>
                            <card-head :title="translate(translateKey + '.VacancyInfo')"/>
                            <card-body>
                                <grid>
                                    <grid cols="2">
                                        <form-group
                                            :label="translate(translateKey + '.Name')"
                                            name="name"
                                        >
                                            <form-text v-model="form.name"/>
                                        </form-group>
                                        <form-group
                                            :label="translate(translateKey + '.VacancyCount')"
                                            name="vacancy_count"
                                        >
                                            <form-text v-model="form.vacancy_count"/>
                                        </form-group>
                                    </grid>

                                    <grid cols="2">
                                        <form-group
                                            :label="translate(translateKey + '.Hr')"
                                            name="user_id"
                                        >
                                            <form-tree-select :options="select_recruiters" displayExpr="fullname" v-model="form.user_id"/>
                                        </form-group>

                                        <form-group
                                            :label="translate(translateKey + '.City')"
                                            name="city_id"
                                        >
                                            <form-tree-select :options="cities" v-model="form.city_id"/>
                                        </form-group>

                                        <form-group
                                            :label="translate(translateKey + '.Profession')"
                                            name="profession_id"
                                        >
                                            <form-tree-select :options="listProfessions" v-model="form.profession_id"/>
                                        </form-group>

                                        <form-group
                                            :label="translate(translateKey + '.VacancyStatus')"
                                            name="vacancy_status_id"
                                        >
                                            <form-tree-select :options="vacancyStatuses" v-model="form.vacancy_status_id"/>
                                        </form-group>

                                        <form-group
                                            :label="translate(translateKey + '.Address')"
                                            name="address"
                                        >
                                            <form-text v-model="form.address"/>
                                        </form-group>


                                        <form-group
                                            :label="translate(translateKey + '.Salary')"
                                            name="address"
                                            :border="false"
                                        >
                                            <grid cols="2">
                                                <form-group>
                                                    <form-number :placeholder="translate(translateKey + '.SalaryMin')" v-model="form.salary_min"/>
                                                </form-group>
                                                <form-group>
                                                    <form-number :placeholder="translate(translateKey + '.SalaryMax')" v-model="form.salary_max"/>
                                                </form-group>
                                            </grid>
                                        </form-group>


                                        <grid cols="2">
                                            <form-group
                                                :label="translate(translateKey + '.StartDate')"
                                                name="start_date"
                                            >
                                                <form-date v-model="form.start_date"/>
                                            </form-group>

                                            <form-group
                                                :label="translate(translateKey + '.EndDate')"
                                                name="end_date"
                                            >
                                                <form-date v-model="form.end_date"/>
                                            </form-group>
                                        </grid>

                                    </grid>

                                    <form-group
                                        :label="translate(translateKey + '.Description')"
                                        name="description"
                                    >
                                        <form-html-editor
                                            type="simple"
                                            height="300"
                                            v-model="form.description"
                                        />
                                    </form-group>

                                    <form-group
                                        :label="translate(translateKey + '.Requirement')"
                                        name="requirement"
                                    >
                                        <form-html-editor
                                            type="simple"
                                            height="300"
                                            v-model="form.requirement"
                                        />
                                    </form-group>

                                    <form-group
                                        :label="translate(translateKey + '.Commitment')"
                                        name="commitment"
                                    >
                                        <form-html-editor
                                            type="simple"
                                            height="300"
                                            v-model="form.commitment"
                                        />
                                    </form-group>


                                </grid>
                            </card-body>
                        </card>
                    </grid-col>

                    <grid-col col="4">
                        <card>
                            <card-head :title="translate(translateKey + '.SearchInfo')"/>
                            <card-body>
                                <grid>

                                    <form-group
                                        :label="translate(translateKey + '.FamilyStatus')"
                                        name="family_status_id"
                                    >
                                        <form-tree-select :options="familyStatuses" v-model="form.family_status_id"/>
                                    </form-group>

                                    <form-group
                                        :label="translate(translateKey + '.EducationDegree')"
                                        name="education_degree_id"
                                    >
                                        <form-tree-select :options="educationDegrees" v-model="form.education_degree_id"/>
                                    </form-group>

                                    <form-group
                                        :label="translate(translateKey + '.VacancyPublishDate')"
                                        name="vacancy_publish_status_id"
                                    >
                                        <form-tree-select :options="vacancyPublishStatuses" v-model="form.vacancy_publish_status_id"/>
                                    </form-group>

                                    <form-group
                                        :label="translate(translateKey + '.VacancyPublishDate')"
                                        name="vacancy_publish_status_id"
                                    >
                                        <form-tree-select :options="vacancyPublishStatuses" v-model="form.vacancy_publish_status_id"/>
                                    </form-group>

                                </grid>
                            </card-body>
                        </card>
                    </grid-col>
                </grid>
            </form>
        </page-body>
    </page>
</template>

<script>
/*
 * Import Components
 * */
import {mapState, mapActions} from 'vuex';

const translateKey = 'crm.Vacancy.Label'
const formObject = (item = {}) => {
    return {
        id: item.id || null,
        user_id: item.user_id || null, //
        department_id: item.department_id || null,
        city_id: item.city_id || null, //
        vacancy_status_id: item.vacancy_status_id || null, //
        family_status_id: item.family_status_id || null, //
        education_degree_id: item.education_degree_id || null, //
        profession_id: item.profession_id || null, //
        vacancy_publish_status_id: item.vacancy_publish_status_id || null, //
        vacancy_count: item.vacancy_count || 1, //
        name: item.name || null, //
        description: item.description || null, //
        requirement: item.requirement || null, //
        commitment: item.commitment || null, //
        address: item.address || null, //
        salary_min: item.salary_min || null,//
        salary_max: item.salary_max || null,//
        start_date: item.start_date || null,
        end_date: item.end_date || null,//
        age_start: item.age_start || null,
        age_end: item.age_end || null,
        gender: item.gender || 'both',
        military: item.military || '',
        education_continue: item.education_continue || null,
        score_range_min: item.score_range_min || null,
        score_range_max: item.score_range_max || null,
        work_experience: item.work_experience || null,
        experience_min: item.experience_min || null,
        experience_max: item.experience_max || null,
        driving_license: item.driving_license || null,
    }
}


export default {
    name: "VacancyForm",
    data() {
        return {
            translateKey,
            form: formObject()
        }
    },
    created() {
        this.getById();
    },
    computed: {
        ...mapState('UserStore', ['select_recruiters']),
        ...mapState('VacancyStore', ['vacancy', 'vacancyFilters']),
        ...mapState('CityStore', ['cities']),
        ...mapState('VacancyStatusStore', ['vacancyStatuses']),
        ...mapState('ProfessionStore', ['listProfessions']),
        ...mapState('FamilyStatusStore', ['familyStatuses']),
        ...mapState('EducationDegreeStore', ['educationDegrees']),
        ...mapState('VacancyPublishStatusStore', ['vacancyPublishStatuses']),
        ...mapState('VacancyPublishStatusStore', ['vacancyPublishStatuses']),
    },
    methods: {
        ...mapActions('UserStore', ['getSelectRecruiters']),
        ...mapActions('VacancyStore', ['getVacancy', 'getVacancyFilter']),
        ...mapActions('CityStore', ['getSelectCities']),
        ...mapActions('VacancyStatusStore', ['getSelectVacancyStatuses']),
        ...mapActions('ProfessionStore', ['getSelectProfessions']),
        ...mapActions('FamilyStatusStore', ['getSelectFamilyStatuses']),
        ...mapActions('EducationDegreeStore', ['getSelectEducationDegrees']),
        /*
         * Get ById
         * */
        getById() {
            this.form = formObject();
            this.getSelectRecruiters();
            this.getSelectCities();
            this.getVacancyFilter();
            this.getSelectVacancyStatuses();
            this.getSelectProfessions();
            this.getSelectFamilyStatuses();
            this.getSelectEducationDegrees();
            this.getSelectVacancyPublishStatuses();
            if (this.$route.params.id) {
                this.getVacancy(this.$route.params.id)
                .then(r => {
                    this.form = formObject(this.vacancy);
                })
            }
        },
        /*
         * Submit
         * */
        submit() {

        }
    }
}
</script>

<style scoped>

</style>
