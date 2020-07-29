/**
 * Project: PKUYouth MiniApp v2
 * File: reporter-news.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');
const cardFuncs = require('../../components/news-li/page-funcs.js');
const app = getApp();

Page({
  data: {
    page: 1,
    entirelyGet: false,
    onGetRptNews: false,
    name: '',
    nameOnShow: '',
    articlesList: [],
    touch: { start: { X: 0, Y: 0 }, end: { X: 0, Y: 0 } },
    moveAction: '',
    descByTime: false,
    descByReadNum: true,
  },
  onLoad(options) {
    let name = decodeURIComponent(options.name);
    this.setData({
      name: name.split('　').join(''),
      nameOnShow: name,
      descByTime: false,
      descByReadNum: true,
    });
    wx.setNavigationBarTitle({
      title: name + '的文章',
    });
    this.get_rpt_news();
  },
  onReachBottom() {
    if (this.data.entirelyGet === true || this.data.page === 0) {
      this.setData({ // 触发
        entirelyGet: true,
      });
    } else {
      this.get_rpt_news();
    }
  },
  get_rpt_news(get_all = false) {
    if (this.data.entirelyGet || this.data.page === 0 || this.data.onGetRptNews) {
      return;
    }
    this.setData({
      onGetRptNews: true,
    });
    wx.showNavigationBarLoading();
    requests.get("/get_reporter_articles", {
      utoken: wx.getStorageSync('utoken'),
      name: this.data.name,
      page: get_all ? 0 : this.data.page, // get_all 则 page = 0
    }).then((data) => {
      let newArticles = data.articles;
      if (get_all) {
        newArticles = cardFuncs.filterExisted.call(this, newArticles); // 去重
        this.setData({
          articlesList: this.data.articlesList.concat(newArticles),
          page: 0,
          onGetRptNews: false,
        });
      } else {
        this.setData({
          articlesList: this.data.articlesList.concat(newArticles),
          page: this.data.page + 1,
          onGetRptNews: false,
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
        onGetRptNews: false,
      })
      wx.hideNavigationBarLoading();
    });
  },
  tapBtn_1() {
    btnFuncs.feedback.call(this);
  },
  tapBtn_2() { // 按时间排序
    btnFuncs.sortedByTime.call(this);
  },
  tapBtn_3() {
    btnFuncs.sortedByReadNum.call(this);
  },
  tapBtn_4() {
    this.get_rpt_news(true);
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
