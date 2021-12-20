import CustomStore from "devextreme/data/custom_store";
import vacancyService from "../../services/vacancy.service";

const VacancyStore = {
    namespaced: true,

    /* State */
    state: {
        vacancyFilters: {},
        vacancy: {},
        vacancies: [],
        select_vacancies: [],
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
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.select_vacancies = payload;
        },
        /*
         * SET LIST CANDIDATE
         * */
        SET_LIST_CANDIDATE(state, payload) {
            state.vacancyCandidates = payload;
        },
        /*
         * SET LIST FILTER
         * */
        SET_LIST_FILTER(state, payload) {
            state.vacancyFilters = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Vacancies
         * */
        getVacancies({commit}, payload = {}) {
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
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Get Vacancy Filter
         * */
        getVacancyFilter({commit}, payload = {}) {
            return vacancyService.post('filter', payload)
            .then(r => {
                commit('SET_LIST_FILTER', r.data.response);
            })
        },
        /*
         * Set Vacancy
         * */
        setVacancy({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = vacancyService.put(payload.id, payload);
            else result = vacancyService.post(null, payload);
            return result.then(r => {
                dispatch('getVacancies');
                dispatch('getSelectVacancies');
                return r.data.response;
            })
        },
        /*
         * Change Status Vacancy
         * */
        changeStatusVacancy({commit, dispatch}, payload) {
            return vacancyService.post('change-status', payload)
            .then(r => {
                dispatch('getVacancies');
                dispatch('getSelectVacancies');
                return r.data.response;
            })
        },
        /*
         * Change Recruit Vacancy
         * */
        changeRecruitVacancy({commit, dispatch}, payload) {
            return vacancyService.post('change-recruit', payload)
            .then(r => {
                dispatch('getVacancies');
                dispatch('getSelectVacancies');
                return r.data.response;
            })
        },
        /*
         * Delete Vacancy
         * */
        deleteVacancy({commit}, payload) {
            return vacancyService.delete(payload)
            .then(r => {
                dispatch('getVacancies');
                dispatch('getSelectVacancies');
                return r.data.response;
            })
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
    },

    /* Getters */
    getters: {}
}

export default VacancyStore;
