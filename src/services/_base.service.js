import api from './_axios.service'

class baseService {
    resource;

    constructor(resource) {
        if (!resource) throw new Error('Resource is not provided')
        this.resource = resource;
    }

    #getUrl(param = null) {
        let url = `/${this.resource}`;
        if (param) url = url + '/' + param;
        return url
    }

    async get(param, query = {}) {
        return await api.get(this.#getUrl(param), {params: query});
    }

    async post(param = null, data = {}, query = {}) {
        return await api.post(this.#getUrl(param), data, {
            params: query
        });
    }

    async put(param, data = {}) {
        return await api.put(this.#getUrl(param), data);
    }

    async delete(param) {
        return await api.delete(this.#getUrl(param));
    }

}

export default baseService
