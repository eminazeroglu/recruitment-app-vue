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
                let result = r.data.response;
                if (payload.id) result = r.data.response.filter(i => parseFloat(i.id) !== parseFloat(payload.id))
                commit('SET_LIST_PROFESSION', result);
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
