import baseService from "./_base.service";

class VacancyStatusService extends baseService {
    constructor() {
        super('crud/vacancy-status');
    }
}

export default new VacancyStatusService();
