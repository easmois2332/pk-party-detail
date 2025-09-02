import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import HelpView from "@/views/HelpView.vue";
import IframeView from "@/views/IframeView.vue";
import ErrorView from "@/views/ErrorView.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/help',
            name: 'help',
            component: HelpView,
        },
        {
            path: '/iframe/:format',
            name: 'iframe',
            component: IframeView,
        },
        {
            path: '/:error(.*)',
            name: 'error',
            component: ErrorView,
        },
    ],
})

export default router
