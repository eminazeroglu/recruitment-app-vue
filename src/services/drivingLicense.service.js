import baseService from "./_base.service";

class DrivingLicenseService extends baseService {
    constructor() {
        super('crud/driving-license');
    }
}

export default new DrivingLicenseService();
