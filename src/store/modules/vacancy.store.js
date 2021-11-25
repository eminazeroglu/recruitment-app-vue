import CustomStore from "devextreme/data/custom_store";
import vacancyService from "../../services/vacancy.service";

const VacancyStore = {
    namespaced: true,

    /* State */
    state: {
        vacancy: {},
        vacancies: [],
        vacancyCandidates: [],
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.vacancy = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.vacancies = payload;
        },
        /*
         * SET LIST CANDIDATE
         * */
        SET_LIST_CANDIDATE(state, payload) {
            state.vacancyCandidates = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Vacancies
         * */
        getVacancies({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return vacancyService.get(null, {datatable: true, ...loadOptions, ...payload})
                    .then(r => {
                        const data = r.data.response;
                        return {
                            data: data.data,
                            totalCount: data.total
                        }
                    })
                }
            })
            commit('SET_LIST', data);
        },
        /*
         * Get Vacancy Candidates
         * */
        getVacancyCandidates({commit}, payload = {}) {
            let vacancy_id = payload.vacancy_id;
            delete payload.vacancy_id;
            if (vacancy_id) {
                const data = new CustomStore({
                    load: function (loadOptions) {
                        return vacancyService.get(vacancy_id + '/candidate', {datatable: true, ...loadOptions, ...payload})
                        .then(r => {
                            const data = r.data.response;
                            return {
                                data: data.data,
                                totalCount: data.total
                            }
                        })
                    }
                })
                commit('SET_LIST_CANDIDATE', data);
            }
        },
        /*
         * Get Vacancy
         * */
        getVacancy({commit}, payload) {
            return vacancyService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
                return r.data.response;
            })
        },
        /*
         * Get Select Vacancies
         * */
        getSelectVacancies({commit}, payload = {}) {
            return vacancyService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Vacancy
         * */
        setVacancy({commit}, payload) {
            if (payload.id)
                return vacancyService.put(payload.id, payload);
            return vacancyService.post(null, payload);
        },
        /*
         * Change Status Vacancy
         * */
        changeStatusVacancy({commit}, payload) {
            return vacancyService.post('change-status', payload);
        },
        /*
         * Change Recruit Vacancy
         * */
        changeRecruitVacancy({commit}, payload) {
            return vacancyService.post('change-recruit', payload);
        },
        /*
         * Delete Vacancy
         * */
        deleteVacancy({commit}, payload) {
            return vacancyService.delete(payload);
        },
        /*
        * Set Apply Candidate Compatibility
        * */
        setApplyCandidateCompatibility({commit}, payload) {
            return vacancyService.post('candidate/compatibility', payload);
        },
        /*
         * Set Apply Candidate Status
         * */
        setApplyCandidateStatus({commit}, payload) {
            return vacancyService.post('candidate/status', payload);
        },
        /*
         * Send Apply Candidate Email
         * */
        sendApplyCandidateEmail({commit}, payload) {
            return vacancyService.post('candidate/send-email', payload);
        },
        /*
         * Send Apply Candidate Message
         * */
        sendApplyCandidateMessage({commit}, payload) {
            return vacancyService.post('candidate/send-message', payload);
        }
    },

    /* Getters */
    getters: {}
}

export default VacancyStore;
