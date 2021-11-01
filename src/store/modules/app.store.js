import generalService from "../../services/general.service";

const AppStore = {
    namespaced: true,

    /* State */
    state: {
        applicationStart: false,
        errors: [],
        appLanguages: [],
        appLanguage: null,
        photos: [],
        isLoading: false,
        sidebarAction: false
    },

    /* Mutation */
    mutations: {
        /*
         * Set Application Start
         * */
        SET_APPLICATION_START(state, payload) {
            state.applicationStart = payload;
        },
        /*
         * Set Errors
         * */
        SET_ERRORS(state, payload) {
            state.errors = payload;
        },
        /*
         * Set Languages
         * */
        SET_LANGUAGES(state, payload) {
            state.appLanguages = payload;
        },
        /*
         * Set Language
         * */
        SET_LANGUAGE(state, payload) {
            state.appLanguage = payload;
            localStorage.appLanguage = payload;
        },
        /*
         * Set Photos
         * */
        SET_PHOTOS(state, payload) {
            state.photos = payload;
        },
        /*
         * Set Sidebar Action
         * */
        SET_SIDEBAR_ACTION(state, payload) {
            state.sidebarAction = payload;
        },
        /*
         * Set Loading
         * */
        SET_LOADING(state, payload) {
            state.isLoading = payload;
        },
    },

    /* Actions */
    actions: {
        /*
         * Set Errors
         * */
        setErrors({commit}, payload) {
            commit('SET_ERRORS', payload);
        },
        /*
         * Set Loading
         * */
        setLoading({commit}, payload) {
            commit('SET_LOADING', payload);
        },
        /*
         * Set Language
         * */
        setLanguage({commit}, payload) {
            commit('SET_LANGUAGE', payload);
        },
        /*
        * Start
        * */
        start({commit, rootState}) {
            generalService.get('start')
            .then(r => {
                const language = rootState.AuthStore?.user.language;
                const data = r.data.response;
                commit('SET_APPLICATION_START', true);
                commit('SET_LANGUAGES', data.languages);
                commit('SET_LANGUAGE', language ? language : data.language);
                commit('SET_PHOTOS', data.photos);
            })
        },
        /*
         * Set Sidebar Action
         * */
        setSidebarAction({commit}, payload) {
            commit('SET_SIDEBAR_ACTION', payload);
        },
    },

    /* Getters */
    getters: {
        getLanguages(state) {
            return state.appLanguages
        }
    }
}

export default AppStore;
