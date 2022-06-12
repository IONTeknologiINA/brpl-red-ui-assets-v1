import {createRouter, createWebHistory} from "vue-router";
import GraphicList from "@/GraphicList";
import HubunganPanjangBerat from "@/reports/HubunganPanjangBerat";
import Cpue from "@/reports/Cpue";
import ResProps from './global-properties';
import Lpue from "@/reports/Lpue";
import HasilTangkapanPerTrip from "@/reports/HasilTangkapanPerTrip";
import ProduksiIkanPerAlatTangkap from "@/reports/ProduksiIkanPerAlatTangkap";
import {translateToURL} from "@/utilities/utils";
import ProduksiIkanPerSumberDaya from "@/reports/ProduksiIkanPerSumberDaya";
import StrukturUkuranIkanTertangkap from "@/reports/StrukturUkuranIkanTertangkap";

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
            component: HubunganPanjangBerat
        },
        {
            path: `/${translateToURL(ResProps.CPUE)}`,
            component: Cpue
        },
        {
            path: `/${translateToURL(ResProps.LPUE)}`,
            component: Lpue
        },
        {
            path: `/${translateToURL(ResProps.HASIL_TANGKAPAN_PER_TRIP)}`,
            component: HasilTangkapanPerTrip
        },
        {
            path: `/${translateToURL(ResProps.PRODUKSI_IKAN_PER_ALAT_TANGKAP)}`,
            component: ProduksiIkanPerAlatTangkap
        },
        {
            path: `/${translateToURL(ResProps.PRODUKSI_IKAN_PER_SUMBER_DAYA)}`,
            component: ProduksiIkanPerSumberDaya
        },
        {
            path: `/${translateToURL(ResProps.STRUKTUR_UKURAN_IKAN_TERTANGKAP)}`,
            component: StrukturUkuranIkanTertangkap
        },
    ],
    scrollBehavior() {
        window.scrollTo(0,0);
    }
});

export default router;
