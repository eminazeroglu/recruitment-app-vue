import baseService from "./_base.service";

class permissionService extends baseService {
    constructor() {
        super('crud/permission');
    }
}

export default new permissionService();
