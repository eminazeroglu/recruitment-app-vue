import CustomStore from "devextreme/data/custom_store";
import cityService from "../../services/city.service";

const CityStore = {
    namespaced: true,

    /* State */
    state: {
        city: {},
        select_cities: [],
        cities: [],
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
        },
        /*
         * SET SELECT
         * */
        SET_SELECT(state, payload) {
            state.select_cities = payload;
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
                commit('SET_SELECT', r.data.response);
            })
        },
        /*
         * Set City
         * */
        setCity({commit, dispatch}, payload) {
            let result;
            if (payload.id) result = cityService.put(payload.id, payload);
            else result = cityService.post(null, payload);
            return result.then(r => {
                dispatch('getCities');
                dispatch('getSelectCities');
                return r.data.response;
            })
        },
        /*
         * Action City
         * */
        actionCity({commit, dispatch}, payload) {
            return cityService.post('action', payload)
            .then(r => {
                dispatch('getCities');
                dispatch('getSelectCities');
                return r.data.response;
            })
        },
        /*
         * Delete City
         * */
        deleteCity({commit, dispatch}, payload) {
            return cityService.delete(payload)
            .then(r => {
                dispatch('getCities');
                dispatch('getSelectCities');
                return r.data.response;
            })
        }
    },

    /* Getters */
    getters: {}
}

export default CityStore;
