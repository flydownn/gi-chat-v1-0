import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        name: 'Home',
        path : '/',
        component : () => import("@/views/HomePage")
    },
    {
        name: 'Login',
        path : '/login',
        component : () => import("@/views/LoginPage")
    },
    {
        name: 'Register',
        path : '/register',
        component : () => import("@/views/RegisterPage")
    },
    {
        name: 'Chat',
        path : '/chat',
        component : () => import("@/views/ChatPage")
    },
]

const router = createRouter({
    routes : routes,
    history: createWebHistory(),
});

export default router;