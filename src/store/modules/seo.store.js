import CustomStore from "devextreme/data/custom_store";
import seoService from "../../services/seo.service";

const SeoStore = {
    namespaced: true,

    /* State */
    state: {
        seo: {},
        seos: [],
        botArr: ['robots', 'googlebot', 'yahoobot', 'alexabot', 'msnbot', 'dmozbot']
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.seo = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.seos = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Seos
         * */
        getSeos({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return seoService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get Seo
         * */
        getSeo({commit}, payload) {
            seoService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Seos
         * */
        getSelectSeos({commit}, payload = {}) {
            return seoService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Seo
         * */
        setSeo({commit}, payload) {
            if (payload.id)
                return seoService.put(payload.id, payload);
            return seoService.post(null, payload);
        },
        /*
         * Action Seo
         * */
        actionSeo({commit}, payload) {
            return seoService.post('action', payload);
        },
        /*
         * Delete Seo
         * */
        deleteSeo({commit}, payload) {
            return seoService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default SeoStore;
