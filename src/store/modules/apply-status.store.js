import CustomStore from "devextreme/data/custom_store";
import applyStatusService from "../../services/applyStatus.service";
import professionService from "../../services/profession.service";

const ApplyStatusStore = {
    namespaced: true,

    /* State */
    state: {
        applyStatus: {},
        applyStatuses: [],
        applySelectStatuses: [],
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
        },
        /*
         * SET_SELECT
         * */
        SET_SELECT(state, payload) {
            state.applySelectStatuses = payload;
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
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set ApplyStatus
         * */
        setApplyStatus({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = applyStatusService.put(payload.id, payload);
            else result = applyStatusService.post(null, payload);
            return result.then(r => {
                dispatch('getApplyStatuses');
                dispatch('getSelectApplyStatuses');
                return r.data.response;
            })
        },
        /*
         * Action ApplyStatus
         * */
        actionApplyStatus({commit, dispatch}, payload) {
            return applyStatusService.post('action', payload)
            .then(r => {
                dispatch('getApplyStatuses');
                dispatch('getSelectApplyStatuses');
                return r.data.response;
            })
        },
        /*
         * Delete ApplyStatus
         * */
        deleteApplyStatus({commit, dispatch}, payload) {
            return applyStatusService.delete(payload)
            .then(r => {
                dispatch('getApplyStatuses');
                dispatch('getSelectApplyStatuses');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default ApplyStatusStore;
