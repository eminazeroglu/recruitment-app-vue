import {mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions('RouteTabStore', ['setRouteTabCurrent', 'setCloseRouteTab']),
        setRouteTab(value) {
            console.log(value);
            const item = {...this.$route};
            delete item.meta.title;
            this.setRouteTabCurrent({...item, ...value});
        },
        closeRouteTab(item = null) {
            this.setCloseRouteTab(item || this.$route);
        }
    }
}
