/**
 * Project: PKUYouth MiniApp v2
 * File: column-news.js
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
    column: '',
    page: 1,
    articlesList: [],
    onGetColumnNews: false,
    entirelyGet: false,
    touch: { start: { X: 0, Y: 0 }, end: { X: 0, Y: 0 } },
    moveAction: '',
  },
  onLoad(options) {
    let column = decodeURIComponent(options.column);
    wx.setNavigationBarTitle({
      title: column,
    });
    this.setData({
      column: column,
      page: 1,
      onGetColumnNews: false,
      entirelyGet: false,
    });
    this.get_column_news();
  },
  onReachBottom() {
    if (this.data.entirelyGet || this.data.page === 0) { // page = 0 说明 entirelyGet
      this.setData({
        entirelyGet: true, // 触发提示
      });
    } else {
      this.get_column_news();
    }
  },
  get_column_news(get_all = false) {
    if (this.data.entirelyGet || this.data.page === 0 || this.onGetColumnNews) {
      return;
    }
    this.setData({
      onGetColumnNews: true,
    });
    wx.showNavigationBarLoading();
    requests.get('/get_column_articles', {
      utoken: wx.getStorageSync('utoken'),
      column: this.data.column,
      page: get_all ? 0 : this.data.page, // get_all 则 page = 0
    }).then((data) => {
      let newArticles = data.articles;
      if (get_all) {
        newArticles = cardFuncs.filterExisted.call(this, newArticles); // 去重
        this.setData({
          articlesList: this.data.articlesList.concat(newArticles),
          page: 0,
          onGetColumnNews: false,
        });
      } else {
        this.setData({
          articlesList: this.data.articlesList.concat(newArticles),
          page: this.data.page + 1,
          onGetColumnNews: false,
        });
        if (!data.articles.length) {
          this.setData({
            entirelyGet: true,
          });
        }
      }
      wx.hideNavigationBarLoading();
    }).catch((data) => {
      this.setData({
        onGetColumnNews: false,
      });
      wx.hideNavigationBarLoading();
    });
  },
  tapBtn_1() {
    btnFuncs.feedback.call(this);
  },
  tapBtn_2() { // 时间排序
    btnFuncs.sortedByTime.call(this);
  },
  tapBtn_3() { // 热度排序
    btnFuncs.sortedByReadNum.call(this);
  },
  tapBtn_4() {
    this.get_column_news(true);
  },
  tapBtn_5() {
    btnFuncs.scrollToUpper.call(this);
  },
  handleTouchStart(event) {
    btnFuncs.handleTouchStart.call(this, event);
  },
  handleTouchEnd(event) {
    btnFuncs.handleTouchEnd.call(this, event);
  },
})