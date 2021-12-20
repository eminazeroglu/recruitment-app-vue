import CustomStore from "devextreme/data/custom_store";
import familyStatusService from "../../services/familyStatus.service";

const FamilyStatusStore = {
    namespaced: true,

    /* State */
    state: {
        familyStatus: {},
        familyStatuses: [],
        selectFamilyStatuses: [],
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
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.selectFamilyStatuses = payload;
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
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set Family Status
         * */
        setFamilyStatus({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = familyStatusService.put(payload.id, payload);
            else result = familyStatusService.post(null, payload);
            return result.then(r => {
                dispatch('getFamilyStatuses');
                dispatch('getSelectFamilyStatuses');
                return r.data.response;
            })
        },
        /*
         * Action Family Status
         * */
        actionFamilyStatus({commit, dispatch}, payload) {
            return familyStatusService.post('action', payload)
            .then(r => {
                dispatch('getFamilyStatuses');
                dispatch('getSelectFamilyStatuses');
                return r.data.response;
            })
        },
        /*
         * Delete Family Status
         * */
        deleteFamilyStatus({commit, dispatch}, payload) {
            return familyStatusService.delete(payload)
            .then(r => {
                dispatch('getFamilyStatuses');
                dispatch('getSelectFamilyStatuses');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default FamilyStatusStore;
