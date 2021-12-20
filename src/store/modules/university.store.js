import CustomStore from "devextreme/data/custom_store";
import universityService from "../../services/university.service";

const UniversityStore = {
    namespaced: true,

    /* State */
    state: {
        university: {},
        universities: [],
        select_universities: [],
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.university = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.universities = payload;
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.select_universities = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Universities
         * */
        getUniversities({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return universityService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get University
         * */
        getUniversity({commit}, payload) {
            return universityService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Universities
         * */
        getSelectUniversities({commit}, payload = {}) {
            return universityService.get(null, payload)
            .then(r => {
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set University
         * */
        setUniversity({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = universityService.put(payload.id, payload);
            else result = universityService.post(null, payload);
            return result.then(r => {
                dispatch('getUniversities');
                dispatch('getSelectUniversities');
                return r.data.response;
            })
        },
        /*
         * Action University
         * */
        actionUniversity({commit, dispatch}, payload) {
            return universityService.post('action', payload)
            .then(r => {
                dispatch('getUniversities');
                dispatch('getSelectUniversities');
                return r.data.response;
            })
        },
        /*
         * Delete University
         * */
        deleteUniversity({commit, dispatch}, payload) {
            return universityService.delete(payload)
            .then(r => {
                dispatch('getUniversities');
                dispatch('getSelectUniversities');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default UniversityStore;
