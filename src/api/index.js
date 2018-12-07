import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8809';
axios.interceptors.response.use((res) => {
    return res.data;
})
export let getsliders = () => {
    return axios.get('/sliders')
}
export let getHotBook = () => {
    return axios.get('/hot')
}
export let getbooks = () => {
    return axios.get('/book')
}
export let removeBook = (id) => {
    return axios.delete(`/book?id=${id}`)
}
export let findOneBook = (id) => {
    return axios.get(`/book?id=${id}`)
}
/**
 * 
 * @param {编号} id 
 * @param {数据} data 
 */
export let updataBook = (id, data) => {
    return axios.put(`/book?id=${id}`, data)
}
export let addBook = (data) => {
    return axios.post('/book', data)
}