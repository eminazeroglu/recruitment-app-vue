import CustomStore from "devextreme/data/custom_store";
import vacancyPublishStatusService from "../../services/vacancyPublishStatus.service";

const VacancyPublishStatusStore = {
    namespaced: true,

    /* State */
    state: {
        vacancyPublishStatus: {},
        vacancyPublishStatuses: []
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
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set VacancyPublishStatus
         * */
        setVacancyPublishStatus({commit}, payload) {
            if (payload.id)
                return vacancyPublishStatusService.put(payload.id, payload);
            return vacancyPublishStatusService.post(null, payload);
        },
        /*
         * Action VacancyPublishStatus
         * */
        actionVacancyPublishStatus({commit}, payload) {
            return vacancyPublishStatusService.post('action', payload);
        },
        /*
         * Delete VacancyPublishStatus
         * */
        deleteVacancyPublishStatus({commit}, payload) {
            return vacancyPublishStatusService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default VacancyPublishStatusStore;
