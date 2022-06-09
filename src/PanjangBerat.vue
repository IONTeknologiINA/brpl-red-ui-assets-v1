<template>
  <div class="flex-1 mt-20 pt-1 pb-5 mb-10  bg-gray-100 h-full">
    <button v-if="loading && !insertingImage" style="z-index: 10000"
            @click="onCancel"
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 text-xs mb-12 font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 focus:ring">
      Batalkan
    </button>
    <span v-if="insertingImage"
          style="z-index: 10000"
          class="text-xs text-red-500 absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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


        <div class="pl-6 pr-4 mt-6 mb-0 space-y-5 rounded-lg ">
          <p class="text-lg font-medium pl-1">Masukan parameter</p>

          <div>
            <label for="date-range" class="text-xs font-medium pl-1">Rentang Tanggal</label>
            <div class="relative mt-1">
              <DatePicker v-model="selectedDateRange"
                          :popover="{ visibility: 'click' }"
                          :max-date="new Date()"
                          @dayclick="onDateRangeChanged"
                          :model-config="dateRangeConfig"
                          locale="id-ID"
                          :masks="dateRangeMasks" is-range>
                <template v-slot="{ inputValue, inputEvents }">
                  <input
                      placeholder="Masukan rentang tanggal"
                      class="bg-white w-full py-3 px-4 text-xs border-gray-200 rounded shadow-sm outline-white"
                      :value="formatDateRange(inputValue)"
                      v-on="inputEvents.end"
                      @click="onDateRangeOpened"
                  />
                </template>
              </DatePicker>
            </div>
          </div>

          <div>
            <label for="wpp" class="text-xs font-medium pl-1">WPP</label>
            <div class="relative mt-1">
              <Multiselect
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  placeholder="Pilih WPP"
                  v-model="selectedWpp"
                  ref="wpp"
                  @click="wppFocused()"
                  @change="onWppChanged($event)"
                  :classes="{
                    clearIcon: '',
                    container: 'border-gray-200 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer  outline-none py-3 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'max-h-60 min-h-60 z-40 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                    caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
                    noOptions: 'py-2 px-3 text-red-500 bg-white text-left',
                    noResults: 'py-2 px-3 text-red-500 bg-white text-left',
                  }"
                  :filter-results="true"
                  :searchable="true"
                  :resolve-on-load="false"
                  :clear-on-select="false"
                  :delay="wppFetched ? -1 : (shouldWppRetrieve ? 0 : -1)"
                  :options="getWpp"
              />
            </div>
          </div>

          <div>
            <label for="location" class="text-xs font-medium pl-1">Lokasi Pendaratan</label>

            <div class="relative mt-1">
              <Multiselect
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  placeholder="Pilih lokasi sampling"
                  v-model="selectedLocation"
                  ref="location"
                  @click="locationFocused()"
                  @change="onLocationChanged()"
                  :classes="{
                    clearIcon: '',
                    container: 'border-gray-200 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer  outline-none py-3 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'max-h-60 min-h-60 z-40 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                    caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
                    noOptions: 'py-2 px-3 text-red-500 bg-white text-left',
                    noResults: 'py-2 px-3 text-red-500 bg-white text-left',
                  }"
                  :filter-results="true"
                  :searchable="true"
                  :resolve-on-load="false"
                  :clear-on-select="false"
                  :delay="locationFetched ? -1 : (shouldLocationRetrieve ? 0 : -1)"
                  :options="getLocations"
              />
            </div>
          </div>

          <div>
            <label for="spesies" class="text-xs font-medium pl-1">Spesies</label>

            <div class="relative mt-1">
              <Multiselect
                  v-model="selectedSpecies"
                  mode="tags"
                  ref="species"
                  :classes="{
                    clearIcon: '',
                    container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer bg-white rounded  outline-none py-2 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'max-h-60 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                    caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
                    tagsSearch: 'absolute inset-0 border-0 outline-none -ml-1.5 focus:ring-0 appearance-none p-0 text-xs box-border w-full',
                    noOptions: 'py-2 px-3 text-red-500 bg-white text-left',
                    noResults: 'py-2 px-3 text-red-500 bg-white text-left',
                  }"
                  placeholder="Pilih nama spesies"
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  :close-on-select="false"
                  :searchable="true"
                  :create-option="false"
                  :clear-on-select="false"
                  :options="species"
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
import Multiselect from '@vueform/multiselect';
import {toRaw} from 'vue';
import {DatePicker} from 'v-calendar';

