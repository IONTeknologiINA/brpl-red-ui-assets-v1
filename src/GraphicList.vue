<template>
  <div class="flex-1 overflow-y-auto p-5">

    <div v-for="(graphic, index) in renderedGraphics" :key="graphic.graphic"
         class="relative block py-5 px-6 overflow-hidden border border-gray-100 rounded-lg bg-white"
         :class="index > 0 ? 'mt-5' : ''"
    >
      <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

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
        <button @click="gotoGraphicPage(graphic)" :disabled="!graphic.createStatus"
                :class="graphic.createStatus ? 'flex items-center justify-between px-3 py-2 text-blue-600 transition-colors border border-current rounded-lg hover:bg-blue-500 group active:bg-indigo-500 focus:outline-none focus:ring'
                : 'flex items-center justify-between px-3 py-2 text-gray-600 transition-colors border border-current rounded-lg  group focus:outline-none '">
            <span :class="graphic.createStatus ? 'text-xs font-medium transition-colors group-hover:text-white'
                  : 'text-xs font-medium transition-colors'">
              {{ graphic.createText }}
            </span>

          <svg v-if="graphic.createStatus" class="w-5 h-5 ml-3" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </button>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GraphicList',
  data() {
    return {
      graphics: [
        {
          graphic: 'Panjang vs berat',
          description: 'Grafik yang digunakan untuk mensimulasikan hasil perhitungan panjang dan berat.',
          createText: 'Buat Grafik',
          url: '/panjang-berat',
          createStatus: true
        },
        {
          graphic: 'Tingkat sebaran',
          description: 'Grafik yang digunakan untuk memprediksi penyebaran suatu spesies.',
          createText: 'Segera ...',
          createStatus: false
        },
        {
          graphic: 'Saran produksi',
          description: 'Grafik yang digunakan untuk mempreiksi total produksi yang terjadi.',
          createText: 'Segera ...',
          createStatus: false
        }

      ],
      renderedGraphics: []
    }
  },
  beforeMount() {
    this.restoreGraphics();
  },
  methods: {
    restoreGraphics: function () {
      this.renderedGraphics = [...this.graphics];
    },
    gotoGraphicPage: function (graphic) {
      this.restoreGraphics();
      this.$store.commit('setHomepage', false);
      this.$store.commit('setSearch', false);
      this.$store.commit('setHeaderTitle', graphic.graphic);
      this.$router.push(graphic.url);
    }
  }
}
</script>

<style scoped>

</style>
