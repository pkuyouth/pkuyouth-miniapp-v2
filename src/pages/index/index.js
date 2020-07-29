/**
 * Project: PKUYouth MiniApp v2
 * File: index.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');
const api = require('../../libs/api.js');

Page({
  data: {
    sliderArticles: [],
    colCardData: [],
  },
  onLoad(options) {
    api.login().then((res) => {
      api.getUserInfo().then((res) => { });
      this.init_page();
      this.init_page_test();
    });
  },
  init_page() {

    wx.showNavigationBarLoading();

    const get_latest_articles = requests.get('/get_latest_articles', {
      utoken: wx.getStorageSync('utoken')
    }).then((data) => {
      this.setData({
        sliderArticles: data.articles,
      });
    });

    const get_col_desc = requests.get('/get_col_desc', {
      utoken: wx.getStorageSync('utoken')
    }).then((data) => {
      this.setData({
        colCardData: data.col_desc,
      });
    });

    Promise.all([get_latest_articles, get_col_desc]).then(() => {
      wx.hideNavigationBarLoading();
    }).catch(() => {
      wx.hideNavigationBarLoading();
    });
  },
  init_page_test() {
    // wx.switchTab({
    //   url: '/pages/column-list/column-list',
    // });

    // wx.navigateTo({
    //   url: '/pages/blank/blank',
    // });

    // wx.navigateTo({
    //   url: '/pages/recruit/recruit',
    // })

    // wx.navigateTo({
    //   url: '/pages/search-keyword-result/search-keyword-result?keyword=' + '嫁给我',
    // });

    // wx.navigateTo({
    //   url: `/pages/search-reporter-result/search-reporter-result?name=${encodeURIComponent("杨春序")}`,
    // });
  },
  tapColCard(event) {
    let data = this.data.colCardData[event.currentTarget.dataset.id];
    if (data.path === '') {
      wx.showToast({
        title: "尚未开发，敬请期待~",
        icon: 'none',
        duration: 1000,
      });
    } else {
      wx.navigateTo({
        url: `${data.path}?title=${encodeURIComponent(data.title)}`,
      });
    }
  }
})

