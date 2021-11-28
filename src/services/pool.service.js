import baseService from "./_base.service";

class PoolService extends baseService {
    constructor() {
        super('crud/pool');
    }
}

export default new PoolService();
