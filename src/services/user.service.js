import baseService from "./_base.service";

class userService extends baseService {
    constructor() {
        super('crud/user');
    }
}

export default new userService();
