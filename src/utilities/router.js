import {createRouter, createWebHistory} from "vue-router";
import GraphicList from "@/GraphicList";
import ResProps from './global-properties';
import {translateToURL} from "@/utilities/utils";
// import HubunganPanjangBerat from "@/reports/HubunganPanjangBerat";
// import Cpue from "@/reports/Cpue";
// import Lpue from "@/reports/Lpue";
// import HasilTangkapanPerTrip from "@/reports/HasilTangkapanPerTrip";
// import ProduksiIkanPerAlatTangkap from "@/reports/ProduksiIkanPerAlatTangkap";
// import ProduksiIkanPerSumberDaya from "@/reports/ProduksiIkanPerSumberDaya";
// import StrukturUkuranIkanTertangkap from "@/reports/StrukturUkuranIkanTertangkap";

// const data = [];
// const result = data.reduce((accumulator, currentValue) => {
//     const {rate: {roomType: {name: currentRoomType}}} = currentValue;
//     const exist = accumulator.find(({rate: {roomType: {name: roomType}}}) => roomType === currentRoomType);
//     if (!exist)
//         accumulator.push(currentValue);
//
//     return accumulator;
// }, []);


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
            // component: HubunganPanjangBerat
        },
        {
            path: `/${translateToURL(ResProps.CPUE)}`,
            component: () => import ('../reports/Cpue.vue')
            // component: Cpue
        },
        {
            path: `/${translateToURL(ResProps.LPUE)}`,
            component: () => import ('../reports/Lpue.vue')
            // component: Lpue
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
        window.scrollTo(0, 0);
    }
});

export default router;
