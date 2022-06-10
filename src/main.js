import {createApp} from 'vue';
import App from './App.vue';
import router from './utilities/router';
import store from './utilities/store';
import Notifications from '@kyvg/vue3-notification';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { SetupCalendar } from 'v-calendar';
import Maska from 'maska';
import properties from './utilities/global-properties';


const application = createApp(App);
application.config.globalProperties.$RED = properties;
application.config.globalProperties.$error = function (msg) {
    this.$notify({
        title: msg,
        type: 'error'
    })
};
application.config.globalProperties.$success = function (msg) {
    this.$notify({
        title: msg,
        type: 'success'
    })
};

application.use(router);
application.use(store);
application.use(Notifications);
application.use(VueAxios, axios);
application.use(SetupCalendar, {});
application.use(Maska);
// application.provide('insertGraphic', (graphicImageName, onSuccess, onFailure) => {
//     console.log('Running google.script.run.insertGraphic() script');
//     google.script.run
//         .withSuccessHandler(onSuccess)
//         .withFailureHandler(onFailure)
//         .insertGraphic(graphicImageName);
// });

// Register a global custom directive called `v-focus`
application.directive('focus', {
    mounted(el) {
        el.focus()
    }
})

application.mount('#app');
