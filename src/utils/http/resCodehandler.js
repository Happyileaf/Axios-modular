import { Message } from "element-plus";
import router from '../../router'

const CODE_MESSAGE = {
    200: '服务器成功返回请求数据',
    201: '新建或修改数据成功',
    202: '一个请求已经进入后台排队(异步任务)',
    204: '删除数据成功',
    400: '发出信息有误',
    401: '用户没有权限(令牌、用户名、密码错误)',
    403: '用户得到授权，但是访问是被禁止的',
    404: '访问资源不存在',
    406: '请求格式不可得',
    410: '请求资源被永久删除，且不会被看到',
    500: '服务器发生错误',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
};

// 提示语可以传入也可以匹配默认值
const info = function (status, MESSAGE = CODE_MESSAGE[`${status}`]) {
    return Message({
        showClose: true,
        message: `${MESSAGE}`,
        type: "error",
        duration: "5000"
    });
}

const resCodehandler = function (res) {
    switch (res.status) {
        case 400: {
            info(res.status)
            break
        }
        case 401: {
            //对于相同的HTTP状态码，如果业务还需要细分，可以再添加一个属性来区分
            if ([118000014, 118000015, 118000016].includes(res.code)) {
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
            }
            break;
        }

        // 403 比如token过期                          
        case 403: {
            info(res.status)

            localStorage.removeItem('token');
            router.replace({
                path: '/login',
                query: {
                    redirect: router.currentRoute.fullPath
                }
            });
            break
        }
        case 404: {
            info(res.status)

            // 也可以自定义页面
            // router.push({
            //     path: "/error/404"
            // });
            break
        }
        case 406: {
            info(res.status)
            break
        }
        case 500: {
            info(res.status)
            break
        }
        case 502: {
            info(res.status)
            break
        }
        case 503: {
            info(res.status)
            break
        }
        case 504: {
            info(res.status)
            break
        }
        default:{
            info(res.status,'未知错误')
            break
        }
    }
}

export {
    resCodehandler
}