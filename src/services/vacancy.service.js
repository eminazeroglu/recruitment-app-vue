import baseService from "./_base.service";

class VacancyService extends baseService {
    constructor() {
        super('crud/vacancy');
    }
}

export default new VacancyService();
