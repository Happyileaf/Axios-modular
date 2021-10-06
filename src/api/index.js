import request from "../utils/http";

export const init_get = data => {
    return request({
        url: `http://localhost:3000/posts/${data}`,
        method: "get",
    })
}

export const init_post = data => {
    return request({
        url: "http://localhost:3000/posts",
        method: "post",
        data: {
            title: "今天天气不错, 还挺风和日丽的",
            author: "Alice"
        }||data
    })
}