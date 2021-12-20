import CustomStore from "devextreme/data/custom_store";
import languageService from "../../services/language.service";

const LanguageStore = {
    namespaced: true,

    /* State */
    state: {
        language: {},
        languages: [],
        select_languages: [],
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
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.select_languages = payload;
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
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set Language
         * */
        setLanguage({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = languageService.put(payload.id, payload);
            else result = languageService.post(null, payload);
            return result.then(r => {
                dispatch('getLanguages');
                dispatch('getSelectLanguages');
                return r.data.response;
            })
        },
        /*
         * Action Language
         * */
        actionLanguage({commit, dispatch}, payload) {
            return languageService.post('action', payload)
            .then(r => {
                dispatch('getLanguages');
                dispatch('getSelectLanguages');
                return r.data.response;
            })
        },
        /*
         * Delete Language
         * */
        deleteLanguage({commit, dispatch}, payload) {
            return languageService.delete(payload)
            .then(r => {
                dispatch('getLanguages');
                dispatch('getSelectLanguages');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default LanguageStore;
