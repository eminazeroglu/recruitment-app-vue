import baseService from "./_base.service";

class RegionService extends baseService {
    constructor() {
        super('crud/region');
    }
}

export default new RegionService();
