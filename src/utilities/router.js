import {createRouter, createWebHistory} from "vue-router";
import GraphicList from "@/GraphicList";
import ResProps from './global-properties';
import {translateToURL} from "@/utilities/utils";

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
            path: `/${translateToURL(ResProps.HUBUNGAN_PANJANG_BERAT)}`,
            component: () => import ('../reports/HubunganPanjangBerat.vue')
        },
        {
            path: `/${translateToURL(ResProps.CPUE)}`,
            component: () => import ('../reports/Cpue.vue')
        },
        {
            path: `/${translateToURL(ResProps.LPUE)}`,
            component: () => import ('../reports/Lpue.vue')
        },
        {
            path: `/${translateToURL(ResProps.HASIL_TANGKAPAN_PER_TRIP)}`,
            component: () => import ('../reports/HasilTangkapanPerTrip.vue')
            // component: HasilTangkapanPerTrip
        },
        {
            path: `/${translateToURL(ResProps.PRODUKSI_IKAN_PER_ALAT_TANGKAP)}`,
            component: () => import ('../reports/ProduksiIkanPerAlatTangkap.vue')
            // component: ProduksiIkanPerAlatTangkap
        },
        {
            path: `/${translateToURL(ResProps.PRODUKSI_IKAN_PER_SUMBER_DAYA)}`,
            component: () => import ('../reports/ProduksiIkanPerSumberDaya.vue')
            // component: ProduksiIkanPerSumberDaya
        },
        {
            path: `/${translateToURL(ResProps.STRUKTUR_UKURAN_IKAN_TERTANGKAP)}`,
            component: () => import ('../reports/StrukturUkuranIkanTertangkap.vue')
            // component: StrukturUkuranIkanTertangkap
        },
    ],
    scrollBehavior() {
        window.scrollTo(0,0);
    }
});

export default router;
