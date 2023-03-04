const admin = [
    {
        path: '/admin',
        beforeEnter(to, from, next) {
            if (isAuthenticated()) {
                if (!hasPermissionsAdmin(to)) {
                    next('/');
                } else {
                    next();
                }
            } else {
                next('/login');
            }
        },
        component: () => import("../views/Admin/AdminView.vue"),
        children: [
            {
                path: '',
                name: "AdminDashboard",
                component: () => import("../views/Admin/TopView.vue"),
                meta: { title: 'Trang Quản Lý' }
            },
            {
                path: 'category',
                name: "AdminCategory",
                meta: { title: 'Thể Loại' },
                component: () => import("../views/Admin/TableView.vue"),
            },
            {
                path: 'tag',
                name: "AdminTag",
                meta: { title: 'Nhãn Dán' },
                component: () => import("../views/Admin/TableView.vue"),
            },
            {
                path: 'author',
                name: "AdminAuthor",
                meta: { title: 'Tác Giả' },
                component: () => import("../views/Admin/TableView.vue"),
            },
            {
                path: 'bookshelf',
                name: "AdminBookShelf",
                meta: { title: 'Kệ Sách' },
                component: () => import("../views/Admin/TableView.vue"),
            },
            {
                path: 'language',
                name: "AdminLanguage",
                meta: { title: 'Ngôn Ngữ' },
                component: () => import("../views/Admin/TableView.vue"),
            },
            {
                path: 'major',
                name: "AdminMajor",
                meta: { title: 'Ngành Học' },
                component: () => import("../views/Admin/TableView.vue"),
            },
            {
                path: 'user',
                name: "AdminUser",
                meta: { title: 'Người Dùng' },
                component: () => import("../views/Admin/LoanView.vue"),
            },
            {
                path: 'role',
                name: "AdminRole",
                meta: { title: 'Vai Trò' },
                component: () => import("../views/Admin/TableView.vue"),
            },
            {
                path: 'publisher',
                name: "AdminPublisher",
                meta: { title: 'Nhà Xuất Bản' },
                component: () => import("../views/Admin/TableView.vue"),
            },
            {
                path: 'book',
                name: "AdminBook",
                meta: { title: 'Sách' },
                component: () => import("../views/Admin/TableView.vue"),
            },
            {
                path: 'image',
                name: "AdminImage",
                meta: { title: 'Hình Ảnh' },
                component: () => import("../views/Admin/ImageView.vue"),
            },
            {
                path: 'menu',
                name: "AdminMenu",
                meta: { title: 'Menu' },
                component: () => import("../views/Admin/MenuView.vue"),
            },
        ],
    },
    
]

function isAuthenticated() {
    // const token = localStorage.getItem('token-admin');
    const token = window.$cookies.isKey("ltoken");
    if (token) {
        return true;
    }
    console.log('false');
    return false
}

function hasPermissionsAdmin() {
    const today = new Date()
    const isAdmin = window.btoa(today.getMonth() + "admin");
    const token = window.$cookies.isKey(isAdmin);
    if (token) {
        return true;
    }
    return false
}
export default admin
