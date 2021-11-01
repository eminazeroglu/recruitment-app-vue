import CustomStore from "devextreme/data/custom_store";
import cityService from "../../services/city.service";

const CityStore = {
    namespaced: true,

    /* State */
    state: {
        city: {},
        cities: []
    },

    /* Mutation */
    mutations: {
        /*
         * SET DATA
         * */
        SET_DATA(state, payload) {
            state.city = payload;
        },
        /*
         * SET LIST
         * */
        SET_LIST(state, payload) {
            state.cities = payload;
        }
    },

    /* Actions */
    actions: {
        /*
         * Get Cities
         * */
        getCities({commit}, payload = null) {
            const data = new CustomStore({
                load: function (loadOptions) {
                    return cityService.get(null, {datatable: true, ...loadOptions, ...payload})
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
         * Get City
         * */
        getCity({commit}, payload) {
            return cityService.get(payload)
            .then(r => {
                commit('SET_DATA', r.data.response);
            })
        },
        /*
         * Get Select Cities
         * */
        getSelectCities({commit}, payload = {}) {
            return cityService.get(null, payload)
            .then(r => {
                commit('SET_LIST', r.data.response);
            })
        },
        /*
         * Set City
         * */
        setCity({commit}, payload) {
            if (payload.id)
                return cityService.put(payload.id, payload);
            return cityService.post(null, payload);
        },
        /*
         * Action City
         * */
        actionCity({commit}, payload) {
            return cityService.post('action', payload);
        },
        /*
         * Delete City
         * */
        deleteCity({commit}, payload) {
            return cityService.delete(payload);
        }
    },

    /* Getters */
    getters: {}
}

export default CityStore;
