import CustomStore from "devextreme/data/custom_store";
import poolService from "../../services/pool.service";

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
        setPool({commit}, payload) {
            if (payload.id)
                return poolService.put(payload.id, payload);
            return poolService.post(null, payload);
        },
        /*
         * Action Pool
         * */
        actionPool({commit}, payload) {
            return poolService.post('action', payload);
        },
        /*
         * Delete Pool
         * */
        deletePool({commit}, payload) {
            return poolService.delete(payload);
        },
    },

    /* Getters */
    getters: {}
}

export default PoolStore;
