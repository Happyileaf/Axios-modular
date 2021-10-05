import axios from 'axios'
import qs from 'qs'

// create an axios instance with a custom config
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
  headers: {
    'X-Custom-Header': 'foobar'
  }, // The custom headers

  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data

    data = qs.stringify(data); // 使用工具qs来处理参数，处理发送请求的参数，序列化字符串
    return data;
  }],

  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
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

  console.log(error) // for debug
  return Promise.reject(error)
}

const responseHandler = response => {
  // Do something with response data

  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */

  const res = response.data

  // if the custom code is not Logically correct, it is judged as an error.
  if (res.code !== 200) {

    // if returning a value of Promise.reject(),it is judged as an error
    return Promise.reject(new Error(res.message || 'Error'))
  }

  // return anything you want, such as res above
  return response
}


const responseErrHandler = error => {
  // Do something with response error

  console.log(`error : ${error}`) // for debug
  return Promise.reject(error)
}


// Add a request interceptor
instance.interceptors.request.use(requestHandler, requestErrHandler)

// Add a response interceptor
instance.interceptors.response.use(responseHandler, responseErrHandler
)

export default instance