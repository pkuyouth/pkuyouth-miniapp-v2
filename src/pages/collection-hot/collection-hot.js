/**
 * Project: PKUYouth MiniApp v2
 * File: collection-hot.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');

Page({
  data: {
    page: 1,
    onGetHot: false,
    articlesList: [],
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.title),
    });
    this.get_hot();
  },
  get_hot() {
    if (this.data.onGetHot) return;
    this.setData({
      onGetHot: true,
    });
    wx.showNavigationBarLoading();
    requests.get('/get_col_hot', {
      utoken: wx.getStorageSync('utoken'),
      page: this.data.page,
    }).then((data) => {
      this.setData({
        articlesList: this.data.articlesList.concat(data.articles),
        page: this.data.page + 1,
        onGetHot: false,
      });
      wx.hideNavigationBarLoading();
    }).catch((data) => {
      this.setData({
        onSearch: false,
      });
      wx.hideNavigationBarLoading();
    });
  },
  onReachBottom() {
    this.get_hot();
  },
  tapBtn_1() {
    btnFuncs.feedback.call(this);
  },
  tapBtn_2() {
    btnFuncs.scrollToUpper.call(this);
  },
  handleTouchStart(event) {
    btnFuncs.handleTouchStart.call(this, event);
  },
  handleTouchEnd(event) {
    btnFuncs.handleTouchEnd.call(this, event);
  },
})
