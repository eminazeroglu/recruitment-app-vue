import baseService from "./_base.service";

class VacancyCompatibilityService extends baseService {
    constructor() {
        super('crud/vacancy-compatibility');
    }
}

export default new VacancyCompatibilityService();
