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

    handleErrors(err) {
        console.log({message: "Errors is handled here", err});
    }

    async get(param, query = {}) {
        try {
            return await api.get(this.#getUrl(param), {params: query});
        }
        catch (e) {
            this.handleErrors(e.message)
        }
    }

    async post(param = null, data = {}, query = {}) {
        try {
            return await api.post(this.#getUrl(param), data, {
                params: query
            });
        }
        catch (e) {
            this.handleErrors(e.message)
        }
    }

    async put(param, data = {}) {
        try {
            return await api.put(this.#getUrl(param), data);
        }
        catch (e) {
            this.handleErrors(e.message)
        }
    }

    async delete(param) {
        try {
            return await api.delete(this.#getUrl(param));
        }
        catch (e) {
            this.handleErrors(e.message)
        }
    }

}

export default baseService
