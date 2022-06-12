<template>
  <div  class="w-full h-full bg-gray-100">
    <notifications position="bottom right"/>
    <header class="fixed w-full top-0 z-50 py-5 bg-sky-600 text-white text-center h-20">
      <div class="flex items-center justify-between flex-1 gap-8 h-full sm:justify-end px-5">

        <div v-if="$store.state.search" class="flex flex-row  w-full items-center">
          <input
              type="text"
              v-model="searchKey"
              v-focus
              autocomplete="off"
              v-on:keyup="typingSearch"
              id="nama-grafik"
              class="w-full pt-2.5 pb-3 px-4 text-xs text-gray-700 border-gray-200 rounded-lg ring-1 ring-sky-700 outline-none"
              placeholder="Inputkan nama grafik"
          />

          <UilMultiply  @click="cancelSearch"
                        size="1.1rem"
                        class="inset-y-0 inline-flex -ml-8 right-4 text-gray-400 outline-none cursor-pointer rounded-lg hover:text-red-400"
          />
        </div>

        <div v-if="!$store.state.search" class="flex flex-row items-center gap-1">
          <UilArrowLeft v-if="!$store.state.homepage"
                        @click="backHomepage"
                        size="2.4rem"
                        class="text-gray-200 outline-none cursor-pointer -ml-1.5 hover:bg-sky-700 rounded-lg"
          />
          <div v-if="!$store.state.search">
            <h4 v-if="$store.state.homepage" class="red-title text-lg font-medium">{{ $store.state.headerTitle }}</h4>
            <h4 v-if="!$store.state.homepage" class="ml-4 text-semibold object-cover red-title text-left text-base text-gray-200">{{ $store.state.headerTitle }}</h4>
          </div>
        </div>

        <div v-if="!$store.state.search" class="flex flex-row items-center gap-1">
          <UilFileSearchAlt v-if="!$store.state.search && $store.state.homepage"
                            @click="searchGraphic"
                        size="2.5rem"
                        class="absolute right-4 p-2 text-gray-200 outline-none cursor-pointer  hover:bg-sky-700 rounded-lg"
          />
<!--          <button v-if="!$store.state.homepage" @click="myMenu">-->
<!--            <svg id="eUKOTMbWute1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"-->
<!--                 viewBox="0 0 24 29" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="24"-->
<!--                 height="29">-->
<!--              <ellipse rx="2.901147" ry="2.9" transform="translate(17.165639 4.655885)" fill="#fff" stroke-width="0"/>-->
<!--              <ellipse rx="2.901147" ry="2.9" transform="translate(17.165639 14.5)" fill="#fff" stroke-width="0"/>-->
<!--              <ellipse rx="2.901147" ry="2.9" transform="translate(17.165639 24.34)" fill="#fff" stroke-width="0"/>-->
<!--            </svg>-->
<!--          </button>-->
        </div>

      </div>
    </header>
    <main  class="relative w-full h-full bg-grey-100 z-30">
      <div  class="max-h-screen overflow-y-auto w-full h-full bg-gray-100">
        <router-view/>
      </div>

    </main>
    <footer class="fixed bottom-0 z-30 w-full py-3 px-6 bg-gray-400 text-xs text-start text-white">
      <button @click="myMenu">Report Engine Developer ©2022</button>
    </footer>
  </div>
</template>

<script>
import { UilArrowLeft, UilFileSearchAlt, UilMultiply } from '@iconscout/vue-unicons';

export default {
  name: 'App',
  components: {
    UilArrowLeft,
    UilFileSearchAlt,
    UilMultiply
  },
  data() {
    return {
      searchKey: ''
    }
  },
  methods: {
    cancelSearch: function () {
      this.$store.commit('setSearch', false);
      this.searchKey = '';
      this.$store.commit('setSearchText', '');
    },
    searchGraphic: function () {
      this.$store.commit('setSearch', true);
    },
    backHomepage: function () {
      this.$store.commit('setHomepage', true);
      this.$store.commit('setHeaderTitle', 'Graphics Engine');
      this.$router.push('/userCodeAppPanel');
    },
    typingSearch: function () {
      this.$store.commit('setSearchText', this.searchKey);
    },
    myMenu: function () {
      console.log(this.$store.state.homepage);
    }
  }
}
</script>

<style>
@import '@vueform/multiselect/themes/default.css';
@import 'v-calendar/dist/style.css';
</style>
