import {request} from "@/requests/request";

export function login(params) {
    return request(process.env.VUE_APP_DEFAULT_IP, process.env.VUE_APP_DEFAULT_TIMEOUT)({
        url: "/api/v1/login",  //接口路径
        method: "post",  //接口方法
        // params,   // 接口uri参数
        data: params      //接口请求体内容
    });
}

export function register(params) {
    return request(process.env.VUE_APP_DEFAULT_IP, process.env.VUE_APP_DEFAULT_TIMEOUT)({
        url: "/api/v1/register",  //接口路径
        method: "post",  //接口方法
        // params,   // 接口uri参数
        data: params      //接口请求体内容
    });
}


export function get_datasets() {
    return request(process.env.VUE_APP_DEFAULT_IP, process.env.VUE_APP_DEFAULT_TIMEOUT)({
        url: "/api/v1/datasets",
        method: "get",
    })
}

export function datasets_images(params) {
    return request(process.env.VUE_APP_DEFAULT_IP, process.env.VUE_APP_DEFAULT_TIMEOUT)({
        url: "/api/v1/datasetsImages",
        method: "get",
        params
    })
}

export function servers(params) {
    return request(process.env.VUE_APP_DEFAULT_IP, process.env.VUE_APP_DEFAULT_TIMEOUT)({
        url: "/api/v1/servers",
        method: "get",
        params
    })
}

export function identify(ip, timeout, params) {
    return request(ip, timeout)({
        url: "/api/v1/identify",
        method: "post",
        data: params
    })
}
