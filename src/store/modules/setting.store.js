import CustomStore from "devextreme/data/custom_store";
import settingService from "../../services/setting.service";

const SettingStore = {
    namespaced: true,

    /* State */
    state: {
        setting: {},
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.setting = payload;
        },
    },

    /* Actions */
    actions: {
        /*
         * Get Setting
         * */
        getSetting({commit}, payload) {
            return settingService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Set Setting
         * */
        setSetting({commit}, payload) {
            return settingService.post(payload.key, payload);
        },
    },

    /* Getters */
    getters: {}
}

export default SettingStore;
