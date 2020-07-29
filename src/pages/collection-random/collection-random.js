/**
 * Project: PKUYouth MiniApp v2
 * File: collection-random.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');
const cardFuncs = require('../../components/news-li/page-funcs.js');

Page({
  data: {
    onGetRandom: false,
    articlesList: [],
    touch: { start: { X: 0, Y: 0 }, end: { X: 0, Y: 0 } },
    moveAction: '',
  },
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: decodeURIComponent(options.title),
    });
    this.get_random();
  },
  get_random() {
    if (this.data.onGetRandom) return;
    this.setData({
      onGetRandom: true,
    });
    wx.showNavigationBarLoading();
    requests.get('/get_col_random', {
      utoken: wx.getStorageSync('utoken')
    }).then((data) => {
      let newArticles = cardFuncs.filterExisted.call(this, data.articles);
      this.setData({
        articlesList: this.data.articlesList.concat(newArticles),
        onGetRandom: false,
      });
      wx.hideNavigationBarLoading();
    }).catch((data) => {
      this.setData({
        onGetRandom: false,
      })
      wx.hideNavigationBarLoading();
    });
  },
  onReachBottom() {
    this.get_random();
  },
  tapBtn_1() {
    btnFuncs.feedback.call(this);
  },
  tapBtn_2() {
    btnFuncs.sortedByTime.call(this);
  },
  tapBtn_3() {
    btnFuncs.sortedByReadNum.call(this);
  },
  tapBtn_4() {
    btnFuncs.scrollToUpper.call(this);
  },
  handleTouchStart(event) {
    btnFuncs.handleTouchStart.call(this, event);
  },
  handleTouchEnd(event) {
    btnFuncs.handleTouchEnd.call(this, event);
  },
})