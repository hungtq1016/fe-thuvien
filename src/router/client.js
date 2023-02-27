const client = [
    {
        path:'/',
        children:[
            {
                path: '',
                name: "home",
                component: () => import("@/views/Client/TopView.vue"),
                meta: { title: 'Trang Chủ' }
            },
            {
                path: 'book',
                name: "BookList",
                props: true,
                component: () => import("@/views/Client/ListView.vue"),
                meta: { title: 'Danh Sách' }
            },
            {
                path: 'book/:id',
                name: "BookDetail",
                props: true,
                component: () => import("@/views/Client/BookDetailView.vue"),
                meta: { title: 'Danh Sách' }
            },
            {
                path: 'category',
                name: "CategoryList",
                component: () => import("@/views/Client/MenuView.vue"),
                meta: { title: 'Thể Loại' }
            },
            {
                path: 'category/:id',
                name: "BookListCategory",
                props: true,
                component: () => import("@/views/Client/BookListView.vue"),
                meta: { title: 'Thể Loại' }
            },
            {
                path: 'author',
                name: "AuthorList",
                component: () => import("@/views/Client/MenuView.vue"),
                meta: { title: 'Tác Giả' }
            },
            {
                path: 'author/:id',
                name: "BookListAuthor",
                props: true,
                component: () => import("@/views/Client/BookListView.vue"),
                meta: { title: 'Tác Giả' }
            },
            {
                path: 'major',
                name: "MajorList",
                component: () => import("@/views/Client/MenuView.vue"),
                meta: { title: 'Ngành Học' }
            },
        ],
        component: () => import("@/views/Client/ClientView.vue"),
    },
    
]

export default client;
