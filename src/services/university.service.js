import baseService from "./_base.service";

class UniversityService extends baseService {
    constructor() {
        super('crud/university');
    }
}

export default new UniversityService();
