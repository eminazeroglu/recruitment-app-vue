import baseService from "./_base.service";

class CandidateService extends baseService {
    constructor() {
        super('crud/candidate');
    }
}

export default new CandidateService();
