import {createRouter, createWebHistory} from "vue-router";
import GraphicList from "@/GraphicList";
import ResProps from './global-properties';
import {delay, translateToURL} from "@/utilities/utils";
// import HubunganPanjangBerat from "@/reports/HubunganPanjangBerat";
// import Cpue from "@/reports/Cpue";
// import Lpue from "@/reports/Lpue";
// import HasilTangkapanPerTrip from "@/reports/HasilTangkapanPerTrip";
// import ProduksiIkanPerAlatTangkap from "@/reports/ProduksiIkanPerAlatTangkap";
// import ProduksiIkanPerSumberDaya from "@/reports/ProduksiIkanPerSumberDaya";
// import StrukturUkuranIkanTertangkap from "@/reports/StrukturUkuranIkanTertangkap";
const delayMs = 100;


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
            component: async () => {
                await delay(delayMs);
                return await import ('../reports/HubunganPanjangBerat.vue')
            }
            // component: HubunganPanjangBerat
        },
        {
            path: `/${translateToURL(ResProps.CPUE)}`,
            component: async () => {
                await delay(delayMs);
                return await import ('../reports/Cpue.vue')
            }
            // component: Cpue
        },
        {
            path: `/${translateToURL(ResProps.LPUE)}`,
            component: async () => {
                await delay(delayMs);
                return await import ('../reports/Lpue.vue')
            }
            // component: Lpue
        },
        {
            path: `/${translateToURL(ResProps.HASIL_TANGKAPAN_PER_TRIP)}`,
            component: async () => {
                await delay(delayMs);
                return await import ('../reports/HasilTangkapanPerTrip.vue')
            }
            // component: HasilTangkapanPerTrip
        },
        {
            path: `/${translateToURL(ResProps.PRODUKSI_IKAN_PER_ALAT_TANGKAP)}`,
            component: async () => {
                await delay(delayMs);
                return await import ('../reports/ProduksiIkanPerAlatTangkap.vue')
            }
            // component: ProduksiIkanPerAlatTangkap
        },
        {
            path: `/${translateToURL(ResProps.PRODUKSI_IKAN_PER_SUMBER_DAYA)}`,
            component: async () => {
                await delay(delayMs);
                return await import ('../reports/ProduksiIkanPerSumberDaya.vue')
            }
            // component: ProduksiIkanPerSumberDaya
        },
        {
            path: `/${translateToURL(ResProps.STRUKTUR_UKURAN_IKAN_TERTANGKAP)}`,
            component: async () => {
                await delay(delayMs);
                return await import ('../reports/StrukturUkuranIkanTertangkap.vue')
            }
            // component: StrukturUkuranIkanTertangkap
        },
        {
            path: `/${translateToURL(ResProps.HS_PERBANDINGAN_PANJANG_BERAT)}`,
            component: async () => {
                await delay(delayMs);
                return await import ('../reports/HsPerbandinganPanjangBerat.vue')
            }
        },
    ],
    scrollBehavior() {
        window.scrollTo(0, 0);
    }
});

export default router;
