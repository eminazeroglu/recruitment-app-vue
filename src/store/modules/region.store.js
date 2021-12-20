import CustomStore from "devextreme/data/custom_store";
import regionService from "../../services/region.service";

const RegionStore = {
    namespaced: true,

    /* State */
    state: {
        region: {},
        regions: [],
        select_regions: [],
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
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.select_regions = payload;
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
                commit('SET_SELECT', r.data.response);
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
        setRegion({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = regionService.put(payload.id, payload);
            else result = regionService.post(null, payload);
            return result.then(r => {
                dispatch('getRegions');
                dispatch('getSelectRegions');
                return r.data.response;
            })
        },
        /*
         * Action Region
         * */
        actionRegion({commit, dispatch}, payload) {
            return regionService.post('action', payload)
            .then(r => {
                dispatch('getRegions');
                dispatch('getSelectRegions');
                return r.data.response;
            })
        },
        /*
         * Delete Region
         * */
        deleteRegion({commit, dispatch}, payload) {
            return regionService.delete(payload)
            .then(r => {
                dispatch('getRegions');
                dispatch('getSelectRegions');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default RegionStore;
