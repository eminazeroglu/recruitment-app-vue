import baseService from "./_base.service";

class CityService extends baseService {
    constructor() {
        super('crud/city');
    }
}

export default new CityService();
