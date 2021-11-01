import CustomStore from "devextreme/data/custom_store";
import LanguageService from "../../services/language.service";

const LanguageStore = {
    namespaced: true,

    /* State */
    state: {
        language: {},
        languages: [],
        translates: [],
        translateKeys: []
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
         * SET TRANSLATES
         * */
        SET_TRANSLATES(state, payload) {
            state.translates = payload;
        },
        /*
         * SET TRANSLATES KEYS
         * */
        SET_TRANSLATES_KEYS(state, payload) {
            state.translateKeys = payload;
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
                    return LanguageService.get(null, {datatable: true, ...loadOptions})
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
         * Get Translates
         * */
        getTranslates({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return LanguageService.post('translate', '',{datatable: true, ...loadOptions, ...payload})
                    .then(r => {
                        const data = r.data.response;
                        return {
                            data: data.data,
                            totalCount: data.total
                        }
                    })
                }
            })
            commit('SET_TRANSLATES', data);
        },
        /*
         * Get Translate Keys
         * */
        getTranslateKeys({commit}) {
            LanguageService.post('translate-keys')
            .then(r => {
                commit('SET_TRANSLATES_KEYS', r.data.response);
            })
        },
        /*
         * Get Language
         * */
        getLanguage({commit}, payload) {
            LanguageService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Languages
         * */
        getSelectLanguages({commit}, payload = {}) {
            return LanguageService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Language
         * */
        setLanguage({commit}, payload) {
            if (payload.id)
                return LanguageService.put(payload.id, payload);
            return LanguageService.post(null, payload);
        },
        /*
         * Set Translate
         * */
        setTranslate({commit}, payload) {
            return LanguageService.post('translate-change', payload);
        },
        /*
         * Action Language
         * */
        actionLanguage({commit}, payload) {
            return LanguageService.post('action', payload);
        },
        /*
         * Delete Language
         * */
        deleteLanguage({commit}, payload) {
            return LanguageService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default LanguageStore;
