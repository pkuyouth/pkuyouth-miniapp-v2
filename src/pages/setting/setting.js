/**
 * Project: PKUYouth MiniApp v2
 * File: setting.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');
const app = getApp();

Page({

  data: app.globalData.setting,

  changeSetting(event) {
    this.setData({
      [event.target.dataset.option]: event.detail.value,
    });
    app.globalData.setting[event.target.dataset.option] = event.detail.value;
    requests.post('/change_setting', {
      utoken: wx.getStorageSync('utoken'),
      key: event.target.dataset.option,
      value: event.detail.value,
    }).then((data) => {
      // 这里本地设置优于服务器设置，即使这个接口出错，用户仍然可以在当次体验中修改设置
    });
  },
})
