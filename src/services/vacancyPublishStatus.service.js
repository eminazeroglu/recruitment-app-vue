import baseService from "./_base.service";

class VacancyPublishStatusService extends baseService {
    constructor() {
        super('crud/vacancy-publish-status');
    }
}

export default new VacancyPublishStatusService();
