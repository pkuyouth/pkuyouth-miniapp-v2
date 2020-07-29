/**
 * Project: PKUYouth MiniApp v2
 * File: web-frame.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

Page({
  data: {
    url: "",
    title: "",
    cover: "",
    type: "",
    options: {},
  },
  onLoad(options) {
    this.setData({
      options: options,
      url: decodeURIComponent(options.url),
      title: decodeURIComponent(options.title),
      cover: decodeURIComponent(options.cover),
      type: options.type,
    });
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.title,
    });
  },
  onShareAppMessage(options) {
    return {
      title: this.data.title,
      path: `/pages/web-frame/web-frame?url=${this.options.url}&title=${this.options.title}&cover=${this.options.cover}&type=${this.options.type}`,
      imageUrl: this.data.cover,
    }
  }
})
