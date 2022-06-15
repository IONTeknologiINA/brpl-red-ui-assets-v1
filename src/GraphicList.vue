<template>
  <div class="flex-1 mt-20 pt-5 pb-5 mb-10 pl-5 pr-3 bg-gray-100">
    <div v-for="(graphic, index) in renderedGraphics" :key="graphic.graphic"
         class="relative block py-5 px-6 overflow-hidden border border-gray-100 rounded-lg bg-white"
         :class="index > 0 ? 'mt-5' : ''"
    >
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-sky-500 to-purple-600"></span>

      <div class="justify-between sm:flex">
        <div>
          <h5 class="text-xl font-bold text-gray-900">
            {{ graphic.graphic }}
          </h5>
        </div>
      </div>

      <div class="mt-4 sm:pr-8">
        <p class="text-xs text-gray-500">
          {{ graphic.description }}
        </p>
      </div>

      <dl class="flex flex-col mt-4 mb-1 items-end">
        <div @click="gotoGraphicPage(graphic, !graphic.createStatus)"
             :class="createGraphicClasses(!graphic.createStatus)"
        >
            <span :class="createGraphicTextClasses(!graphic.createStatus)">
              {{ graphic.createText }}
            </span>

          <UilAngleDoubleRight
              size="2.4rem"
              :class="createGraphicArrowClasses(!graphic.createStatus)"
          />
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import {UilAngleDoubleRight} from '@iconscout/vue-unicons';
import {translateToURL} from "@/utilities/utils";

export default {
  name: 'GraphicList',
  components: {
    UilAngleDoubleRight
  },
  data() {
    return {
      graphics: [
        {
          graphic: 'Hubungan Panjang Berat',
          description: 'Grafik yang digunakan untuk mensimulasikan hasil perhitungan hubungan panjang dan berat.',
          createText: 'Buat Grafik',
          url: `/${translateToURL(this.$RED.HUBUNGAN_PANJANG_BERAT)}`,
          createStatus: true
        },
        {
          graphic: 'CPUE',
          description: 'Grafik yang digunakan untuk menentukan hasil tangkapan per upaya.',
          createText: 'Buat Grafik',
          url: `/${translateToURL(this.$RED.CPUE)}`,
          createStatus: true
        },
        {
          graphic: 'LPUE',
          description: 'Grafik yang digunakan untuk menentukan hasil tangkapan per trip.',
          createText: 'Buat Grafik',
          url: `/${translateToURL(this.$RED.LPUE)}`,
          createStatus: true
        },
        {
          graphic: 'Hasil Tangkapan Per Trip',
          description: 'Grafik yang digunakan untuk menentukan hasil tangkapan per trip.',
          createText: 'Buat Grafik',
          url: `/${translateToURL(this.$RED.HASIL_TANGKAPAN_PER_TRIP)}`,
          createStatus: true
        },
        {
          graphic: 'Produksi Ikan Per Alat Tangkap',
          description: 'Grafik yang digunakan untuk menentukan hasil tangkapan per trip.',
          createText: 'Buat Grafik',
          url: `/${translateToURL(this.$RED.PRODUKSI_IKAN_PER_ALAT_TANGKAP)}`,
          createStatus: true
        },
        {
          graphic: 'Produksi Ikan Per Sumber Daya',
          description: 'Grafik yang digunakan untuk menentukan hasil tangkapan per trip.',
          createText: 'Buat Grafik',
          url: `/${translateToURL(this.$RED.PRODUKSI_IKAN_PER_SUMBER_DAYA)}`,
          createStatus: true
        },
        {
          graphic: 'Struktur Ukuran Ikan Tertangkap',
          description: 'Grafik yang digunakan untuk menentukan hasil tangkapan per trip.',
          createText: 'Buat Grafik',
          url: `/${translateToURL(this.$RED.STRUKTUR_UKURAN_IKAN_TERTANGKAP)}`,
          createStatus: true
        }
      ],
      // renderedGraphics: []
    }
  },
  mounted() {
    this.$store.commit('setHomepage', true);
  },
  methods: {
    createGraphicClasses: function (disabled) {
      return `group flex flex-row
      items-center w-32
      pl-3 pr-1 justify-between
      border border-dashed border-gray-300 cursor-pointer rounded-lg
      text-xs text-gray-500 hover:text-sky-500
      hover:bg-sky-100 ${disabled ? 'cursor-not-allowed hover:bg-white w-28 border-0 items-end' : ''}
      `;
    },
    createGraphicTextClasses: function (disabled) {
      return `text-gray-400 z-10 group-hover:text-sky-500 ${disabled ? 'cursor-not-allowed group-hover:text-gray-400' : ''}`;
    },
    createGraphicArrowClasses: function (disabled) {
      return `text-gray-300 ml-3 outline-none cursor-pointer -ml-1.5 group-hover:text-sky-300 ${disabled ? 'hidden cursor-not-allowed group-hover:text-gray-300' : ''}`;
    },
    restoreGraphics: function () {
      // this.renderedGraphics = [...this.graphics];
    },
    gotoGraphicPage: function (graphic, disabled) {
      if (disabled) {
        return;
      }

      this.restoreGraphics();
      this.$store.commit('setHomepage', false);
      this.$store.commit('setSearch', false);
      this.$store.commit('setSearchText', '');
      this.$store.commit('setHeaderTitle', graphic.graphic);
      this.$router.push(graphic.url);
    }
  },
  computed: {
    renderedGraphics: function () {
      return this.graphics.filter(g => g.graphic.toLowerCase().includes(
          this.$store.state.searchText.toLowerCase()
      ))
    }
  }
}
</script>

<style scoped>

</style>
