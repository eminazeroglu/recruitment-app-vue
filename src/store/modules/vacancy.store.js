import CustomStore from "devextreme/data/custom_store";
import vacancyService from "../../services/vacancy.service";

const VacancyStore = {
    namespaced: true,

    /* State */
    state: {
        vacancy: {},
        vacancies: []
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
         * Get Vacancy
         * */
        getVacancy({commit}, payload) {
            return vacancyService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
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
         * Action Vacancy
         * */
        actionVacancy({commit}, payload) {
            return vacancyService.post('action', payload);
        },
        /*
         * Delete Vacancy
         * */
        deleteVacancy({commit}, payload) {
            return vacancyService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default VacancyStore;
