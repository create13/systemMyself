import axios from 'axios';
axios.defaults.withCredentials = true;
const qs = require('qs');
const baseUrl = 'http://192.168.0.20:4403';
// const baseUrl = 'http://106.14.201.155:4443';
const http = (url, inits, methodsWay) => {
  // const httpTest = /^^http/;
  const getUrl = url.substring(6);
  const realUrl = baseUrl + getUrl;
  // const realUrl = httpTest.test(url) ? url : baseUrl + getUrl;
  // console.log(realUrl);
  return new Promise(async (resolve, reject) => {
    axios({
      url: realUrl,
      data: inits,
      method: methodsWay
    }).then(res => {
      if (res.status === '200') {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
};
const get = (url, datas, gets) => {
  let paramsData = qs.stringify(datas);
  return http(url, paramsData, gets);
};
const post = (url, datas, posts) => {
  let paramsData = qs.stringify(datas);
  return http(url, paramsData, posts);
};
export default {
  get,
  post
};
