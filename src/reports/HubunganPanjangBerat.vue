<template>
  <div class="flex-1 mt-20 pt-1 pb-5 mb-10  bg-gray-100 h-full">
    <button v-if="loading && !insertingImage" style="z-index: 10000"
            @click="cancel"
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
          <div class="flex-col">
            <div class="flex flex-row text-gray-700 item-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span class="text-base ml-2 font-medium pl-1 pb-4 ">Parameter Grafik</span>
            </div>
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
                      class="bg-white w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm focus:ring-2 outline-none"
                      :value="formatDateRange(inputValue)"
                      v-on="inputEvents.end"
                      @focus="onDateRangeOpened"
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
                    container: 'rounded-lg border-gray-200 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer  py-3 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'border-gray-300 shadow-sm max-h-60 min-h-60 z-40 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                    option: 'first:text-green-600 first:bg-gray-50 first:py-3 first:hover:bg-gray-100 flex items-center justify-start box-border text-left cursor-pointer text-xs leading-snug py-2 px-3',
                    optionPointed: 'text-gray-800 bg-gray-100',
                    optionSelected: 'text-gray-700 bg-gray-200',
                    optionSelectedPointed: 'text-gray-700 bg-gray-300',
                    caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
                    noOptions: 'py-2 px-3 text-red-500 bg-white text-left',
                    noResults: 'py-2 px-3 text-red-500 bg-white text-left',
                    search: 'rounded-lg w-full absolute inset-0 focus:ring-2 outline-none appearance-none box-border border-0 text-xs font-sans bg-white pl-3.5 rtl:pl-0 rtl:pr-3.5',
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
            <label for="resource" class="text-xs font-medium pl-1">Sumber Daya</label>
            <div class="relative mt-1">
              <Multiselect
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  placeholder="Pilih Sumber Daya"
                  v-model="selectedResource"
                  ref="resource"
                  @click="resourceFocused()"
                  @change="onResourceChanged($event)"
                  :classes="{
                    clearIcon: '',
                    container: 'rounded-lg border-gray-200 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer  py-3 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'border-gray-300 shadow-lg max-h-60 min-h-60 z-40 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded -mt-px overflow-y-scroll bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                    option: 'first:text-green-600 first:bg-gray-50 first:py-3 first:hover:bg-gray-100 flex items-center justify-start box-border text-left cursor-pointer text-xs leading-snug py-2 px-3',
                    optionPointed: 'text-gray-800 bg-gray-100',
                    optionSelected: 'text-gray-700 bg-gray-200',
                    optionSelectedPointed: 'text-gray-700 bg-gray-300',
                    caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
                    noOptions: 'py-2 px-3 text-red-500 bg-white text-left',
                    noResults: 'py-2 px-3 text-red-500 bg-white text-left',
                    search: 'rounded-lg w-full absolute inset-0 focus:ring-2 outline-none appearance-none box-border border-0 text-xs font-sans bg-white pl-3.5 rtl:pl-0 rtl:pr-3.5',
                  }"
                  :filter-results="true"
                  :searchable="true"
                  :resolve-on-load="false"
                  :clear-on-select="false"
                  :delay="resourceFetched ? -1 : (shouldResourceRetrieve ? 0 : -1)"
                  :options="getResources"
              />
            </div>
          </div>

          <div>
            <label for="location" class="text-xs font-medium pl-1">Lokasi Pendaratan/Sampling</label>

            <div class="relative mt-1">
              <Multiselect
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  placeholder="Pilih lokasi pendaratan/sampling"
                  v-model="selectedLocation"
                  ref="location"
                  @click="locationFocused()"
                  @change="onLocationChanged()"
                  :classes="{
                    clearIcon: '',
                    container: 'border-gray-200 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer  outline-none rounded-lg py-3 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'border-gray-300 shadow-lg max-h-60 min-h-60 z-40 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                    caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
                    noOptions: 'py-2 px-3 text-red-500 bg-white text-left',
                    noResults: 'py-2 px-3 text-red-500 bg-white text-left',
                    search: 'w-full absolute inset-0 focus:ring-2 outline-none appearance-none box-border border-0 text-xs font-sans bg-white rounded-lg pl-3.5 rtl:pl-0 rtl:pr-3.5',
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
                  placeholder="Pilih nama spesies"
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  v-model="selectedSpecies"
                  mode="tags"
                  ref="species"
                  @click="speciesFocused"
                  :classes="{
                    clearIcon: '',
                    container: 'border-1 hover:ring-2 relative mx-auto w-full flex items-center justify-end box-border cursor-pointer bg-white rounded-lg focus:outline-blue-400 py-2 pl-2 pr-0 text-xs shadow-sm',
                    dropdown: 'max-h-60 absolute -left-px -right-px -bottom-1 transform translate-y-full border rounded border-gray-200 -mt-px overflow-y-scroll z-40 bg-white flex flex-col rounded-b',
                    dropdownTop: '-translate-y-full top-px bottom-auto rounded-b-none rounded-t',
                    dropdownHidden: 'hidden',
                    caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform pointer-events-none rtl:mr-0 rtl:ml-3.5',
                    tagsSearch: 'absolute outline-none inset-0 border-1 -ml-1.5 focus:ring-0 appearance-none  text-xs box-border w-full',
                    noOptions: 'py-2 px-3 text-red-500 bg-white text-left',
                    noResults: 'py-2 px-3 text-red-500 bg-white text-left',
                    tagsSearchWrapper: 'inline-block relative mx-1 mb-1 flex-grow flex-shrink h-full outline-blue-400',
                    tagSearch: 'w-full absolute inset-0 outline-blue-400 appearance-none box-border border-0 text-xs font-sans bg-white rounded pl-3.5 rtl:pl-0 rtl:pr-3.5',
                  }"
                  :create-option="false"
                  :filter-results="true"
                  :searchable="true"
                  :resolve-on-load="false"
                  :clear-on-select="false"
                  :close-on-select="false"
                  :delay="speciesFetched ? -1 : (shouldSpeciesRetrieve ? 0 : -1)"
                  :options="getSpecies"
              />
            </div>
          </div>

          <div class="flex space-x-3">
            <div>
              <label for="min-length" class="text-xs font-medium">Panjang Minimal</label>
              <div class="relative mt-1">
                <input
                    v-model="selectedMinLength"
                    type="text"
                    autocomplete="off"
                    id="min-length"
                    v-maska="lengthMask"
                    class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm focus:ring-2 outline-none"
                    placeholder="Minimal"
                />
              </div>
            </div>

            <div>
              <label for="max-length" class="text-xs font-medium">Panjang Maksimal</label>
              <div class="relative mt-1">
                <input
                    v-model="selectedMaxLength"
                    type="text"
                    autocomplete="off"
                    id="max-length"
                    v-maska="lengthMask"
                    class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm focus:ring-2 outline-none"
                    placeholder="Maksimal"
                />
              </div>
            </div>
          </div>


          <div class="flex space-x-3">
            <div>
              <label for="min-weight" class="text-xs font-medium">Berat Minimal</label>
              <div class="relative mt-1">
                <input
                    v-model="selectedMinWeight"
                    type="text"
                    autocomplete="off"
                    id="min-weight"
                    v-maska="weightMask"
                    class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm focus:ring-2 outline-none"
                    placeholder="Minimal"
                />
              </div>
            </div>

            <div>
              <label for="max-weight" class="text-xs font-medium">Berat Maksimal</label>
              <div class="relative mt-1">
                <input
                    v-model="selectedMaxWeight"
                    type="text"
                    autocomplete="off"
                    id="max-weight"
                    v-maska="weightMask"
                    class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm focus:ring-2 outline-none"
                    placeholder="Maksimal"
                />
              </div>
            </div>
          </div>


          <div class="flex w-full pt-2.5 space-x-3">
            <button @click="generate"
                    class="w-full px-4 py-2.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring">
              Generate Grafik
            </button>

            <button @click="resetAll"
                    class="flex items-center w-12 py-2.5 py-3 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clip-rule="evenodd"/>
              </svg>
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
import {toRaw, ref} from 'vue';
import {DatePicker} from 'v-calendar';
import { normalizeNumber, lengthMasker, weightMasker } from '@/utilities/utils';

