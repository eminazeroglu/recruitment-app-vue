import CustomStore from "devextreme/data/custom_store";
import regionService from "../../services/region.service";

const RegionStore = {
    namespaced: true,

    /* State */
    state: {
        region: {},
        regions: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.region = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.regions = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Regions
         * */
        getRegions({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return regionService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get Region
         * */
        getRegion({commit}, payload) {
            return regionService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Regions
         * */
        getSelectRegions({commit}, payload = {}) {
            return regionService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set Region
         * */
        setRegion({commit}, payload) {
            if (payload.id)
                return regionService.put(payload.id, payload);
            return regionService.post(null, payload);
        },
        /*
         * Action Region
         * */
        actionRegion({commit}, payload) {
            return regionService.post('action', payload);
        },
        /*
         * Delete Region
         * */
        deleteRegion({commit}, payload) {
            return regionService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default RegionStore;
