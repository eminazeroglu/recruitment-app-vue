import axios from "axios";
import store from '../store'

let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Max-Age': 86400,
    'Access-Control-Allow-Origin': '*',
}

let instance = null;

try {
    headers.language = localStorage.language ? localStorage.language : '';
    headers.Authorization = localStorage.token ? 'Bearer ' + localStorage.token : null

    instance = axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        timeout: 0,
        headers
    });

    const resolveMethod = function (res) {
        store.dispatch('AppStore/setErrors', []);
        store.dispatch('AppStore/setLoading', false);
        return res;
    }

    const rejectMethod = function (err) {
        const error = err.response;
        store.dispatch('AppStore/setErrors', []);
        store.dispatch('AppStore/setLoading', false);
        if (error.status === 422) {
            if (typeof error.data.response === 'object' && Array.isArray(Object.keys(error.data.response))) {
                store.dispatch('AppStore/setErrors', error.data.response);
            }
            else {
                console.log(error.data.message);
            }
        }
        else if (error.status === 401 || error.status === 400) {
            store.dispatch('AuthStore/logout');
            window.location.reload();
        }
        else {
            console.log(error.data.message);
        }
        return Promise.reject(err);
    };

    instance.interceptors.response.use(
        resolveMethod,
        rejectMethod
    );

}
catch (e) {
    localStorage.clear();
    window.location.reload();
}

export default instance;
