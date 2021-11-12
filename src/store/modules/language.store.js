import CustomStore from "devextreme/data/custom_store";
import languageService from "../../services/language.service";

const LanguageStore = {
    namespaced: true,

    /* State */
    state: {
        language: {},
        languages: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.language = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.languages = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Languages
         * */
        getLanguages({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return languageService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get Language
         * */
        getLanguage({commit}, payload) {
            return languageService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Languages
         * */
        getSelectLanguages({commit}, payload = {}) {
            return languageService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Language
         * */
        setLanguage({commit}, payload) {
            if (payload.id)
                return languageService.put(payload.id, payload);
            return languageService.post(null, payload);
        },
        /*
         * Action Language
         * */
        actionLanguage({commit}, payload) {
            return languageService.post('action', payload);
        },
        /*
         * Delete Language
         * */
        deleteLanguage({commit}, payload) {
            return languageService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default LanguageStore;
