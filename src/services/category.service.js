import baseService from "./_base.service";

class categoryService extends baseService {
    constructor() {
        super('crud/category');
    }
}

export default new categoryService();
