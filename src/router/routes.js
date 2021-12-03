import {routers} from './modules'
import Helpers from "../plugins/helpers";

let routes = Helpers.mergeNested(routers.map(i => {return {...i}}));

routes.map(async r => {
    r.meta = {
        title: r.key !== 'path' && r.title ? r.title : '',
        subTitle: r.subTitle || '',
        icon: r.icon || '',
        key: r.key || '',
        can: r.permission ? Helpers.can(r.permission) : false,
        isLogin: !!r.isLogin
    }
    delete r.title;
    delete r.subTitle;
    delete r.icon;
    delete r.key;
    delete r.permission;
    delete r.isLogin;
})

export default routes;
