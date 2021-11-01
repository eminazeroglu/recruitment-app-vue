import CustomStore from "devextreme/data/custom_store";
import userService from "../../services/user.service";
import permissionService from "../../services/permission.service";

const UserStore = {
    namespaced: true,

    /* State */
    state: {
        user: {},
        users: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.user = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.users = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Users
         * */
        getUsers({commit}, payload = null) {
            const data = new CustomStore({
                load: function(loadOptions) {
                    return userService.get(null, {datatable: true, ...loadOptions})
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
         * Get User
         * */
        getUser({commit}, payload) {
            userService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Users
         * */
        getSelectUsers ({commit}, payload = {}) {
            return userService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set User
         * */
        setUser({commit}, payload) {
            if (payload.id)
                return userService.put(payload.id, payload);
            return userService.post(null, payload);
        },
        /*
         * Action User
         * */
        actionUser({commit}, payload) {
            return userService.post('action', payload);
        },
        /*
         * Delete User
         * */
        deleteUser({commit}, payload) {
            return userService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default UserStore;
