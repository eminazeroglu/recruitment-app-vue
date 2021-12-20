import CustomStore from "devextreme/data/custom_store";
import professionService from "../../services/profession.service";

const ProfessionStore = {
    namespaced: true,

    /* State */
    state: {
        profession: {},
        professions: [],
        listProfessions: [],
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.profession = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.professions = payload;
        },
        /*
         * SET LIST PROFESSION
         * */
        SET_LIST_PROFESSION(state, payload) {
            state.listProfessions = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Professions
         * */
        getProfessions({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return professionService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get Profession
         * */
        getProfession({commit}, payload) {
            return professionService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Professions
         * */
        getSelectProfessions({commit}, payload = {}) {
            return professionService.get('', payload)
            .then(r => {
                commit('SET_LIST_PROFESSION', r.data.response);
                return r.data.response;
            })
        },
        /*
         * Set Profession
         * */
        setProfession({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = professionService.put(payload.id, payload);
            else result = professionService.post(null, payload);
            return result.then(r => {
                dispatch('getProfessions');
                dispatch('getSelectProfessions');
                return r.data.response;
            })
        },
        /*
         * Action Profession
         * */
        actionProfession({commit, dispatch}, payload) {
            return professionService.post('action', payload)
            .then(r => {
                dispatch('getProfessions');
                dispatch('getSelectProfessions');
                return r.data.response;
            })
        },
        /*
         * Delete Profession
         * */
        deleteProfession({commit, dispatch}, payload) {
            return professionService.delete(payload)
            .then(r => {
                dispatch('getProfessions');
                dispatch('getSelectProfessions');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default ProfessionStore;
