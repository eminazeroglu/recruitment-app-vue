import CustomStore from "devextreme/data/custom_store";
import vacancyCompatibilityService from "../../services/vacancyCompatibility.service";
import vacancyService from "../../services/vacancy.service";

const VacancyCompatibilityStore = {
    namespaced: true,

    /* State */
    state: {
        vacancyCompatibility: {},
        vacancyCompatibilities: [],
        select_vacancyCompatibilities: [],
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.vacancyCompatibility = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.vacancyCompatibilities = payload;
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.select_vacancyCompatibilities = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get VacancyCompatibilities
         * */
        getVacancyCompatibilities({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return vacancyCompatibilityService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get VacancyCompatibility
         * */
        getVacancyCompatibility({commit}, payload) {
            return vacancyCompatibilityService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select VacancyCompatibilities
         * */
        getSelectVacancyCompatibilities({commit}, payload = {}) {
            return vacancyCompatibilityService.get(null, payload)
            .then(r => {
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set VacancyCompatibility
         * */
        setVacancyCompatibility({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = vacancyCompatibilityService.put(payload.id, payload);
            else result = vacancyCompatibilityService.post(null, payload);
            return result.then(r => {
                dispatch('getVacancyCompatibilities');
                dispatch('getSelectVacancyCompatibilities');
                return r.data.response;
            })
        },
        /*
         * Action VacancyCompatibility
         * */
        actionVacancyCompatibility({commit, dispatch}, payload) {
            return vacancyCompatibilityService.post('action', payload)
            .then(r => {
                dispatch('getVacancyCompatibilities');
                dispatch('getSelectVacancyCompatibilities');
                return r.data.response;
            })
        },
        /*
         * Delete VacancyCompatibility
         * */
        deleteVacancyCompatibility({commit, dispatch}, payload) {
            return vacancyCompatibilityService.delete(payload)
            .then(r => {
                dispatch('getVacancyCompatibilities');
                dispatch('getSelectVacancyCompatibilities');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default VacancyCompatibilityStore;
