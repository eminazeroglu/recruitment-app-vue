import CustomStore from "devextreme/data/custom_store";
import educationDegreeService from "../../services/educationDegree.service";

const EducationDegreeStore = {
    namespaced: true,

    /* State */
    state: {
        educationDegree: {},
        educationDegrees: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.educationDegree = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.educationDegrees = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get EducationDegrees
         * */
        getEducationDegrees({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return educationDegreeService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get EducationDegree
         * */
        getEducationDegree({commit}, payload) {
            return educationDegreeService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select EducationDegrees
         * */
        getSelectEducationDegrees({commit}, payload = {}) {
            return educationDegreeService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set EducationDegree
         * */
        setEducationDegree({commit}, payload) {
            if (payload.id)
                return educationDegreeService.put(payload.id, payload);
            return educationDegreeService.post(null, payload);
        },
        /*
         * Action EducationDegree
         * */
        actionEducationDegree({commit}, payload) {
            return educationDegreeService.post('action', payload);
        },
        /*
         * Delete EducationDegree
         * */
        deleteEducationDegree({commit}, payload) {
            return educationDegreeService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default EducationDegreeStore;
