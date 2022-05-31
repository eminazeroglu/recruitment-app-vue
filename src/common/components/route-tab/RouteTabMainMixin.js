import {mapState} from "vuex";

export default {
    data() {
        return {
            renderComponent: true,
            items: [],
            limit: 5,
            contextmenuSelect: {},
            componentName: null
        }
    },
    watch: {
        $route(val) {
            this.setItem(val);
        },
        routeTabCurrent(val) {
            if (val.title) {
                this.setParamsItem(val)
            }
        },
        routeTabClose(val) {
            if (val) {
                this.removeItem(val)
            }
        }
    },
    computed: {
        ...mapState('RouteTabStore', ['routeTabCurrent', 'routeTabClose']),
        customItems() {
            return this.items.sort((a, b) => {
                return b.time - a.time
            });
        },
        contextMenuInstance() {
            return this.$refs.routeTabContextmenu;
        },
        contextmenuItems() {
            return [
                {action: 'reload', name: this.translate('routeTab.Reload')},
                {action: 'close', name: this.translate('routeTab.Close')},
                {action: 'rightClose', name: this.translate('routeTab.RightClose')},
                {action: 'allClose', name: this.translate('routeTab.AllClose')},
            ]
        }
    },
    created() {
        this.initialItem();
        this.calculateLimit();
        this.windowResize();
    },
    methods: {
        /*
         * Force Rerender
         * */
        forceRerender() {
            this.renderComponent = false;
            this.$nextTick(() => {
                this.renderComponent = true;
            })
        },
        /*
         * Calculate Limit
         * */
        calculateLimit() {
            const screen = this.currentScreen();
            if (screen.md.status) this.limit = 5
            if (screen.lg.status) this.limit = 8
            if (screen.xl.status) this.limit = 11
        },
        /*
         * Window Resize
         * */
        windowResize() {
            window.onresize = () => {
                this.calculateLimit()
            }
        },
        /*
         * Set Session
         * */
        setSession() {
            sessionStorage.routeTab = JSON.stringify(this.items);
            this.$forceUpdate();
        },
        /*
         * Set Params Item
         * */
        setParamsItem(item = {}) {
            if (item.path) {
                const index = this.items.findIndex(i => i.path === item.path);
                const findItem = this.items[index] || {};
                if (index >= 0 ) {
                    this.items[index].title = item.title;
                    this.setSession();
                }
            }
        },
        /*
         * Set Object
         * */
        setObject(item = {}) {
            const meta = {...item.meta};
            let title = item.title ? item.title : this.translate(meta.title);
            delete meta.title;
            return {
                path: item.path,
                name: item.name,
                time: item.time,
                title,
                ...meta
            }
        },
        /*
         * Redirect
         * */
        redirect(item = {}) {
            const l = this.items.filter(i => i.time > item.time).pop();
            const r = this.items.filter(i => i.time < item.time).shift();
            if (this.$route.path === item.path) {
                if (l && l.path && this.$route.path !== l.path) this.$router.push(l.path);
                else if (r && r.path && this.$route.path !== r.path) this.$router.push(r.path);
                else this.$router.push('/')
            }
        },
        /*
         * Initial Item
         * */
        initialItem() {
            try {
                const sessionItems = sessionStorage.routeTab && JSON.parse(sessionStorage.routeTab) ? JSON.parse(sessionStorage.routeTab) : [];
                if (sessionItems.length)
                    this.items = sessionItems;
                else
                    this.items.push(this.setObject({time: new Date().getTime(), ...this.$route}));
            }
            catch (e) {
                console.log(e.message);
            }
        },
        /*
         * Set Current Route
         * */
        setCurrentRoute() {
            this.items.push(this.setObject({time: new Date().getTime(), ...this.$route}));
        },
        /*
         * Set Item
         * */
        setItem(item) {
            const index = this.items.findIndex(i => i.path === item.path);
            if (index >= 0) this.items[index] = this.setObject({time: this.items[index].time || new Date().getTime(), ...item})
            else this.items.push(this.setObject({time: new Date().getTime(), ...item}));
            this.setSession();
        },
        /*
         * Remove Item
         * */
        removeItem(item) {
            this.items = this.items.filter(i => i.path !== item.path);
            this.setSession();
            this.redirect(item);
            this.contextmenuClose();
        },
        /*
         * Remove Right
         * */
        removeRight(item) {
            const currentItem = this.items.find(i => i.path === this.$route.path);
            this.items = this.items.filter(i => i.time >= item.time);
            this.setSession();
            this.contextmenuClose();

            if (item.time > currentItem.time) {
                this.$router.push(item.path);
            }
        },
        /*
         * Remove All
         * */
        removeAll() {
            sessionStorage.routeTab = [];
            this.items = [];
            this.setCurrentRoute();
            this.forceRerender();
            this.contextmenuClose();
            this.$forceUpdate();
        },
        /*
         * Dropdown Item
         * */
        dropdownItem(item) {
            const index = this.items.findIndex(i => i.path === item.path);
            if (index >= 0) {
                this.items[index].time = new Date().getTime();
                this.setSession();
                if (item.path !== this.$route.path)
                    this.$router.push(item.path)
            }
        },
        /*
         * Context Menu Close
         * */
        contextmenuClose() {
            this.contextMenuInstance.classList.remove('route-tab__contextmenu--open');
            this.contextmenuSelect = {};
        },
        /*
         * Context Menu Reset
         * */
        contextMenuReset(callback) {
            this.contextMenuInstance.classList.remove('route-tab__contextmenu--open');
            setTimeout(() => {
                callback();
            }, 200);
        },
        /*
         * Context Menu Move
         * */
        contextMenuMove(event) {
            const hasLink = event.target.classList.contains('route-tab__link');
            const obj = hasLink ? event.target : event.target.closest('.route-tab__link');
            const {pageX, pageY} = event;
            this.contextMenuInstance.style.top = pageY + 'px';
            this.contextMenuInstance.style.left = pageX + 'px';
            this.contextMenuInstance.classList.add('route-tab__contextmenu--open');
        },
        /*
         * Context Menu
         * */
        contextmenu(item, event) {
            event.preventDefault();
            this.contextMenuReset(() => {
                this.$nextTick(() => {
                    this.contextMenuMove(event)
                })
            });
            this.contextmenuSelect = item;
        },
        /*
         * Context Menu Out Side
         * */
        contextmenuOutSide() {
            const contextMenu = this.$refs.routeTabContextmenu;
            contextMenu.classList.remove('route-tab__contextmenu--open');
        },
        /*
         * Context Menu Action
         * */
        contextMenuAction(i) {
            if (i.action === 'reload') this.forceRerender();
            else if (i.action === 'close') this.removeItem(this.contextmenuSelect);
            else if (i.action === 'rightClose') this.removeRight(this.contextmenuSelect);
            else if (i.action === 'allClose') this.removeAll();

            this.contextmenuClose();
        }
    }
}
