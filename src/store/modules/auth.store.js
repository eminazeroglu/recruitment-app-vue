import authService from "../../services/auth.service";
import Helpers from "../../plugins/helpers";

const AuthStore = {
    namespaced: true,

    /* State */
    state: {
        permissions: [],
        user: {},
    },

    /* Mutation */
    mutations: {
        /*
         * Set Permissions
         * */
        SET_PERMISSIONS(state, payload) {
            localStorage._p = Helpers.crypto('encode', JSON.stringify(payload), 'Permission')
        },
        /*
         * Set User
         * */
        SET_USER(state, payload) {
            state.user = payload;
        },
    },

    /* Actions */
    actions: {
        /*
         * Login
         * */
        login({commit}, payload) {
            authService.post('login', payload)
            .then(r => {
                const data = r.data.response;
                commit('SET_PERMISSIONS', data.permissions);
                commit('SET_USER', data.user);
                localStorage.token = data.token;
                window.location.reload();
            })
        },
        /*
         * Check Token
         * */
        checkToken({commit}) {
            authService.get('check-token')
            .then(r => {
                const data = r.data.response;
                commit('SET_PERMISSIONS', data.permissions);
                commit('SET_USER', data.user);
            })
        },
        /*
         * Logout
         * */
        logout() {
            return new Promise((resolve, reject) => {
                localStorage.clear();
                resolve();
            });
        },
        /*
         * User Profile
         * */
        profile({commit}, payload) {
            return authService.post('profile', payload)
            .then(r => {
                commit('SET_USER', r.data.response.user);
            });
        },
        /*
         * Set User
         * */
        setUser({commit}, payload) {
            commit('SET_USER', payload);
        }
    },

    /* Getters */
    getters: {}
}

export default AuthStore;
