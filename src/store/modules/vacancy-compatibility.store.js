import CustomStore from "devextreme/data/custom_store";
import vacancyCompatibilityService from "../../services/vacancyCompatibility.service";

const VacancyCompatibilityStore = {
    namespaced: true,

    /* State */
    state: {
        vacancyCompatibility: {},
        vacancyCompatibilities: []
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
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set VacancyCompatibility
         * */
        setVacancyCompatibility({commit}, payload) {
            if (payload.id)
                return vacancyCompatibilityService.put(payload.id, payload);
            return vacancyCompatibilityService.post(null, payload);
        },
        /*
         * Action VacancyCompatibility
         * */
        actionVacancyCompatibility({commit}, payload) {
            return vacancyCompatibilityService.post('action', payload);
        },
        /*
         * Delete VacancyCompatibility
         * */
        deleteVacancyCompatibility({commit}, payload) {
            return vacancyCompatibilityService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default VacancyCompatibilityStore;
