import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:1337/graphql'
});

import VueApollo from 'vue-apollo';
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});


new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
