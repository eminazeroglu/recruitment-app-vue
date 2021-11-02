import CustomStore from "devextreme/data/custom_store";
import candidateLevelService from "../../services/candidateLevel.service";

const CandidateLevelStore = {
    namespaced: true,

    /* State */
    state: {
        candidateLevel: {},
        candidateLevels: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.candidateLevel = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.candidateLevels = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get CandidateLevels
         * */
        getCandidateLevels({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return candidateLevelService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get CandidateLevel
         * */
        getCandidateLevel({commit}, payload) {
            return candidateLevelService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select CandidateLevels
         * */
        getSelectCandidateLevels({commit}, payload = {}) {
            return candidateLevelService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set CandidateLevel
         * */
        setCandidateLevel({commit}, payload) {
            if (payload.id)
                return candidateLevelService.put(payload.id, payload);
            return candidateLevelService.post(null, payload);
        },
        /*
         * Action CandidateLevel
         * */
        actionCandidateLevel({commit}, payload) {
            return candidateLevelService.post('action', payload);
        },
        /*
         * Delete CandidateLevel
         * */
        deleteCandidateLevel({commit}, payload) {
            return candidateLevelService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default CandidateLevelStore;
