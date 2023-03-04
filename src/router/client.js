const client = [
    {
        path:'/',
        children:[
            {
                path: '',
                name: "HomePage",
                component: () => import("@/views/Client/TopView.vue"),
                meta: { title: 'Trang Chủ' }
            },
            {
                path: 'about',
                name: "About",
                component: () => import("@/views/Page/AboutView.vue"),
                meta: { title: 'Thông Tin Thêm' }
            },
            {
                path: 'book',
                name: "BookList",
                props: true,
                component: () => import("@/views/Client/BookListView.vue"),
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
            {
                path: 'major/:id',
                name: "BookListMajor",
                component: () => import("@/views/Client/BookListView.vue"),
                meta: { title: 'Ngành Học' }
            },
            {
                path: 'loan',
                name: "LoanBook",
                component: () => import("@/views/Client/LoanView.vue"),
                meta: { title: 'Mượn Sách' }
            },
        ],
        component: () => import("@/views/Client/ClientView.vue"),
    },
    
]

export default client;
