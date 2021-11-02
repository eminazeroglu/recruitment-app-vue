export const routers = [
    {
        path: '/',
        name: 'index',
        title: 'crm.Sidebar.HomePage',
        icon: 'icon-home',
        permission: 'accept',
        sidebar: true,
        component: () => import('../views/home/HomeIndex'),
    },
    {
        path: '*',
        title: 'crm.Sidebar.Interrogators',
        icon: 'icon-package1',
        permission: 'accept',
        sidebar: true,
        children: [
            {
                path: '/family-status',
                name: 'family-status',
                title: 'crm.Sidebar.FamilyStatuses',
                icon: 'icon-circle-o',
                permission: 'family_status.read',
                sidebar: true,
                component: () => import('../views/interrogator/family-status/FamilyStatusIndex'),
            },
            {
                path: '/driving-license',
                name: 'driving-license',
                title: 'crm.Sidebar.DrivingLicenses',
                icon: 'icon-circle-o',
                permission: 'driving_license.read',
                sidebar: true,
                component: () => import('../views/interrogator/driving-license/DrivingLicenseIndex'),
            },
            {
                path: '/city',
                name: 'city',
                title: 'crm.Sidebar.Cities',
                icon: 'icon-circle-o',
                permission: 'city.read',
                sidebar: true,
                component: () => import('../views/interrogator/city/CityIndex'),
            },
            {
                path: '/region',
                name: 'region',
                title: 'crm.Sidebar.Regions',
                icon: 'icon-circle-o',
                permission: 'region.read',
                sidebar: true,
                component: () => import('../views/interrogator/region/RegionIndex'),
            },
            {
                path: '/education-degree',
                name: 'education-degree',
                title: 'crm.Sidebar.EducationDegrees',
                icon: 'icon-circle-o',
                permission: 'education_degree.read',
                sidebar: true,
                component: () => import('../views/interrogator/education-degree/EducationDegreeIndex'),
            },
            {
                path: '/university',
                name: 'university',
                title: 'crm.Sidebar.Universities',
                icon: 'icon-circle-o',
                permission: 'university.read',
                sidebar: true,
                component: () => import('../views/interrogator/university/UniversityIndex'),
            },
            {
                path: '/profession',
                name: 'profession',
                title: 'crm.Sidebar.Professions',
                icon: 'icon-circle-o',
                permission: 'profession.read',
                sidebar: true,
                component: () => import('../views/interrogator/profession/ProfessionIndex'),
            },
        ]
    },
    {
        path: '/user',
        name: 'user',
        title: 'crm.Sidebar.Users',
        icon: 'icon-users',
        permission: 'user.read',
        sidebar: true,
        component: () => import('../views/user/UserIndex'),
    },
    {
        path: '*',
        title: 'crm.Sidebar.Setting',
        icon: 'icon-users',
        permission: 'accept',
        sidebar: true,
        children: [
            /*
            * Language
            * */
            {
                path: '/language',
                name: 'language',
                title: 'crm.Sidebar.SettingLanguages',
                icon: 'icon-language',
                permission: 'language.read',
                sidebar: true,
                component: () => import('../views/setting/language/LanguageIndex'),
            },
            /*
            * Translate
            * */
            {
                path: '/translate',
                name: 'translate',
                title: 'crm.Sidebar.SettingTranslates',
                icon: 'icon-repeat',
                permission: 'language.read',
                sidebar: true,
                component: () => import('../views/setting/language/LanguageTranslate'),
            },
            /*
            * Permission
            * */
            {
                path: '/permission',
                name: 'permission',
                title: 'crm.Sidebar.SettingPermissions',
                icon: 'icon-award',
                permission: 'permission.create',
                sidebar: true,
                component: () => import('../views/setting/permission/PermissionIndex'),
                children: [
                    {
                        path: '/permission/option/:id',
                        name: 'permission.option',
                        title: 'crm.Sidebar.SettingPermissionsParams',
                        icon: 'icon-grid',
                        permission: 'permission.create',
                        sidebar: true,
                        component: () => import('../views/setting/permission/PermissionOption'),
                    },
                ]
            },
            /*
            * Seo
            * */
            {
                path: '/seo',
                name: 'seo',
                title: 'crm.Sidebar.SettingSeoMetaTag',
                icon: 'icon-search',
                permission: 'seo.read',
                sidebar: true,
                component: () => import('../views/setting/seo/SeoIndex'),
            },
            /*
             * General
             * */
            {
                path: '/general',
                name: 'general',
                title: 'crm.Sidebar.SettingMain',
                icon: 'icon-cogs',
                permission: 'setting.read',
                sidebar: true,
                component: () => import('../views/setting/general/GeneralIndex'),
            },
            /*
             * Work Time
             * */
            {
                path: '/work-time',
                name: 'work-time',
                title: 'crm.Sidebar.SettingWorkTime',
                icon: 'icon-clock',
                permission: 'setting.read',
                sidebar: true,
                component: () => import('../views/setting/work-time/WorkTimeIndex'),
            },
            /*
             * Logo
             * */
            {
                path: '/logo',
                name: 'logo',
                title: 'crm.Sidebar.SettingLogo',
                icon: 'icon-picture',
                permission: 'setting.read',
                sidebar: true,
                component: () => import('../views/setting/logo/LogoIndex'),
            },
            /*
             * Html
             * */
            {
                path: '/html',
                name: 'html',
                title: 'crm.Sidebar.SettingHtml',
                icon: 'icon-code1',
                permission: 'setting.read',
                sidebar: true,
                component: () => import('../views/setting/html/HtmlIndex'),
            },
            /*
             * Social Page
             * */
            {
                path: '/social-page',
                name: 'social-page',
                title: 'crm.Sidebar.SettingSocialPage',
                icon: 'icon-link',
                permission: 'setting.read',
                sidebar: true,
                component: () => import('../views/setting/social-page/SocialPageIndex'),
            },
        ]
    },
    /*
     * Auth
     * */
    {
        path: '/auth',
        name: 'auth',
        children: [
            /*
             * Login
             * */
            {
                path: '/auth/login',
                name: 'auth.login',
                component: () => import('../views/auth/AuthLogin'),
            },
            /*
             * Lock Screen
             * */
            {
                path: '/auth/lockscreen',
                name: 'auth.lockscreen',
                component: () => import('../views/auth/AuthLockscreen')
            },
        ]
    },
]

