## Middlewares

This directory closely works with vue router. You can store your navigation guards inside this folder. Here is a short example of a single middleware

    export default function checkAuth(next, isAuthenticated) {  
	     if (isAuthenticated) { 
		     next('/') 
		 } else {
			 next('/login'); 
		 }
	}

and use it inside the vue-router

    import Router from 'vue-router'  
    import checkAuth from '../middlewares/checkAuth.js'  
    const isAuthenticated = true  
    const router = new Router({  
	    routes: [],  
	    mode: 'history'  
    })  
    router.beforeEach((to, from, next) => {  
	    checkAuth(next, isAuthenticated)
    });

More advance topic about router and middlewares you can find in this [article](https://itnext.io/vue-tricks-smart-router-for-vuejs-93c287f46b50).
