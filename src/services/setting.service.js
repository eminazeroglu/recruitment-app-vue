import baseService from "./_base.service";

class SettingService extends baseService {
    constructor() {
        super('crud/setting');
    }
}

export default new SettingService();
