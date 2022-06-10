import {createRouter, createWebHistory} from "vue-router";
import GraphicList from "@/GraphicList";
import HubunganPanjangBerat from "@/reports/HubunganPanjangBerat";

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            component: GraphicList
        },
        {
            path: '/userCodeAppPanel',
            component: GraphicList
        },
        {
            path: '/hubungan-panjang-berat',
            component: HubunganPanjangBerat
        }
    ]
});

export default router;
