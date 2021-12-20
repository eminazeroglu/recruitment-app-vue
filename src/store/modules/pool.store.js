import CustomStore from "devextreme/data/custom_store";
import poolService from "../../services/pool.service";
import languageService from "../../services/language.service";

const PoolStore = {
    namespaced: true,

    /* State */
    state: {
        pool: {},
        poolCandidates: [],
        pools: [],
        selectPools: [],
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.pool = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.pools = payload;
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.selectPools = payload;
        },
        /*
         * SET CANDIDATE
         * */
        SET_CANDIDATE(state, payload) {
            state.poolCandidates = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Pools
         * */
        getPools({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return poolService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get Pool Candidates
         * */
        getPoolCandidates({commit}, payload = null) {
            const id = payload.id;
            delete payload.id;
            const data = new CustomStore({
                load: function (loadOptions) {
                    return poolService.get( id + '/candidate', {datatable: true, ...loadOptions, ...payload})
                    .then(r => {
                        const data = r.data.response;
                        return {
                            data: data.data,
                            totalCount: data.total
                        }
                    })
                }
            })
            commit('SET_CANDIDATE', data);
            return data;
        },
        /*
         * Get Pool
         * */
        getPool({commit}, payload) {
            return poolService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
                return r.data.response;
            })
        },
        /*
         * Get Select Pools
         * */
        getSelectPools({commit}, payload = {}) {
            return poolService.get(null, payload)
            .then(r => {
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set Pool
         * */
        setPool({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = poolService.put(payload.id, payload);
            else result = poolService.post(null, payload);
            return result.then(r => {
                dispatch('getPools');
                dispatch('getSelectPools');
                return r.data.response;
            })
        },
        /*
         * Action Pool
         * */
        actionPool({commit, dispatch}, payload) {
            return poolService.post('action', payload)
            .then(r => {
                dispatch('getPools');
                dispatch('getSelectPools');
                return r.data.response;
            })
        },
        /*
         * Delete Pool
         * */
        deletePool({commit, dispatch}, payload) {
            return poolService.delete(payload)
            .then(r => {
                dispatch('getPools');
                dispatch('getSelectPools');
                return r.data.response;
            })
        },
    },

    /* Getters */
    getters: {}
}

export default PoolStore;
