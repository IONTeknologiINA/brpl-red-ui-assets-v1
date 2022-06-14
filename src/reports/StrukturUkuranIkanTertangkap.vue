<template>
  <div ref="sectioncontainer"  class="flex-1 mt-20 pt-1 pb-5 mb-10  bg-gray-100 h-full">
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
      <input ref="toTop" autocomplete="off" class="h-0 -mt-10"/>
      <div class="max-w-lg mx-auto">

        <div class="pl-6 pr-4 mb-0 space-y-5 rounded-lg ">
          <div class="flex-col">
            <div class="flex flex-row text-gray-700 item-center justify-between pb-2">
              <div class="flex flex-row text-gray-700 item-center">
                <span class="text-base font-medium pl-1 pb-4 font-semibold text-sky-700">Parameter Pembuatan Grafik</span>
                <UilDocumentLayoutLeft size="1.25rem" class="text-sky-700 outline-none ml-3" />
              </div>
            </div>
            <label for="date-range" class="text-xs font-medium pl-1 text-gray-600">Rentang Tanggal</label>
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
                      :class="$style.form.input"
                      class="bg-white w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm outline-sky-400 focus-within:outline-sky-400"
                      :value="formatDateRange(inputValue)"
                      v-on="inputEvents.end"
                      @focus="onDateRangeOpened"
                  />
                </template>
              </DatePicker>
            </div>
          </div>

          <div>
            <label for="wpp" class="text-xs font-medium pl-1 text-gray-600">WPP</label>
            <div class="relative mt-1">
              <Multiselect
                  placeholder="Pilih wpp"
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  v-model="selectedWpp"
                  ref="wpp"
                  @click="wppFocused"
                  :mode="wppTagsMode ? 'tags' : 'multiple'"
                  :multipleLabel="allWppSelected"
                  :classes="$style.multiselect.component(wppFetched, wppTagsMode)"
                  @change="wppTagCreated($event)"
                  :create-option="false"
                  :close-on-select="false"
                  :groups="true"
                  :filter-results="true"
                  :searchable="true"
                  :resolve-on-load="false"
                  :clear-on-select="false"
                  :delay="wppFetched ? -1 : (shouldWppRetrieve ? 0 : -1)"
                  :options="getWpp"
              >
                <template v-slot:tag="{ option, handleTagRemove }">
                  <div v-tippy="$tagTooltip(option.label)" :class="$style.multiselect.tagWrapper">
                    <span :class="$style.multiselect.tagLabel">{{ $normalizeTag(option.label) }}</span>
                    <span :class="$style.multiselect.tagRemove" @mousedown.prevent="handleTagRemove(option, $event)">
                      <span :class="$style.multiselect.tagRemoveIcon"></span>
                    </span>
                  </div>
                </template>

                <!-- To show this slow, plase remove if parameter => "_ctx.hasSelected && !$props.disabled &&" on source code vue multiselect.js -->
                <template v-slot:clear>
                  <UilFileInfoAlt v-if="!wppTagsMode" v-tippy="tippyOnAllSelected(selectedWpp)" size="1.25rem" class="absolute right-3 text-gray-400 outline-none" />
                  <UilTrashAlt v-if="wppTagsMode && selectedWpp.length > 0"
                               @click="$refs.wpp.clear()"
                               v-tippy="{content: 'Bersihkan', placement: 'bottom'}"
                               size="1.1rem" class="absolute right-3.5 bottom-4 text-gray-400 outline-none" />
                </template>

              </Multiselect>
            </div>
          </div>

          <div>
            <label for="resource" class="text-xs font-medium pl-1 text-gray-600">Sumber Daya</label>
            <div class="relative mt-1">
              <Multiselect
                  placeholder="Pilih sumber daya"
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  v-model="selectedResource"
                  ref="resource"
                  @click="resourceFocused"

                  :mode="resourceTagsMode ? 'tags' : 'multiple'"
                  :multipleLabel="allResourceSelected"
                  :classes="$style.multiselect.component(resourceFetched, resourceTagsMode)"
                  @change="resourceTagCreated($event)"
                  :create-option="false"
                  :close-on-select="false"
                  :groups="true"
                  :filter-results="true"
                  :searchable="true"
                  :resolve-on-load="false"
                  :clear-on-select="false"
                  :delay="resourceFetched ? -1 : (shouldResourceRetrieve ? 0 : -1)"
                  :options="getResources"
              >
                <template v-slot:tag="{ option, handleTagRemove }">
                  <div v-tippy="$tagTooltip(option.label)" :class="$style.multiselect.tagWrapper">
                    <span :class="$style.multiselect.tagLabel">{{ $normalizeTag(option.label) }}</span>
                    <span :class="$style.multiselect.tagRemove" @mousedown.prevent="handleTagRemove(option, $event)">
                      <span :class="$style.multiselect.tagRemoveIcon"></span>
                    </span>
                  </div>
                </template>

                <!-- To show this slow, plase remove if parameter => "_ctx.hasSelected && !$props.disabled &&" on source code vue multiselect.js -->
                <template v-slot:clear>
                  <UilFileInfoAlt v-if="!resourceTagsMode" v-tippy="tippyOnAllSelected(selectedResource)" size="1.25rem" class="absolute right-3 text-gray-400 outline-none" />
                  <UilTrashAlt v-if="resourceTagsMode && selectedResource.length > 0"
                               @click="$refs.resource.clear()"
                               v-tippy="{content: 'Bersihkan', placement: 'bottom'}"
                               size="1.1rem" class="absolute right-3.5 bottom-4 text-gray-400 outline-none" />
                </template>
              </Multiselect>
            </div>
          </div>

          <div>
            <label for="location" class="text-xs font-medium pl-1 text-gray-600">Lokasi Pendaratan/Sampling</label>

            <div class="relative mt-1">
              <Multiselect
                  placeholder="Pilih lokasi"
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  v-model="selectedLocation"
                  ref="location"
                  @click="locationFocused"

                  :mode="locationTagsMode ? 'tags' : 'multiple'"
                  :multipleLabel="allLocationSelected"
                  :classes="$style.multiselect.component(locationFetched, locationTagsMode)"
                  @change="locationTagCreated($event)"
                  :create-option="false"
                  :close-on-select="false"
                  :groups="true"
                  :filter-results="true"
                  :searchable="true"
                  :resolve-on-load="false"
                  :clear-on-select="false"
                  :delay="locationFetched ? -1 : (shouldLocationRetrieve ? 0 : -1)"
                  :options="getLocations"
              >
                <template v-slot:tag="{ option, handleTagRemove }">
                  <div v-tippy="$tagTooltip(option.label)" :class="$style.multiselect.tagWrapper">
                    <span :class="$style.multiselect.tagLabel">{{ $normalizeTag(option.label) }}</span>
                    <span :class="$style.multiselect.tagRemove" @mousedown.prevent="handleTagRemove(option, $event)">
                      <span :class="$style.multiselect.tagRemoveIcon"></span>
                    </span>
                  </div>
                </template>

                <!-- To show this slow, plase remove if parameter => "_ctx.hasSelected && !$props.disabled &&" on source code vue multiselect.js -->
                <template v-slot:clear>
                  <UilFileInfoAlt v-if="!locationTagsMode" v-tippy="tippyOnAllSelected(selectedLocation)" size="1.25rem" class="absolute right-3 text-gray-400 outline-none" />
                  <UilTrashAlt v-if="locationTagsMode && selectedLocation.length > 0"
                               @click="$refs.location.clear()"
                               v-tippy="{content: 'Bersihkan', placement: 'bottom'}"
                               size="1.1rem" class="absolute right-3.5 bottom-4 text-gray-400 outline-none" />
                </template>
              </Multiselect>
            </div>
          </div>

          <div>
            <label for="spesies" class="text-xs font-medium pl-1 text-gray-600">Spesies</label>
            <div class="relative mt-1">
              <Multiselect
                  placeholder="Pilih spesies"
                  no-results-text="Tidak ditemukan"
                  no-options-text="Data kosong"
                  v-model="selectedSpecies"
                  ref="species"
                  @click="speciesFocused"
                  :mode="speciesTagsMode ? 'tags' : 'multiple'"
                  :multipleLabel="allSpeciesSelected"
                  :classes="$style.multiselect.component(speciesFetched, speciesTagsMode)"
                  @change="speciesTagCreated($event)"
                  :create-option="false"
                  :close-on-select="false"
                  :groups="true"
                  :filter-results="true"
                  :searchable="true"
                  :resolve-on-load="false"
                  :clear-on-select="false"
                  :delay="speciesFetched ? -1 : (shouldSpeciesRetrieve ? 0 : -1)"
                  :options="getSpecies"
              >
                <template v-slot:tag="{ option, handleTagRemove }">
                  <div v-tippy="$tagTooltip(option.label)" :class="$style.multiselect.tagWrapper">
                    <span :class="$style.multiselect.tagLabel">{{ $normalizeTag(option.label) }}</span>
                    <span :class="$style.multiselect.tagRemove" @mousedown.prevent="handleTagRemove(option, $event)">
                      <span :class="$style.multiselect.tagRemoveIcon"></span>
                    </span>
                  </div>
                </template>

                <!-- To show this slow, plase remove if parameter => "_ctx.hasSelected && !$props.disabled &&" on source code vue multiselect.js -->
                <template v-slot:clear>
                  <UilFileInfoAlt v-if="!speciesTagsMode" v-tippy="tippyOnAllSelected(selectedSpecies)" size="1.25rem" class="absolute right-3 text-gray-400 outline-none" />
                  <UilTrashAlt v-if="speciesTagsMode && selectedSpecies.length > 0"
                               @click="$refs.species.clear()"
                               v-tippy="{content: 'Bersihkan', placement: 'bottom'}"
                               size="1.1rem" class="absolute right-3.5 bottom-4 text-gray-400 outline-none" />
                </template>
              </Multiselect>
            </div>
          </div>

          <div class="flex space-x-3">
            <div>
              <label for="min-length" class="text-xs font-medium text-gray-600">Panjang Minimal</label>
              <div class="relative mt-1">
                <input
                    v-model="selectedMinLength"
                    type="text"
                    autocomplete="off"
                    id="min-length"
                    v-maska="lengthMask"
                    :class="$style.form.input"
                    class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm outline-sky-400"
                    placeholder="Minimal"
                />
              </div>
            </div>

            <div>
              <label for="max-length" class="text-xs font-medium text-gray-600">Panjang Maksimal</label>
              <div class="relative mt-1">
                <input
                    v-model="selectedMaxLength"
                    type="text"
                    autocomplete="off"
                    id="max-length"
                    v-maska="lengthMask"
                    :class="$style.form.input"
                    class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm outline-sky-400"
                    placeholder="Maksimal"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col w-full pt-2 ">
            <div :class="graphicImageName ? 'flex w-full pt-2.5 space-x-3' : 'flex w-full pt-2.5 space-x-3 mb-20'">
              <button @click="generate"
                      class="w-full flex flex-row px-4 py-2.5 text-left text-xs font-medium text-white
                      items-center bg-sky-600  rounded-lg hover:bg-sky-700 border-2 border-solid focus:border-sky-400">
                <UilChartLine size="1.25rem" class="text-gray-200 " />
                <span class="text-gray-200 ml-2">Hasilkan Grafik</span>
              </button>

              <button @click="resetAll"
                      v-tippy="{ content: 'Atur Ulang', placeholder: 'bottom'}"
                      class="hover:text-gray-100 flex flex-col items-center w-12 py-2.5 py-3 text-xs font-medium text-white bg-gray-200 rounded-lg hover:bg-gray-300
                      border-gray-300 border-2 border-solid focus:border-sky-400">
                <UilFileRedoAlt size="1.25rem" class="text-gray-400 " />
              </button>
            </div>

            <button @click="insertImage" v-if="graphicImageName"
                    class="text-left mb-20 mt-3.5 w-full border-dashed border-2 border-gray-200 px-4 py-2.5 text-xs font-medium
                    focus:border-solid focus:border-sky-500 flex flex-row items-center
                    bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 ">
              <UilPicture size="1.25rem" class="text-gray-400 " />
              <span class="text-gray-500 ml-2">Sisipkan Ulang Gambar</span>
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
import {normalizeNumber, lengthMasker, weightMasker} from '@/utilities/utils';
import { UilFileRedoAlt, UilFileInfoAlt, UilChartLine, UilDocumentLayoutLeft, UilPicture, UilTrashAlt } from '@iconscout/vue-unicons';