export default {
  name: 'HubunganPanjangBerat',
  // inject: ['insertGraphic'],
  components: {
    Loading,
    Multiselect,
    DatePicker
  },
  directives: {},
  data() {
    return {
      tryingAt: 0,
      loading: false,
      canceled: false,
      insertingImage: false,
      lengthMask: lengthMasker,
      weightMask: weightMasker,

      selectedDateRange: this.resetRangeDate(),
      dateRangeOpened: false,
      dateRangeDayClicked: 0,
      dateRangeMasks: {title: 'MMMM YYYY', input: 'DD MMMM YYYY'},
      dateRangeConfig: {type: 'string', mask: 'YYYY-MM-DD',},

      selectedWpp: '',
      shouldWppRetrieve: false,
      wppFetched: false,

      selectedResource: '',
      shouldResourceRetrieve: false,
      resourceFetched: false,

      selectedLocation: '',
      shouldLocationRetrieve: false,
      locationFetched: false,

      selectedSpecies: [],
      shouldSpeciesRetrieve: false,
      speciesFetched: false,

      selectedMinLength: '',
      selectedMaxLength: '',
      selectedMinWeight: '',
      selectedMaxWeight: '',
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
      }
    },
    resetAll: function () {
      this.selectedDateRange = ref(this.resetRangeDate());
      this.resetWpp();
      this.selectedMinLength = '';
      this.selectedMaxLength = '';
      this.selectedMinWeight = '';
      this.selectedMaxWeight = '';
    },

    resetWpp: function () {
      this.shouldWppRetrieve = true;
      this.wppFetched = false;
      this.selectedWpp = '';
      this.resetResource();
    },
    wppFocused: function () {
      if (!this.wppFetched && this.shouldWppRetrieve) {
        this.$refs.wpp.refreshOptions();
      }
    },
    getWpp: async function () {
      const {data} = await this.axios.post(`${this.$RED.HOST}/${this.$RED.HUBUNGAN_PANJANG_BERAT}/wpp`, toRaw(this.selectedDateRange));
      this.wppFetched = true;
      return data;
    },
    onWppChanged: function () {
      this.resetResource();
    },

    resetResource: function () {
      this.shouldResourceRetrieve = true;
      this.resourceFetched = false;
      this.selectedResource = '';
      this.resetLocation();
    },
    resourceFocused: function () {
      if (!this.resourceFetched && this.shouldResourceRetrieve) {
        this.$refs.resource.refreshOptions();
      }
    },
    getResources: async function () {
      const {data} = await this.axios.post(`${this.$RED.HOST}/${this.$RED.HUBUNGAN_PANJANG_BERAT}/resources`, {
        ...toRaw(this.selectedDateRange),
        wpp: this.selectedWpp
      });
      this.resourceFetched = true;
      return data;
    },
    onResourceChanged: function () {
      this.resetLocation();
    },

    resetLocation: function () {
      this.shouldLocationRetrieve = true;
      this.locationFetched = false;
      this.selectedLocation = '';
      this.resetSpecies();
    },
    locationFocused: function () {
      if (!this.locationFetched && this.shouldLocationRetrieve) {
        this.$refs.location.refreshOptions();
      }
    },
    getLocations: async function () {
      const {data} = await this.axios.post(`${this.$RED.HOST}/${this.$RED.HUBUNGAN_PANJANG_BERAT}/locations`, {
        ...toRaw(this.selectedDateRange),
        wpp: this.selectedWpp,
        resource: this.selectedResource
      });
      this.locationFetched = true;
      return data;
    },
    onLocationChanged: function () {
      this.resetSpecies();
    },


    resetSpecies: function () {
      this.shouldSpeciesRetrieve = true;
      this.speciesFetched = false;
      this.$refs.species.clear();
      this.$refs.species.clearSearch();
      // this.selectedSpecies = [];
    },
    speciesFocused: function () {
      if (!this.speciesFetched && this.shouldSpeciesRetrieve) {
        this.$refs.species.refreshOptions();
      }
    },
    getSpecies: async function () {
      const {data} = await this.axios.post(`${this.$RED.HOST}/${this.$RED.HUBUNGAN_PANJANG_BERAT}/species`, {
        ...toRaw(this.selectedDateRange),
        wpp: this.selectedWpp,
        resource: this.selectedResource,
        location: this.selectedLocation
      });
      this.speciesFetched = true;
      return data;
    },


    formToObject: function () {
      const {start, end} = this.selectedDateRange ? toRaw(this.selectedDateRange) : this.resetRangeDate();
      return {
        start, end,
        wpp: this.selectedWpp,
        resource: this.selectedResource,
        location: this.selectedLocation,
        species: toRaw(this.selectedSpecies),
        minLength: normalizeNumber(this.selectedMinLength),
        maxLength: normalizeNumber(this.selectedMaxLength) || 1000000,
        minWeight: normalizeNumber(this.selectedMinWeight),
        maxWeight: normalizeNumber(this.selectedMaxWeight) || 1000000
      }
    },
    pass: function (body) {
      const { start, end, wpp, resource, location, species } = body;
      if (start === null || end === null) {
        return 'Inputkan Rentang tanggal';
      } else if (!wpp) {
        this.wppFocused();
        this.$refs.wpp.$el.focus();
        return 'Inputkan WPP';
      } else if (!resource) {
        this.resourceFocused();
        this.$refs.resource.$el.focus();
        return 'Inputkan WPP';
      } else if (!location) {
        this.locationFocused();
        this.$refs.location.$el.focus();
        return 'Inputkan Lokasi';
      } else if (!species || species.length <= 0) {
        this.speciesFocused();
        this.$refs.species.$el.focus();
        return 'Inputkan Species';
      }

      return undefined;
    },

    failedToGenerate: function () {
      this.graphicImageName = '';
      this.loading = false;
      this.$error('Grafik tidak berhasil digenerate.');
    },
    generate: async function () {
      const body = this.formToObject();
      console.log(body);
      const notPass = this.pass(body);
      if (notPass) {
        this.$error(notPass);
        return;
      }

      this.tryingAt++;
      const iteration = this.tryingAt;
      this.graphicImageName = '';
      this.loading = true;
      this.canceled = false;
      this.insertingImage = false;
      this.$store.commit('setSearchText', '');

      // setTimeout(() => {
      //   if (iteration === this.tryingAt && !this.canceled) {
      //     this.insertingImage = false;
      //     this.loading = false;
      //     this.$notify({
      //       title: 'Grafik berhasil disisipkan!',
      //       type: 'success'
      //     });
      //   }
      // }, 2000);

      this.axios.post(`${this.$RED.HOST}/${this.$RED.HUBUNGAN_PANJANG_BERAT}`, body)
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
                  this.successfullyInsertedImage();
                }, 3000);

              } else {
                this.failedToGenerate();
              }
            }
          })
          .catch(() => {
            if (iteration === this.tryingAt) {
              this.failedToGenerate();
            }
          });
    },
    cancel: function () {
      this.loading = false;
      this.canceled = true;
      this.$error('Dibatalkan oleh pengguna');
    },
    successfullyInsertedImage: function () {
      this.insertingImage = false;
      this.loading = false;
      this.$success('Grafik berhasil disisipkan');
    },
    failedToInsertImage: function () {
      this.insertingImage = false;
      this.loading = false;
      this.$error('Grafik gagal disisipkan');
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
