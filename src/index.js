import Vue from 'vue';
import App from './app';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import './styles/index.scss';
import './styles/iconfont/index.scss';

Vue.use(iView);

new Vue({
  render(h) {
    return h(App);
  }
}).$mount('#app')