<template>
  <div class="flex flex-col h-screen bg-gray-100">
    <header class="py-5 bg-blue-600 text-white text-center">
      <div class="flex items-center justify-between flex-1 gap-8 sm:justify-end px-5">

        <div v-if="$store.state.search" class="relative mt-1 w-full">
          <input
              type="text"
              id="nama-grafik"
              class="w-full py-3 px-4 text-xs text-gray-700 border-gray-200 rounded-lg shadow-sm focus:outline-blue-500"
              placeholder="Inputkan nama grafik"
          />

          <button @click="cancelSearch" class="absolute inset-y-0 inline-flex items-center right-4">
            <svg id="er5HkRPEcht1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 20 20" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="20"
                 height="20">
              <rect width="21.699571" height="2" rx="1" ry="1"
                    transform="matrix(-.63323 0.63323-.707107-.707107 17.577513 3.750088)" fill="#909090"
                    stroke-width="0"/>
              <rect width="21.699571" height="2" rx="1" ry="1"
                    transform="matrix(.63323 0.63323-.707107 0.707107 3.8367 2.335875)" fill="#909090"
                    stroke-width="0"/>
            </svg>
          </button>
        </div>

        <div v-if="!$store.state.search" class="flex flex-row items-center gap-6">
          <button
              v-if="!$store.state.homepage"
              @click="backHomepage"
              class="block sm:hidden p-2.5 text-gray-600 bg-white rounded-lg hover:bg-gray-200 shrink-0 shadow-sm">
            <svg id="ejTlVZeJm9s1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 20 20" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="20"
                 height="20">
              <rect width="21.699571" height="2" rx="1" ry="1" transform="matrix(.895522 0 0 1 0.41202 9)" fill="#777"
                    stroke-width="0"/>
              <rect width="20.516043" height="2" rx="1" ry="1"
                    transform="matrix(-.468049 0.468049-.707107-.707107 11.430134 1.414213)" fill="#777"
                    stroke-width="0" stroke-linecap="round"/>
              <rect width="21.699571" height="2" rx="1" ry="1"
                    transform="matrix(.442649 0.442649-.707107 0.707107 1.827624 8.980497)" fill="#777"
                    stroke-width="0"/>
            </svg>
          </button>

          <div v-if="!$store.state.search">
            <h4 v-if="$store.state.homepage" class="red-title text-lg font-medium">{{ $store.state.headerTitle }}</h4>
            <h4 v-if="!$store.state.homepage" class="red-title text-base">{{ $store.state.headerTitle }}</h4>
          </div>
        </div>

        <div v-if="!$store.state.search" class="flex flex-row items-center gap-1">
          <button
              v-if="!$store.state.search && $store.state.homepage"
              @click="searchGraphic"
              class="block sm:hidden p-2.5 text-gray-600 bg-white rounded-lg hover:bg-gray-200 shrink-0 shadow-sm"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <button v-if="!$store.state.homepage" @click="myMenu">
            <svg id="eUKOTMbWute1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 viewBox="0 0 24 29" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="24"
                 height="29">
              <ellipse rx="2.901147" ry="2.9" transform="translate(17.165639 4.655885)" fill="#fff" stroke-width="0"/>
              <ellipse rx="2.901147" ry="2.9" transform="translate(17.165639 14.5)" fill="#fff" stroke-width="0"/>
              <ellipse rx="2.901147" ry="2.9" transform="translate(17.165639 24.34)" fill="#fff" stroke-width="0"/>
            </svg>
          </button>
        </div>

      </div>
    </header>
    <main class="fit-height">
      <router-view/>
    </main>
    <footer class="py-3 px-6 bg-gray-600 text-xs text-start text-white">
      Report Engine Developer ©2022
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  methods: {
    cancelSearch: function () {
      this.$store.commit('setSearch', false);
    },
    searchGraphic: function () {
      this.$store.commit('setSearch', true);
    },
    backHomepage: function () {
      this.$store.commit('setHomepage', true);
      this.$store.commit('setHeaderTitle', 'Graphic Engine');
      this.$router.push('/');
    },
    myMenu: function () {
      console.log(this.$store.state.homepage);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