export default {
  name: 'PanjangBerat',
  // inject: ['insertGraphic'],
  components: {
    Loading,
    Multiselect,
    DatePicker
  },
  data() {
    return {
      tryingAt: 0,
      loading: false,
      canceled: false,
      insertingImage: false,

      selectedSpecies: [],

      selectedDateRange: this.resetRangeDate(),
      dateRangeOpened: false,
      dateRangeDayClicked: 0,
      dateRangeMasks: {title: 'MMMM YYYY', input: 'DD MMMM YYYY'},
      dateRangeConfig: {type: 'string', mask: 'YYYY-MM-DD',},

      selectedWpp: '',
      shouldWppRetrieve: false,
      wppFetched: false,

      selectedLocation: '',
      shouldLocationRetrieve: false,
      locationFetched: false,

      species: [
        {value: 'Layang', label: 'Layang'},
        {value: 'Kembung', label: 'Kembung'},
        {value: 'Rajungan', label: 'Rajungan'},
        {value: 'Lobster Batik', label: 'Lobster Batik'},
      ],

    }
  },
  methods: {
    formatDateRange: function (value) {
      return value.start && value.start ? `${value.start} - ${value.end}` : '';
    },
    resetRangeDate: function () {
      return {start: null, end: null};
    },
    onDateRangeOpened: function () {
      this.dateRangeOpened = true;
      this.dateRangeDayClicked = 0;
    },
    onDateRangeChanged: function () {
      this.dateRangeDayClicked++;
      if (this.dateRangeDayClicked % 2 === 0) {
        this.resetWpp();
        this.resetLocation();
      }
    },

    resetWpp: function () {
      this.shouldWppRetrieve = true;
      this.wppFetched = false;
      this.selectedWpp = '';
    },
    wppFocused: function () {
      if (!this.wppFetched && this.shouldWppRetrieve) {
        this.$refs.wpp.refreshOptions();
      }
    },
    getWpp: async function () {
      const {data} = await this.axios.post(`${this.$store.state.host}/cpue/wpp`, toRaw(this.selectedDateRange));
      this.wppFetched = true;
      return data;
    },
    onWppChanged: function () {
      this.resetLocation();
    },

    resetLocation: function () {
      this.shouldLocationRetrieve = true;
      this.locationFetched = false;
      this.selectedLocation = '';
    },
    locationFocused: function () {
      if (!this.locationFetched && this.shouldLocationRetrieve) {
        this.$refs.location.refreshOptions();
      }
    },
    getLocations: async function () {
      const {data} = await this.axios.post(`${this.$store.state.host}/cpue/locations`, {
        ...toRaw(this.selectedDateRange),
        wpp: this.selectedWpp
      });
      this.locationFetched = true;
      return data;
    },
    onLocationChanged: function () {
      console.log(this.selectedWpp)
    },


    formToObject: function () {
      return {
        year: Number(this.selectedYear),
        wpp: Number(this.selectedWpp),
        species: toRaw(this.selectedSpecies),
        location: this.selectedLocation,
        dateRange: toRaw(this.selectedDateRange)
      }
    },

    reset: function () {
      this.selectedYear = '';
      this.selectedWpp = {name: '571'};
      this.selectedSpecies = '';
      this.selectedLocation = '';
      this.selectedDateRange = {
        start: null,
        end: null
      };
    },
    generate: async function () {
      this.tryingAt++;
      // const iteration = this.tryingAt;
      this.graphicImageName = '';
      this.loading = true;
      this.canceled = false;
      this.insertingImage = false;
      this.$store.commit('setSearchText', '');
      this.selectedLocation = '';

      const body = this.formToObject();
      console.log(body);

      setTimeout(() => {
        this.insertingImage = false;
        this.loading = false;
        this.$notify({
          title: 'Grafik berhasil disisipkan!',
          type: 'success'
        });
      }, 2000);


      // this.axios.post(`${this.$store.state.host}/execute-graphic/panjang_x_berat`, body)
      //     .then(({data}) => {
      //       const {status, graphicImageName} = data;
      //       if (iteration === this.tryingAt && !this.canceled) {
      //         if (status === 'SUCCESS') {
      //           this.graphicImageName = graphicImageName || '';
      //           this.insertingImage = true;
      //
      //           // execute google script
      //           // this.insertGraphic(this.graphicImageName, () => {
      //           //   this.onInsertImage(true);
      //           // }, () => {
      //           //   this.onInsertImage(false);
      //           // });
      //
      //           setTimeout(() => {
      //             this.insertingImage = false;
      //             this.loading = false;
      //             this.$notify({
      //               title: 'Grafik berhasil disisipkan!',
      //               type: 'success'
      //             });
      //           }, 3000);
      //
      //         } else {
      //           this.generateFail();
      //         }
      //       }
      //     })
      //     .catch(() => {
      //       if (iteration === this.tryingAt) {
      //         this.generateFail();
      //       }
      //     });
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
        title: success ? 'Grafik berhasil disisipkan!' : 'Grafik gagal disisipkan',
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

<style scoped>
@import '@vueform/multiselect/themes/default.css';
@import 'v-calendar/dist/style.css';

:deep(.vc-pane) {
  padding: 4px 8px 0px 8px;

}

:deep(.vc-arrow) {
  margin: 8px 8px 0 8px;
}

:deep(.vc-header) {
  padding-top: 15px;
  padding-bottom: 9px;
}

:deep(.vc-title) {
  font-family: Arial, sans-serif;
}

:deep(.vc-weeks) {
  margin-top: 10px;
  /*z-index: 5000;*/
}

:deep(.vc-weekday) {
  font-family: Arial, sans-serif;
  font-size: 0.75rem;
  padding-bottom: 12px;
  color: #0d9488;
}

:deep(.vc-weekday:first-child) {
  color: #dc2626;
}

:deep(.vc-day-content) {
  font-family: Arial, sans-serif;
  font-size: 0.77rem;
  font-weight: 500;
}

:deep(.vc-nav-item) {
  font-family: Arial, sans-serif;
  font-size: 0.75rem;
}

:deep(.vc-nav-title) {
  font-family: Arial, sans-serif;
  font-size: 0.75rem;
}
</style>
<!--<style src="v-calendar/dist/style.css"></style>-->
