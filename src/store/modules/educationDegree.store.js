import CustomStore from "devextreme/data/custom_store";
import educationDegreeService from "../../services/educationDegree.service";

const EducationDegreeStore = {
    namespaced: true,

    /* State */
    state: {
        educationDegree: {},
        educationDegrees: [],
        selectEducationDegrees: [],
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
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.selectEducationDegrees = payload;
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
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set EducationDegree
         * */
        setEducationDegree({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = educationDegreeService.put(payload.id, payload);
            else result = educationDegreeService.post(null, payload);
            return result.then(r => {
                dispatch('getEducationDegrees');
                dispatch('getSelectEducationDegrees');
                return r.data.response;
            })
        },
        /*
         * Action EducationDegree
         * */
        actionEducationDegree({commit, dispatch}, payload) {
            return educationDegreeService.post('action', payload)
            .then(r => {
                dispatch('getEducationDegrees');
                dispatch('getSelectEducationDegrees');
                return r.data.response;
            })
        },
        /*
         * Delete EducationDegree
         * */
        deleteEducationDegree({commit, dispatch}, payload) {
            return educationDegreeService.delete(payload)
            .then(r => {
                dispatch('getEducationDegrees');
                dispatch('getSelectEducationDegrees');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default EducationDegreeStore;
