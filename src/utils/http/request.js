import axios from 'axios'
import qs from 'qs'
import resCodehandler from './resCodehandler'

// create an axios instance with a custom config
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    // "Content-Type": "application/json;charset=utf-8",
    // 'X-Custom-Header': 'foobar'
  }, // The custom headers

  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    console.log(headers)
    data = qs.stringify(data); // 使用工具qs来处理参数，处理发送请求的参数，序列化字符串
    return data;
  }],

  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    return data;
  }],
})

const requestHandler = config => {
  // do something before request is sent

  config.headers['token'] = `admin token`
  config.headers['appCode'] = `appCode` // The custom headers

  return config
}

const requestErrHandler = error => {
  // do something with request error

  console.log(`error : ${error}`) // for debug
  return Promise.reject(error)
}

const responseHandler = response => {
  // Do something with response data

  const res = response.data

  // if the custom code is not Logically correct, it is judged as an error.
  // 在这里可以对response进行业务上的逻辑判断，具体逻辑可以自定义。
  if (res.code && res.code !== 20000) {

    // 通过Promise.reject方法，返回值会被认为是error处理
    return Promise.reject(new Error(res.message || 'Error'))
  }

  // 可以自定义返回的数据，比如可以只返回res
  return response
}


const responseErrHandler = error => {
  // Do something with response error

  resCodehandler(error);

  console.log(`error : ${error}`) // for debug
  return Promise.reject(error)
}


// Add a request interceptor
service.interceptors.request.use(requestHandler, requestErrHandler)

// Add a response interceptor
service.interceptors.response.use(responseHandler, responseErrHandler
)

export default service