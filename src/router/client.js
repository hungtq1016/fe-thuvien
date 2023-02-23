const client = [
    {
        path:'/',
        children:[
            {
                path: '',
                name: "home",
                component: () => import("../views/Client/TopView.vue"),
                meta: { title: 'Trang Chủ' }
            },
            {
                path: 'book',
                name: "BookList",
                props: true,
                component: () => import("../views/Client/ListView.vue"),
                meta: { title: 'Danh Sách' }
            },
            {
                path: 'book/:slug',
                name: "BookDetail",
                props: true,
                component: () => import("../views/Client/BookDetailView.vue"),
                meta: { title: 'Danh Sách' }
            },
            {
                path: 'category',
                name: "CategoryList",
                component: () => import("../views/Client/MenuView.vue"),
                meta: { title: 'category' }
            },
            {
                path: 'category/:slug',
                name: "RequestBook",
                props: true,
                component: () => import("../views/Client/ListView.vue"),
                meta: { title: 'category' }
            },
            {
                path: 'poem',
                name: "PoemList",
                component: () => import("../views/Client/MenuView.vue"),
                meta: { title: 'poem' }
            },
            {
                path: 'poem/:slug',
                name: "RequestBook",
                props: true,
                component: () => import("../views/Client/ListView.vue"),
                meta: { title: 'poem' }
            },
        ],
        component: () => import("../views/Client/ClientView.vue"),
    },
    
]

export default client;
