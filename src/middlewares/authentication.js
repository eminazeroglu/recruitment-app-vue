import store from '../store'

export const authentication = (to, from, next) => {
    const token = localStorage.token;
    const can = to.matched.some(r => r.meta.can);
    if (token) {
        store.dispatch('AuthStore/checkToken');
        if ((to.fullPath.startsWith('/auth') || !can) && to.name !== 'index') next({name: 'index'});
        next();
    }
    else {
        if (!to.fullPath.startsWith('/auth')) next({name: 'auth.login'});
        if (to.fullPath.startsWith('/auth') && to.name !== 'auth.lockscreen' && localStorage.lockScreen) next({name: 'auth.lockscreen'});
        next();
    }
}
