import baseService from "./_base.service";

class SkillService extends baseService {
    constructor() {
        super('crud/skill');
    }
}

export default new SkillService();
