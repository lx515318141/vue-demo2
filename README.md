# Vue-Router进阶
   ## 1.导航守卫
        1.1.全局前置守卫
            router.beforeEach((to, from, next) => {  // ...  }) 导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于等待中。 (守卫的三个参数，to：到那个路径去；from：从拿个路径离开；next：表示跳转至此那个成功函数resolve，必须调用此函数，否则不进行跳转)
        1.2.全局解析守卫
            router.beforeResolve 与全局前置守卫用法基本一样，唯一区别：在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
        1.3.全局后置守卫
            router.afterEach((to, from) => {  // ...  })，与前置守卫一样，只是不接收next参数。
        1.4.路由独享的守卫
            beforeEnter: (to, from, next) => {  // ...  }，与前置守卫用法一样只是写在routes中的单个路由里面，只有跳转到该路由的时候才会被调用。
        1.5.组件内的守卫
            beforeRouteEnter (to, from, next) {
                // 在渲染该组件的对应路由被 confirm 前调用
                // 不！能！获取组件实例 `this`
                // 因为当守卫执行前，组件实例还没被创建
            },
                beforeRouteUpdate (to, from, next) {
                // 在当前路由改变，但是该组件被复用时调用
                // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
                // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
                // 可以访问组件实例 `this`
            },
                beforeRouteLeave (to, from, next) {
                // 导航离开该组件的对应路由时调用
                // 可以访问组件实例 `this`
            }
        1.6.完整的导航解析流程
            1.导航被触发。
            2.在失活的组件里调用离开守卫。
            3.调用全局的 beforeEach 守卫。
            4.在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
            5.在路由配置里调用 beforeEnter。
            6.解析异步路由组件。
            7.在被激活的组件里调用 beforeRouteEnter。
            8.调用全局的 beforeResolve 守卫 (2.5+)。
            9.导航被确认。
            10.调用全局的 afterEach 钩子。
            11.触发 DOM 更新。
            12.用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
   ## 2.路由元信息
        meta属性：以对象的形式表现，在其中写入的属性就是路由元信息，且meta中可以设置多个属性，且可以根据自己的想法设置属性名，没有固定属性名，写入后可在守卫中的to元素中meta，以此来进行一些判断。
   ## 3.过渡效果
        和之前使用的过渡效果类似通过transition实现。
   ## 4.滚动行为
        scrollBehavior (to, from, savedPosition) {
            // ...
        }
   ## 5.路由懒加载
        const Foo = () => import('./Foo.vue')
