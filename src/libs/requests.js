/**
 * Project: PKUYouth MiniApp v2
 * File: requests.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const API_URL = "https://pkuyouth.rabbitzxh.top/miniapp";

function requests(method = "GET") {
  return function (path, data = {}) {
    let url = API_URL + path;
    let header = (method === "POST") ? { 'Content-Type': 'application/json' } : {};
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        data: data,
        method: method,
        header: header,
        success: (resp) => {
          if (resp.statusCode !== 200) {
            // TODO: resp.statusCode === 401
            console.error(resp.statusCode);
            reject('XHR error');
          } else if (resp.data.errcode !== 0) {
            console.error('XHR error');
            console.log(resp.data);
            reject(resp.data);
          } else {
            resolve(resp.data);
          }
        },
        fail: (err) => {
          throw new Error(err);
        },
      });
    });
  }
}

module.exports = {
  get: requests("GET"),
  post: requests("POST"),
}
