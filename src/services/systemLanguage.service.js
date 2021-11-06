import baseService from "./_base.service";

class languageService extends baseService {
    constructor() {
        super('crud/system-language');
    }
}

export default new languageService();
