<template>
  <div>
    <div class="max-w-screen-xl  mx-auto">
      <div class="max-w-lg mx-auto">


        <div class="px-6 mt-6 mb-0 space-y-4 rounded-lg ">
          <p class="text-lg font-medium">Masukan parameter</p>

          <div>
            <label for="tahun" class="text-xs font-medium">Tahun</label>

            <div class="relative mt-1">
              <input
                  type="text"
                  id="tahun"
                  class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm"
                  placeholder="Inputkan tahun"
              />
            </div>
          </div>

          <div>
            <label for="spesies" class="text-xs font-medium">Spesies</label>

            <div class="relative mt-1">
              <input
                  type="text"
                  id="spesies"
                  class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm"
                  placeholder="Inputkan nama spesies"
              />
            </div>
          </div>

          <div>
            <label for="wpp" class="text-xs font-medium">WPP</label>

            <div class="relative mt-1">
              <input
                  type="text"
                  id="wpp"
                  class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm"
                  placeholder="Pilih WPP"
              />
            </div>
          </div>

          <div>
            <label for="lokasi" class="text-xs font-medium">Lokasi Pendaratan</label>

            <div class="relative mt-1">
              <input
                  type="text"
                  id="lokasi"
                  class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm"
                  placeholder="Inputkan lokasi pendaratan"
              />
            </div>
          </div>

          <button @click="generate" class="w-full px-5 py-3 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring">
            Generate Grafik
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanjangBerat',
  methods: {
    generate: async function () {

    }
  }
}
</script>

<style scoped>

</style>
