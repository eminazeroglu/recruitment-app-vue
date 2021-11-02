import baseService from "./_base.service";

class ProfessionService extends baseService {
    constructor() {
        super('crud/profession');
    }
}

export default new ProfessionService();
