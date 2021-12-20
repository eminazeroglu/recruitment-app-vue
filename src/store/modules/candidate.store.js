import CustomStore from "devextreme/data/custom_store";
import candidateService from "../../services/candidate.service";

const CandidateStore = {
    namespaced: true,

    /* State */
    state: {
        candidate: {},
        candidates: [],
        selectCandidates: [],
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
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.selectCandidates = payload;
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
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set Candidate
         * */
        setCandidate({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = candidateService.put(payload.id, payload);
            else result = candidateService.post(null, payload);
            return result.then(r => {
                dispatch('getCandidates');
                dispatch('getSelectCandidates');
                return r.data.response;
            })
        },
        /*
         * Action Candidate
         * */
        actionCandidate({commit, dispatch}, payload) {
            return candidateService.post('action', payload)
            .then(r => {
                dispatch('getCandidates');
                dispatch('getSelectCandidates');
                return r.data.response;
            })
        },
        /*
         * Delete Candidate
         * */
        deleteCandidate({commit, dispatch}, payload) {
            return candidateService.delete(payload)
            .then(r => {
                dispatch('getCandidates');
                dispatch('getSelectCandidates');
                return r.data.response;
            })
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
