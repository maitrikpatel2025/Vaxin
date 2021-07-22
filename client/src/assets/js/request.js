import axios from 'axios';

axios.defaults.withCredentials = true

export const GET = (url, headers) => {
    return axios.get(url, {
        headers: headers
    });
}

export const POST = (url, data, config = {}) => {
    if (!url) return null;
    let nodeUrl = process.env.REACT_APP_SERVER_URL;

    if (typeof window !== "undefined" && window.location.href.indexOf('://192.168.') > 0) {
        nodeUrl = window.location.protocol + "//" + window.location.hostname + ":3001/";
    }

    let headers = {
        'Content-Type': 'application/json',
        'credentials': 'include',
    };
    if (config.headers){
        headers = {
            ...headers,
            ...config.headers,
        }
    }
    config = {
        ...config,
        headers,
        withCredentials: true,
    }
    return axios.post(nodeUrl + '/' + url, data, config).then(response => {
        let data = response['data'];
        if (data.code) {
            data.isSuccess = data.code === 200;
            data.isError = data.code === 400;
        }
        return data;
    });
}