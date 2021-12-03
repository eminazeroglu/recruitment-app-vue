import CustomStore from "devextreme/data/custom_store";
import candidateService from "../../services/candidate.service";

const CandidateStore = {
    namespaced: true,

    /* State */
    state: {
        candidate: {},
        candidates: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.candidate = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.candidates = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Candidates
         * */
        getCandidates({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return candidateService.get(null, {datatable: true, ...loadOptions, ...payload})
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
            return data;
        },
        /*
         * Get Candidate
         * */
        getCandidate({commit}, payload) {
            return candidateService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
                return r.data.response;
            })
        },
        /*
         * Get Select Candidates
         * */
        getSelectCandidates({commit}, payload = {}) {
            return candidateService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Candidate
         * */
        setCandidate({commit}, payload) {
            if (payload.id)
                return candidateService.put(payload.id, payload);
            return candidateService.post(null, payload);
        },
        /*
         * Action Candidate
         * */
        actionCandidate({commit}, payload) {
            return candidateService.post('action', payload);
        },
        /*
         * Delete Candidate
         * */
        deleteCandidate({commit}, payload) {
            return candidateService.delete(payload);
        },
        /*
         * Send Candidate Email
         * */
        sendCandidateEmail({commit}, payload) {
            return candidateService.post('send-email', payload);
        },
        /*
         * Send Candidate Message
         * */
        sendCandidateMessage({commit}, payload) {
            return candidateService.post('send-message', payload);
        },
        /*
         * Send Candidate Pool
         * */
        sendCandidatePool({commit}, payload) {
            return candidateService.post('send-pool', payload);
        },
        /*
         * Remove Candidate Pool
         * */
        removeCandidatePool({commit}, payload) {
            return candidateService.post('remove-pool', payload);
        }
    },

    /* Getters */
    getters: {}
}

export default CandidateStore;
