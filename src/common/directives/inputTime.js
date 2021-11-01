export default {
    install(Vue, options = null) {
        Vue.directive('time-two', {
            bind(el, binding, vnode) {
                el.addEventListener('input', (e) => {
                    const regex = /(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})/;
                    let x = e.target.value.replace(/\D/g, '').match(regex);
                    e.target.value = !x[2] ? x[1] : x[1] + ':' + x[2] + '-' + (x[3] ? x[3] : '') + ':' + (x[4] ? x[4] : '');
                })
            }
        });
        Vue.directive('time', {
            bind(el, binding, vnode) {
                el.addEventListener('input', (e) => {
                    const regex = /(\d{0,2})(\d{0,2})/;
                    let x = e.target.value.replace(/\D/g, '').match(regex);
                    e.target.value = !x[2] ? x[1] : x[1] + ':' + x[2];
                })
            }
        });
    },
}
