import axios from 'axios'
import 'babel-polyfill';
import router from '@/router/index';
import { successMessage, warningMessage, errorMessage } from '@/util/message.js';
const handleErrorResponse = (response, config) => {
    if (response) {
        switch (response.status) {
            case 401: // 未登录或过期，跳至登录页
                if (router.currentRoute.path !== '/login') { 
                    router.replace({ path: '/login', query: { redirect: router.currentRoute.fullPath } });
                }
                break;
            default:
                if(config && config.silent === true) break;
                if (response.data && response.data.success === false)
                    errorMessage(response.data.message);
                else
                    errorMessage('服务器发生 ' + response.status + ' 错误.');
                break;
        }
    } else if (!config || config.silent !== true) {
        errorMessage("服务器连接失败");
    }
};

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        handleErrorResponse(error.response, error.config);
        return Promise.reject(error) // 返回接口返回的错误信息
    });

export default axios;