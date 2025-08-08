import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import HelpView from "@/views/HelpView.vue";
import IframeView from "@/views/IframeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
            path: '/iframe',
            name: 'iframe',
            component: IframeView,
        },
    ],
})

export default router
