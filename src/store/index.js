import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import AppStore from "./modules/app.store";
import AuthStore from "./modules/auth.store";
import UserStore from "./modules/user.store";
import PermissionStore from "./modules/permission.store";
import LanguageStore from "./modules/language.store";
import SeoStore from "./modules/seo.store";
import SettingStore from "./modules/setting.store";
import FamilyStatusStore from "./modules/family-status.store";
import DrivingLicenseStore from "./modules/driving-license.store";
import CityStore from "./modules/city.store";
import RegionStore from "./modules/region.store";
import EducationDegreeStore from "./modules/educationDegree.store";

export default new Vuex.Store({
    modules: {
        AppStore,
        AuthStore,
        UserStore,
        PermissionStore,
        LanguageStore,
        SeoStore,
        SettingStore,
        FamilyStatusStore,
        DrivingLicenseStore,
        CityStore,
        RegionStore,
        EducationDegreeStore
    }
});
