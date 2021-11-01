import baseService from "./_base.service";

class EducationDegreeService extends baseService {
    constructor() {
        super('crud/education-degree');
    }
}

export default new EducationDegreeService();
