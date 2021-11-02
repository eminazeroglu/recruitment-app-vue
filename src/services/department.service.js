import baseService from "./_base.service";

class DepartmentService extends baseService {
    constructor() {
        super('crud/department');
    }
}

export default new DepartmentService();
