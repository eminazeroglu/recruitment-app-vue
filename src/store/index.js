import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import AppStore from "./modules/app.store";
import AuthStore from "./modules/auth.store";
import UserStore from "./modules/user.store";
import PermissionStore from "./modules/permission.store";
import SystemLanguageStore from "./modules/system-language.store";
import SeoStore from "./modules/seo.store";
import SettingStore from "./modules/setting.store";
import FamilyStatusStore from "./modules/family-status.store";
import CityStore from "./modules/city.store";
import RegionStore from "./modules/region.store";
import EducationDegreeStore from "./modules/educationDegree.store";
import UniversityStore from "./modules/university.store";
import ProfessionStore from "./modules/profession.store";
import SkillStore from "./modules/skill.store";
import LanguageStore from "./modules/language.store";
import VacancyPublishStatusStore from "./modules/vacancy-publish-status.store";
import DepartmentStore from "./modules/department.store";
import VacancyStatusStore from "./modules/vacancy-status.store";
import ApplyStatusStore from "./modules/apply-status.store";
import VacancyCompatibilityStore from "./modules/vacancy-compatibility.store";
import VacancyStore from "./modules/vacancy.store";
import CandidateStore from "./modules/candidate.store";
import PoolStore from "./modules/pool.store";

export default new Vuex.Store({
    modules: {
        AppStore,
        AuthStore,
        UserStore,
        PermissionStore,
        SystemLanguageStore,
        SeoStore,
        SettingStore,
        FamilyStatusStore,
        CityStore,
        RegionStore,
        EducationDegreeStore,
        UniversityStore,
        ProfessionStore,
        SkillStore,
        LanguageStore,
        VacancyPublishStatusStore,
        DepartmentStore,
        VacancyStatusStore,
        ApplyStatusStore,
        VacancyCompatibilityStore,
        VacancyStore,
        CandidateStore,
        PoolStore
    }
});
