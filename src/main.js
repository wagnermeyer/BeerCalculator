import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    //METHOD: Convert float to price
    floatToPrice: function(val) {
      return val.toLocaleString('pt-br', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      });
    },
      //METHOD: Convert price to float
      priceToFloat: function(val) {
        return parseFloat(parseFloat(val.replace(".","").replace(",", ".")));
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
