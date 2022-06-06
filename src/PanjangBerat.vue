<template>
  <div class="relative h-full">
    <button v-if="loading && !insertingImage" style="z-index: 10000"
            @click="onCancel"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 text-xs mb-6 font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 focus:ring">
      Batalkan
    </button>
    <span v-if="insertingImage"
          style="z-index: 10000"
          class="text-xs text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      Menyisipkan gambar ...
    </span>
    <loading v-model:active="loading"
             :color="'#ff2020'"
             :width="25"
             :height="25"
             :opacity="0.9"
             :is-full-page="true"/>
    <div class="max-w-screen-xl mx-auto">

      <div class="max-w-lg mx-auto">


        <div class="px-6 mt-6 mb-0 space-y-5 rounded-lg ">
          <p class="text-lg font-medium">Masukan parameter</p>

          <div>
            <label for="tahun" class="text-sm font-medium">Tahun</label>
            <Multiselect
                placeholder="Pilih Tahun"
                v-model="selectedYear"
                :classes="{
                    clearIcon: '',
                    container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer bg-white rounded  outline-none py-3 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'max-h-60 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                }"
                :options="years"
            />
          </div>

          <div>
            <label for="wpp" class="text-sm font-medium">WPP</label>
            <Multiselect
                placeholder="Pilih WPP"
                v-model="selectedWpp"
                :classes="{
                    clearIcon: '',
                    container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer bg-white rounded  outline-none py-3 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'max-h-60 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                  }"
                :options="wpp"
            />
          </div>

          <div>
            <label for="spesies" class="text-sm font-medium">Spesies</label>

            <div class="relative mt-1">
              <Multiselect
                  v-model="selectedSpecies"
                  mode="tags"
                  :classes="{
                    clearIcon: '',
                    container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer bg-white rounded  outline-none py-2 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'max-h-60 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                    tagsSearch: 'absolute inset-0 border-0 outline-none -ml-1.5 focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full',
                  }"
                  placeholder="Pilih nama spesies"
                  :close-on-select="false"
                  :searchable="true"
                  :create-option="false"
                  :options="species"
              />
            </div>
          </div>

          <div>
            <label for="lokasi" class="text-sm font-medium">Lokasi Pendaratan</label>

            <div class="relative mt-1">
              <Multiselect
                  placeholder="Pilih lokasi sampling"
                  v-model="selectedLocation"
                  :classes="{
                    clearIcon: '',
                    container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer  outline-none py-3 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'max-h-60 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                  }"
                  :filter-results="true"
                  :searchable="true"
                  :options="locations"
              />
            </div>
          </div>

          <div class="flex w-full pt-2.5">
            <button @click="generate"
                    class="w-full px-4 py-3 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring">
              Generate Grafik
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Multiselect from '@vueform/multiselect'

export default {
  name: 'PanjangBerat',
  inject: ['insertGraphic'],
  components: {
    Loading,
    Multiselect
  },
  data() {
    return {
      tryingAt: 0,
      loading: false,
      canceled: false,
      insertingImage: false,
      selectedWpp: '',
      selectedYear: {year: 2020},
      selectedSpecies: [],
      selectedLocation: '',
      wpp: [
        '571',
        '572',
        '573',
        '711',
        '712',
        '713',
        '714',
        '715',
        '716',
        '717',
        '718',
      ],
      years: [
        2016,
        2017,
        2018,
        2019,
        2020,
        2021,
        2022,
      ],
      locations: [
        {value: 'Margasari', label: 'Margasari'},
        {value: 'Kuala Teladas', label: 'Kuala Teladas'},
        {value: 'Pasar Baru', label: 'Pasar Baru'},
        {value: 'PPI Ujong Baroh Aceh', label: 'PPI Ujong Baroh Aceh'},
        {value: 'PPI Pomako', label: 'PPI Pomako'},
      ],
      species: [
        {value: 'Layang', label: 'Layang'},
        {value: 'Kembung', label: 'Kembung'},
        {value: 'Rajungan', label: 'Rajungan'},
        {value: 'Lobster Batik', label: 'Lobster Batik'},
      ],
      graphicImageName: ''
    }
  },
  methods: {
    formToObject: function () {
      return {
        year: Number(this.selectedYear),
        wpp: Number(this.selectedWpp),
        species: this.selectedSpecies,
        location: this.selectedLocation
      }
    },
    reset: function () {
      this.selectedYear = '';
      this.selectedWpp = {name: '571'};
      this.selectedSpecies = '';
      this.selectedLocation = '';
    },
    generate: async function () {
      this.tryingAt++;
      const iteration = this.tryingAt;
      this.graphicImageName = '';
      this.loading = true;
      this.canceled = false;
      this.insertingImage = false;
      this.$store.commit('setSearchText', '');
      const body = this.formToObject();
      console.log(body);

      this.axios.post(`${this.$store.state.host}/execute-graphic/panjang_x_berat`, body)
          .then(({data}) => {
            const {status, graphicImageName} = data;
            if (iteration === this.tryingAt && !this.canceled) {
              if (status === 'SUCCESS') {
                this.graphicImageName = graphicImageName || '';
                this.insertingImage = true;

                // execute google script
                // this.insertGraphic(this.graphicImageName, () => {
                //   this.onInsertImage(true);
                // }, () => {
                //   this.onInsertImage(false);
                // });

                setTimeout(() => {
                  this.insertingImage = false;
                  this.loading = false;
                  this.$notify({
                    title: 'Grafik berhasil disisipkan!',
                    type: 'success'
                  });
                }, 3000);

              } else {
                this.generateFail();
              }
            }
          })
          .catch(() => {
            if (iteration === this.tryingAt) {
              this.generateFail();
            }
          });
    },
    onCancel: function () {
      this.loading = false;
      this.canceled = true;
      this.$notify({
        title: 'Dibatalkan oleh pengguna!',
        type: 'error'
      });
    },
    onInsertImage: function (success) {
      this.insertingImage = false;
      this.loading = false;
      this.$notify({
        title: 'Grafik berhasil disisipkan!',
        type: success ? 'success' : 'error'
      });
    },
    generateFail: function () {
      this.graphicImageName = '';
      this.loading = false;
      this.$notify({
        title: 'Grafik tidak berhasil digenerate.',
        type: 'error'
      });
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
