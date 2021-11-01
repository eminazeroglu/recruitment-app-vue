import baseService from "./_base.service";

class authService extends baseService {
    constructor() {
        super('auth');
    }
}

export default new authService();
