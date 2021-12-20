import CustomStore from "devextreme/data/custom_store";
import vacancyStatusService from "../../services/vacancyStatus.service";

const VacancyStatusStore = {
    namespaced: true,

    /* State */
    state: {
        vacancyStatus: {},
        vacancyStatuses: [],
        select_vacancyStatuses: [],
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
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.select_vacancyStatuses = payload;
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
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set VacancyStatus
         * */
        setVacancyStatus({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = vacancyStatusService.put(payload.id, payload);
            else result = vacancyStatusService.post(null, payload);
            return result.then(r => {
                dispatch('getVacancyStatuses');
                dispatch('getSelectVacancyStatuses');
                return r.data.response;
            })
        },
        /*
         * Action VacancyStatus
         * */
        actionVacancyStatus({commit, dispatch}, payload) {
            return vacancyStatusService.post('action', payload)
            .then(r => {
                dispatch('getVacancyStatuses');
                dispatch('getSelectVacancyStatuses');
                return r.data.response;
            })
        },
        /*
         * Delete VacancyStatus
         * */
        deleteVacancyStatus({commit, dispatch}, payload) {
            return vacancyStatusService.delete(payload)
            .then(r => {
                dispatch('getVacancyStatuses');
                dispatch('getSelectVacancyStatuses');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default VacancyStatusStore;
