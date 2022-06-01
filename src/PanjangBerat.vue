<template>
  <div class="relative h-full">
    <button v-if="loading" style="z-index: 10000"
            @click="onCancel"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 text-xs mb-6 font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 focus:ring">
      Batalkan ...
    </button>
    <loading v-model:active="loading"
             :color="'#ff2020'"
             :width="25"
             :height="25"
             :opacity="0.9"
             :is-full-page="true"/>
    <div class="max-w-screen-xl mx-auto">

      <div class="max-w-lg mx-auto">


        <div class="px-6 mt-6 mb-0 space-y-4 rounded-lg ">
          <p class="text-lg font-medium">Masukan parameter</p>

          <div>
            <label for="tahun" class="text-xs font-medium">Tahun</label>
            <div class="relative mt-1">
              <input
                  v-model="selectedYear"
                  type="text"
                  id="tahun"
                  class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm"
                  placeholder="Inputkan tahun"
              />
            </div>
          </div>

          <div>
            <label for="wpp" class="text-xs font-medium">WPP</label>
            <Listbox v-model="selectedWpp">
              <div class="relative mt-1">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-white py-3 px-4 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span class="block truncate text-xs">{{ selectedWpp.name }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
          </span>
                </ListboxButton>

                <transition enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-out"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                >
                  <ListboxOptions
                      class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="item in wpp"
                        :key="item.name"
                        :value="item"
                        as="template"
                    >
                      <li :class="[ active ? 'bg-blue-100 text-blue-900' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4', ]">
                        <span :class="[ selected ? 'font-medium text-blue-700' : 'font-normal', 'block truncate', ]">
                          {{ item.name }}
                        </span>
                        <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>

          <div>
            <label for="spesies" class="text-xs font-medium">Spesies</label>

            <div class="relative mt-1">
              <input
                  v-model="selectedSpecies"
                  type="text"
                  id="spesies"
                  class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm"
                  placeholder="Inputkan nama spesies"
              />
            </div>
          </div>

          <div>
            <label for="lokasi" class="text-xs font-medium">Lokasi Pendaratan</label>

            <div class="relative mt-1">
              <input
                  v-model="selectedLocation"
                  type="text"
                  id="lokasi"
                  class="w-full py-3 px-4 text-xs border-gray-200 rounded-lg shadow-sm"
                  placeholder="Inputkan lokasi pendaratan"
              />
            </div>
          </div>

          <button @click="generate"
                  class="w-full px-5 py-3 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring">
            Generate Grafik
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import {CheckIcon, SelectorIcon} from '@heroicons/vue/solid';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'PanjangBerat',
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    SelectorIcon,
    Loading
  },
  data() {
    return {
      tryingAt: 0,
      loading: false,
      canceled: false,
      selectedWpp: {name: '571'},
      selectedYear: '',
      selectedSpecies: '',
      selectedLocation: '',
      wpp: [
        {name: '571'},
        {name: '572'},
        {name: '573'},
        {name: '711'},
        {name: '712'},
        {name: '713'},
        {name: '714'},
        {name: '715'},
        {name: '716'},
        {name: '717'},
        {name: '718'},
      ]
    }
  },
  methods: {
    generate: async function () {
      // const iteration = this.tryingAt;
      this.loading = true;
      this.canceled = false;

      // if (iteration === this.tryingAt) {
      //
      // }
    },
    onCancel: function () {
      this.loading = false;
      this.canceled = true;
    }
  }
}
</script>

<style scoped>

</style>
