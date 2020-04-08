import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import {
    messages
} from '_v/Layout/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import '@/assets/css/icon.css';
import '_v/Layout/common/directives';
import 'babel-polyfill';
// import axios from '_u/request'
// Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});

const i18n = new VueI18n({
    locale: 'zh',
    messages
});

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    if (to.path === '/login') {
        next();
    } else {
        const role = localStorage.getItem('my_username');
        if (role) {
            next();
        } else {
            next('/login')
        }
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');