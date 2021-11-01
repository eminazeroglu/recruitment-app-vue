import Vue from 'vue'
import Router from 'vue-router'
import routes from "./routes";
import {authentication} from "../middlewares/authentication";

/*
 * Vue-de router istifade etmek ucun
 * Router Vue tanidiriq
 * */

Vue.use(Router)
/*
 * routers.js faylindaki router-lari
 * Router objesine elave edirik
 * */
const CustomRouter = new Router({routes});

/*
 * Route-lar ucun middleware
 * yaziriq
 * */
CustomRouter.beforeEach((to, from, next) => authentication(to, from, next));
/*
 * Route teyin etdiyimiz
 * deyeri export edirik
 * */
export default CustomRouter;
