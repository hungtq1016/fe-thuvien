const login = [
    {
        path:'/login',
        name: "login",
        meta: { title: 'Đăng Nhập' },
        component:() => import("../views/Page/LoginView.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        component: ()=>import("../views/Page/404View.vue"),
        meta: { title: '404' },
    },
    {
        path: "/admin/:pathMatch(.*)*",
        component: () => import("../views/Page/404View.vue"),
        meta: { title: '404' },
    }
]

export default login
