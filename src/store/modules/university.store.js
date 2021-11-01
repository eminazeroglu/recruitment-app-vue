import CustomStore from "devextreme/data/custom_store";
import universityService from "../../services/university.service";

const UniversityStore = {
    namespaced: true,

    /* State */
    state: {
        university: {},
        universities: []
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
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set University
         * */
        setUniversity({commit}, payload) {
            if (payload.id)
                return universityService.put(payload.id, payload);
            return universityService.post(null, payload);
        },
        /*
         * Action University
         * */
        actionUniversity({commit}, payload) {
            return universityService.post('action', payload);
        },
        /*
         * Delete University
         * */
        deleteUniversity({commit}, payload) {
            return universityService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default UniversityStore;