export default {
  name: 'StrukturIkanTertangkap',
  inject: ['insertGraphicImage'],
  components: {
    Loading,
    Multiselect,
    DatePicker,
    UilFileRedoAlt,
    UilFileInfoAlt,
    UilChartLine,
    UilDocumentLayoutLeft,
    UilPicture,
    UilTrashAlt
  },
  directives: {
  },
  mounted() {
    this.scrollToTop();
  },
  data() {
    return {
      graphicImageName: '',
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

      selectedWpp: [],
      // shouldWppRetrieve: false,
      shouldWppRetrieve: true,
      wppFetched: false,
      wppTotal: 0,
      wppTagsMode: true,

      selectedResource: [],
      shouldResourceRetrieve: false,
      resourceFetched: false,
      resourceTotal: 0,
      resourceTagsMode: true,

      selectedLocation: [],
      shouldLocationRetrieve: false,
      locationFetched: false,
      locationTotal: 0,
      locationTagsMode: true,

      selectedSpecies: [],
      shouldSpeciesRetrieve: false,
      speciesFetched: false,
      speciesTotal: 0,
      speciesTagsMode: true,

      selectedMinLength: '',
      selectedMaxLength: ''
    }
  },
  methods: {
    formatDateRange: function (value) {
      return value.start && value.start ? `${value.start} - ${value.end}` : '';
    },
    resetRangeDate: function () {
      // return {start: new Date('2019-01-01'), end: new Date('2019-12-31')};
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
    scrollToTop() {
      this.$refs.toTop.focus();
    },
    resetAll: function () {
      this.graphicImageName = '';
      this.selectedDateRange = ref(this.resetRangeDate());
      this.resetWpp();
      this.selectedMinLength = '';
      this.selectedMaxLength = '';
      this.scrollToTop();
    },

    wppValue() {
      const source = toRaw(this.selectedWpp);
      return source.length > 0 && source.length === this.wppTotal ? [ this.$RED.API_FOR_ALL_SELECTED ] : source;
    },
    allWppSelected: function () {
      return `${this.$RED.ALL_WPP}&nbsp;&nbsp;(${this.wppTotal})`;
    },
    wppTagCreated: function (list) {
      this.wppTagsMode = !(this.wppTotal > 1 && list.length === this.wppTotal);
      this.onWppChanged();
    },
    resetWpp: function () {
      this.shouldWppRetrieve = true;
      this.wppFetched = false;
      if (toRaw(this.selectedWpp).length > 0) {
        this.$refs.wpp.clear();
        this.$refs.wpp.clearSearch();
      }

      this.wppTotal = 0;
      this.resetResource();
    },
    wppFocused: function () {
      if (!this.wppFetched && this.shouldWppRetrieve) {
        this.$refs.wpp.refreshOptions();
      }
    },
    getWpp: async function () {
      const {data} = await this.axios.post(`${this.$RED.HOST}/${this.$RED.STRUKTUR_UKURAN_IKAN_TERTANGKAP}/wpp`, this.formForAsync());
      this.wppTotal = data && data.length > 0 ? data[0]['options'].length : 0;
      this.wppFetched = true;
      return data;
    },
    onWppChanged: function () {
      this.resetResource();
    },


    resourceValue() {
      const source = toRaw(this.selectedResource);
      return source.length > 0 && source.length === this.resourceTotal ? [ this.$RED.API_FOR_ALL_SELECTED ] : source;
    },
    allResourceSelected: function () {
      return `${this.$RED.ALL_RESOURCE}&nbsp;&nbsp;(${this.resourceTotal})`;
    },
    resourceTagCreated: function (list) {
      this.resourceTagsMode = !(this.resourceTotal > 1 && list.length === this.resourceTotal);
      this.onResourceChanged();
    },
    resetResource: function () {
      this.shouldResourceRetrieve = true;
      this.resourceFetched = false;
      if (toRaw(this.selectedResource).length > 0) {
        this.$refs.resource.clear();
      }

      this.resourceTotal = 0;
      this.resetLocation();
    },
    resourceFocused: function () {
      if (!this.resourceFetched && this.shouldResourceRetrieve) {
        this.$refs.resource.refreshOptions();
      }
    },
    getResources: async function () {
      const {data} = await this.axios.post(`${this.$RED.HOST}/${this.$RED.STRUKTUR_UKURAN_IKAN_TERTANGKAP}/resources`, this.formForAsync());
      this.resourceTotal = data.length > 0 ? data[0]['options'].length : 0;
      this.resourceFetched = true;
      return data;
    },
    onResourceChanged: function () {
      this.resetLocation();
    },

    locationValue() {
      const source = toRaw(this.selectedLocation);
      return source.length > 0 && source.length === this.locationTotal ? [ this.$RED.API_FOR_ALL_SELECTED ] : source;
    },
    allLocationSelected: function () {
      return `${this.$RED.ALL_LOCATION}&nbsp;&nbsp;(${this.locationTotal})`;
    },
    locationTagCreated: function (list) {
      this.locationTagsMode = !(this.locationTotal > 1 && list.length === this.locationTotal);
      this.onLocationChanged();
    },
    resetLocation: function () {
      this.shouldLocationRetrieve = true;
      this.locationFetched = false;
      if (toRaw(this.selectedLocation).length > 0) {
        this.$refs.location.clear();
      }

      this.locationTotal = 0;
      this.resetSpecies();
    },
    locationFocused: function () {
      if (!this.locationFetched && this.shouldLocationRetrieve) {
        this.$refs.location.refreshOptions();
      }
    },
    getLocations: async function () {
      const {data} = await this.axios.post(`${this.$RED.HOST}/${this.$RED.STRUKTUR_UKURAN_IKAN_TERTANGKAP}/locations`, this.formForAsync());
      this.locationTotal = data.length > 0 ? data[0]['options'].length : 0;
      this.locationFetched = true;
      return data;
    },
    onLocationChanged: function () {
      this.resetSpecies();
    },


    speciesValue() {
      const source = toRaw(this.selectedSpecies);
      return source.length > 0 && source.length === this.speciesTotal ? [ this.$RED.API_FOR_ALL_SELECTED ] : source;
    },
    allSpeciesSelected: function () {
      return `${this.$RED.ALL_SPECIES}&nbsp;&nbsp;(${this.speciesTotal})`;
    },
    speciesTagCreated: function (list) {
      this.speciesTagsMode = !(this.speciesTotal > 1 && list.length === this.speciesTotal);
    },
    resetSpecies: function () {
      this.shouldSpeciesRetrieve = true;
      this.speciesFetched = false;
      if (toRaw(this.selectedSpecies).length > 0) {
        this.$refs.species.clear();
      }

      this.speciesTotal = 0;
    },
    speciesFocused: function () {
      if (!this.speciesFetched && this.shouldSpeciesRetrieve) {
        this.$refs.species.refreshOptions();
      }
    },
    getSpecies: async function () {
      const {data} = await this.axios.post(`${this.$RED.HOST}/${this.$RED.STRUKTUR_UKURAN_IKAN_TERTANGKAP}/species`, this.formForAsync());
      this.speciesTotal = data.length > 0 ? data[0]['options'].length : 0;
      this.speciesFetched = true;
      return data;
    },


    tippyOnAllSelected: function (proxy) {
      const list = toRaw(proxy);
      const content =  list.reduce((acc, value, index) => {
        return `${acc} ${value}${index < list.length - 1 ? ' <br>' : ''}`
      }, '');
      return {
        content,
        placement: 'left'
      }
    },
    formForAsync: function () {
      const {start, end, wpp, resource, location, species} = this.form();
      return {
        start, end,
        wpp: wpp.length === 0 ? this.$RED.API_FOR_ZERO_SELECTED : wpp,
        resource: resource.length === 0 ? this.$RED.API_FOR_ZERO_SELECTED : resource,
        location: location.length === 0 ? this.$RED.API_FOR_ZERO_SELECTED : location,
        species: resource.length === 0 ? this.$RED.API_FOR_ZERO_SELECTED : species,
      };
    },
    form: function () {
      const {start, end} = this.selectedDateRange ? toRaw(this.selectedDateRange) : this.resetRangeDate();
      return {
        start, end,
        wpp: this.wppValue(),
        resource: this.resourceValue(),
        location: this.locationValue(),
        species: this.speciesValue(),
        minLength: normalizeNumber(this.selectedMinLength),
        maxLength: normalizeNumber(this.selectedMaxLength) || 1000000
      }
    },
    pass: function (body) {
      const { start, end, wpp, resource, location, species } = body;
      if (start === null || end === null) {
        return 'Inputkan Rentang tanggal';
      } else if (!wpp || wpp.length <= 0) {
        this.wppFocused();
        this.$refs.wpp.$el.focus();
        return 'Inputkan WPP';
      } else if (!resource || resource.length <= 0) {
        this.resourceFocused();
        this.$refs.resource.$el.focus();
        return 'Inputkan Sumber Daya';
      } else if (!location || location.length <= 0) {
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

    insertImage: function (reinsert = false) {
      if (reinsert) {
        this.insertingImage = true;
        this.loading = true;
      }
      // execute google script
      this.insertGraphicImage(this.graphicImageName, () => {
        this.successfullyInsertedImage();
      }, () => {
        this.failedToInsertImage();
      });
    },
    successfullyGenerated({status, graphicImageName}, currentIteration) {
      if (currentIteration === this.tryingAt && !this.canceled) {
        if (status === 'SUCCESS') {
          this.graphicImageName = graphicImageName || '';
          this.insertingImage = true;
          this.insertImage();
        } else {
          this.failedToGenerate();
        }
      }
    },
    generate: async function () {
      const body = this.form();
      // console.log(body);
      const notPass = this.pass(body);
      if (notPass) {
        this.$error(notPass);
        return;
      }

      this.tryingAt++;
      const currentIteration = this.tryingAt;
      this.graphicImageName = '';
      this.loading = true;
      this.canceled = false;
      this.insertingImage = false;
      this.$store.commit('setSearchText', '');
      this.$store.commit('setLoading', true);

      // setTimeout(() => {
      //   if (currentIteration === this.tryingAt && !this.canceled) {
      //     this.insertingImage = false;
      //     this.loading = false;
      //     this.$notify({
      //       title: 'Grafik berhasil disisipkan!',
      //       type: 'success'
      //     });
      //   }
      // }, 2000);

      this.axios.post(`${this.$RED.HOST}/${this.$RED.STRUKTUR_UKURAN_IKAN_TERTANGKAP}`, body)
          .then(({data}) => {
            this.successfullyGenerated(data, currentIteration);
          })
          .catch(() => {
            if (currentIteration === this.tryingAt) {
              this.failedToGenerate();
            }
          });
    },
    cancel: function () {
      this.loading = false;
      this.canceled = true;
      this.$store.commit('setLoading', false);
      this.$error('Dibatalkan oleh pengguna');
    },
    successfullyInsertedImage: function () {
      this.insertingImage = false;
      this.loading = false;
      this.$store.commit('setLoading', false);
      this.$success('Grafik berhasil disisipkan');
    },
    failedToInsertImage: function () {
      this.insertingImage = false;
      this.loading = false;
      this.$store.commit('setLoading', false);
      this.$error('Grafik gagal disisipkan');
    },
    failedToGenerate: function () {
      this.graphicImageName = '';
      this.loading = false;
      this.$store.commit('setLoading', false);
      this.$error('Grafik tidak berhasil digenerate.');
    },
  }
}
</script>

<style scoped>
* :deep(.tippy-box[data-theme~='red']) {
  font-size: 0.7rem;
  line-height: 1rem;
}

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
