import CustomStore from "devextreme/data/custom_store";
import vacancyPublishStatusService from "../../services/vacancyPublishStatus.service";
import vacancyCompatibilityService from "../../services/vacancyCompatibility.service";

const VacancyPublishStatusStore = {
    namespaced: true,

    /* State */
    state: {
        vacancyPublishStatus: {},
        vacancyPublishStatuses: [],
        select_vacancyPublishStatuses: [],
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.vacancyPublishStatus = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.vacancyPublishStatuses = payload;
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.select_vacancyPublishStatuses = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get VacancyPublishStatuses
         * */
        getVacancyPublishStatuses({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return vacancyPublishStatusService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get VacancyPublishStatus
         * */
        getVacancyPublishStatus({commit}, payload) {
            return vacancyPublishStatusService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select VacancyPublishStatuses
         * */
        getSelectVacancyPublishStatuses({commit}, payload = {}) {
            return vacancyPublishStatusService.get(null, payload)
            .then(r => {
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set VacancyPublishStatus
         * */
        setVacancyPublishStatus({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = vacancyPublishStatusService.put(payload.id, payload);
            else result = vacancyPublishStatusService.post(null, payload);
            return result.then(r => {
                dispatch('getVacancyPublishStatuses');
                dispatch('getSelectVacancyPublishStatuses');
                return r.data.response;
            })
        },
        /*
         * Action VacancyPublishStatus
         * */
        actionVacancyPublishStatus({commit, dispatch}, payload) {
            return vacancyPublishStatusService.post('action', payload)
            .then(r => {
                dispatch('getVacancyPublishStatuses');
                dispatch('getSelectVacancyPublishStatuses');
                return r.data.response;
            })
        },
        /*
         * Delete VacancyPublishStatus
         * */
        deleteVacancyPublishStatus({commit, dispatch}, payload) {
            return vacancyPublishStatusService.delete(payload)
            .then(r => {
                dispatch('getVacancyPublishStatuses');
                dispatch('getSelectVacancyPublishStatuses');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default VacancyPublishStatusStore;
