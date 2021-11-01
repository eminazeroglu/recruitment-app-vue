import baseService from "./_base.service";

class FamilyStatusService extends baseService {
    constructor() {
        super('crud/family-status');
    }
}

export default new FamilyStatusService();
