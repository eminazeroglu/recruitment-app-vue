import CustomStore from "devextreme/data/custom_store";
import permissionService from "../../services/permission.service";

const PermissionStore = {
    namespaced: true,

    /* State */
    state: {
        permission: {},
        permissions: [],
        permissionOptions: [],
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.permission = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.permissions = payload;
        },
        /*
         * SET LIST OPTIONS
         * */
        SET_LIST_OPTIONS(state, payload) {
            state.permissionOptions = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Permissions
         * */
        getPermissions({commit}, payload = null) {
            const data = new CustomStore({
                load: function(loadOptions) {
                    return permissionService.get(null, {datatable: true, ...loadOptions})
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
        * Get Select Permissions
        * */
        getSelectPermissions ({commit}, payload = {}) {
            return permissionService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Get PermissionOptions
         * */
        getPermissionOptions({commit}, payload) {
            return permissionService.post('option/' + payload)
            .then(r => {
                commit('SET_LIST_OPTIONS', r.data.response.map(i => {
                    return {
                        ...i,
                        fullAccess: i.create && i.read && i.update && i.delete && i.action,
                        notAccess: !i.create && !i.read && !i.update && !i.delete && !i.action,
                    }
                }));
            })
        },
        /*
         * Get Permission
         * */
        getPermission({commit}, payload) {
            return permissionService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Set Permission
         * */
        setPermission({commit}, payload) {
            if (payload.id)
                return permissionService.put(payload.id, payload);
            return permissionService.post(null, payload);
        },
        /*
         * Set PermissionOption
         * */
        setPermissionOption({commit}, payload) {
            return permissionService.post('option-save', payload);
        },
        /*
         * Delete Permission
         * */
        deletePermission({commit}, payload) {
            return permissionService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default PermissionStore;
