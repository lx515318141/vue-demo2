import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../pages/Home"
import Mine from "../pages/Mine"
// import Login from "../pages/Login"
const Login = ()=> import("../pages/Login")
// 此时Login页面可以实现懒加载

Vue.use(VueRouter)

export default function(){
    const router = new VueRouter({
        routes:[
            {
                path:"/",
                component:Home
            },
            {
                path:"/mine",
                component:Mine,
                meta:{
                    // meta中可以设置多个属性，且可以根据自己的想法设置属性名，没有固定属性名
                    flage:true,
                    isLogin:true
                    // 表示进入mine页面是否需要登录
                }
                // beforeEnter: (to, from, next) => {
                //     console.log(from,to);
                //     next()
                //   }
            },
            {
                path:"/login",
                component:Login
            }
        ],
        scrollBehavior (to, from, savedPosition) {
            // return 希望滚动到哪个的位置
            return {x: 0, y: 300}
        }
    })
    router.beforeEach((to, from, next) => {
        console.log(from,to);
        // next()  // 允许跳转
        // next(false)  // 不允许跳转
        // next("/xxx") // 直接指定跳转路径

        // 判断是否需要登录
        if (to.matched.some(item => item.meta.isLogin)){
            // true 需要登录
            // 需要结合token判断是否已经登录 token=true/false
            let token = "wocao";
            if(token){
                next();
            }else{
                next({
                    path:"/login"
                })
            }
            
        }else{
            // 不需要登录
            next()
        }
    })
    router.afterEach((to, from) => {
        // console.log(from,to);
    })
    return router
}
