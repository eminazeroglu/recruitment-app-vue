import CustomStore from "devextreme/data/custom_store";
import vacancyStatusService from "../../services/vacancyStatus.service";

const VacancyStatusStore = {
    namespaced: true,

    /* State */
    state: {
        vacancyStatus: {},
        vacancyStatuses: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.vacancyStatus = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.vacancyStatuses = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get VacancyStatuses
         * */
        getVacancyStatuses({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return vacancyStatusService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get VacancyStatus
         * */
        getVacancyStatus({commit}, payload) {
            return vacancyStatusService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select VacancyStatuses
         * */
        getSelectVacancyStatuses({commit}, payload = {}) {
            return vacancyStatusService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set VacancyStatus
         * */
        setVacancyStatus({commit}, payload) {
            if (payload.id)
                return vacancyStatusService.put(payload.id, payload);
            return vacancyStatusService.post(null, payload);
        },
        /*
         * Action VacancyStatus
         * */
        actionVacancyStatus({commit}, payload) {
            return vacancyStatusService.post('action', payload);
        },
        /*
         * Delete VacancyStatus
         * */
        deleteVacancyStatus({commit}, payload) {
            return vacancyStatusService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default VacancyStatusStore;
