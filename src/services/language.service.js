import baseService from "./_base.service";

class LanguageService extends baseService {
    constructor() {
        super('crud/language');
    }
}

export default new LanguageService();
