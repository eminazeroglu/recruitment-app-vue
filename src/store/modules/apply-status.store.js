import CustomStore from "devextreme/data/custom_store";
import applyStatusService from "../../services/applyStatus.service";

const ApplyStatusStore = {
    namespaced: true,

    /* State */
    state: {
        applyStatus: {},
        applyStatuses: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.applyStatus = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.applyStatuses = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get ApplyStatuses
         * */
        getApplyStatuses({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return applyStatusService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get ApplyStatus
         * */
        getApplyStatus({commit}, payload) {
            return applyStatusService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select ApplyStatuses
         * */
        getSelectApplyStatuses({commit}, payload = {}) {
            return applyStatusService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set ApplyStatus
         * */
        setApplyStatus({commit}, payload) {
            if (payload.id)
                return applyStatusService.put(payload.id, payload);
            return applyStatusService.post(null, payload);
        },
        /*
         * Action ApplyStatus
         * */
        actionApplyStatus({commit}, payload) {
            return applyStatusService.post('action', payload);
        },
        /*
         * Delete ApplyStatus
         * */
        deleteApplyStatus({commit}, payload) {
            return applyStatusService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default ApplyStatusStore;
