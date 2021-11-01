import CustomStore from "devextreme/data/custom_store";
import familyStatusService from "../../services/familyStatus.service";

const FamilyStatusStore = {
    namespaced: true,

    /* State */
    state: {
        familyStatus: {},
        familyStatuses: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.familyStatus = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.familyStatuses = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Family Statuses
         * */
        getFamilyStatuses({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return familyStatusService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get Family Status
         * */
        getFamilyStatus({commit}, payload) {
            return familyStatusService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Family Statuses
         * */
        getSelectFamilyStatuses({commit}, payload = {}) {
            return familyStatusService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Family Status
         * */
        setFamilyStatus({commit}, payload) {
            if (payload.id)
                return familyStatusService.put(payload.id, payload);
            return familyStatusService.post(null, payload);
        },
        /*
         * Action Family Status
         * */
        actionFamilyStatus({commit}, payload) {
            return familyStatusService.post('action', payload);
        },
        /*
         * Delete Family Status
         * */
        deleteFamilyStatus({commit}, payload) {
            return familyStatusService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default FamilyStatusStore;
