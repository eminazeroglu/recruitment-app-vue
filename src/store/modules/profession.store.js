import CustomStore from "devextreme/data/custom_store";
import professionService from "../../services/profession.service";

const ProfessionStore = {
    namespaced: true,

    /* State */
    state: {
        profession: {},
        professions: []
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
            return professionService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Profession
         * */
        setProfession({commit}, payload) {
            if (payload.id)
                return professionService.put(payload.id, payload);
            return professionService.post(null, payload);
        },
        /*
         * Action Profession
         * */
        actionProfession({commit}, payload) {
            return professionService.post('action', payload);
        },
        /*
         * Delete Profession
         * */
        deleteProfession({commit}, payload) {
            return professionService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default ProfessionStore;
