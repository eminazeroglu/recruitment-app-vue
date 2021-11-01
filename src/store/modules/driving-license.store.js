import CustomStore from "devextreme/data/custom_store";
import drivingLicenseService from "../../services/drivingLicense.service";

const DrivingLicenseStore = {
    namespaced: true,

    /* State */
    state: {
        drivingLicense: {},
        drivingLicenses: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.drivingLicense = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.drivingLicenses = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get DrivingLicenses
         * */
        getDrivingLicenses({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return drivingLicenseService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get DrivingLicense
         * */
        getDrivingLicense({commit}, payload) {
            return drivingLicenseService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select DrivingLicenses
         * */
        getSelectDrivingLicenses({commit}, payload = {}) {
            return drivingLicenseService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set DrivingLicense
         * */
        setDrivingLicense({commit}, payload) {
            if (payload.id)
                return drivingLicenseService.put(payload.id, payload);
            return drivingLicenseService.post(null, payload);
        },
        /*
         * Action DrivingLicense
         * */
        actionDrivingLicense({commit}, payload) {
            return drivingLicenseService.post('action', payload);
        },
        /*
         * Delete DrivingLicense
         * */
        deleteDrivingLicense({commit}, payload) {
            return drivingLicenseService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default DrivingLicenseStore;
