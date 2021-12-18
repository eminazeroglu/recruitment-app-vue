const RouteTabStore = {
    namespaced: true,
    /* State */
    state: {
        routeTabCurrent: {},
        routeTabClose: null,
    },
    /* Mutation */
    mutations: {
        SET_CURRENT(state, value) {
            state.routeTabCurrent = value
        },
        SET_CLOSE(state, value) {
            state.routeTabClose = value
        }
    },
    /* Actions */
    actions: {
        setRouteTabCurrent({commit}, payload) {
            commit('SET_CURRENT', payload)
        },
        setCloseRouteTab({commit}, payload) {
            commit('SET_CLOSE', payload)
        }
    },

}

export default RouteTabStore;
