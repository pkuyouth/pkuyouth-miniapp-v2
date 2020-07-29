/**
 * Project: PKUYouth MiniApp v2
 * File: favorite.js
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
    initDone: false,
    articlesList: [],
    descByStarTime: false,
    page: 1,
    onGetFavorite: false,
    entirelyGet: false,
    touch: { start: { X: 0, Y: 0 }, end: { X: 0, Y: 0 } },
    moveAction: '',
  },
  onLoad() {
    this.get_favorite();
  },
  onReachBottom() {
    if (this.data.entirelyGet || this.data.page === 0) { // page = 0 说明 entirelyGet
      this.setData({
        entirelyGet: true, // 触发提示
      });
    } else {
      this.get_favorite();
    }
  },
  get_favorite(get_all = false) {
    if (this.data.onGetFavorite || this.data.entirelyGet || this.data.page === 0) {
      return;
    }
    wx.showNavigationBarLoading();
    this.setData({
      onGetFavorite: true,
    });
    requests.get('/get_starred_articles', {
      utoken: wx.getStorageSync('utoken'),
      page: get_all ? 0 : this.data.page, // get_all 则 page = 0
    }).then((data) => {
      let newArticles = data.articles;
      if (get_all) {
        newArticles = cardFuncs.filterExisted.call(this, newArticles); // 去重
        this.setData({
          articlesList: this.data.articlesList.concat(newArticles),
          page: 0,
          onGetFavorite: false,
          initDone: true,
        }); // 此时不设置 entirelyGet 而是在随后的触底再设置，并触发提示
      } else {
        this.setData({
          articlesList: this.data.articlesList.concat(newArticles),
          page: this.data.page + 1,
          onGetFavorite: false,
          initDone: true,
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
        onGetFavorite: false,
        initDone: true,
      });
      wx.hideNavigationBarLoading();
    });
  },
  tapBtn_1() {
    btnFuncs.feedback.call(this);
  },
  tapBtn_2() { // 点赞时间排序
    let articlesList = this.data.articlesList;
    if (articlesList.length === 0) return;
    articlesList.sort((news1, news2) => {
      if (this.data.descByStarTime) {
        return (news1.star_time > news2.star_time ? -1 : 1);
      } else {
        return (news2.star_time > news1.star_time ? -1 : 1);
      }
    });
    this.setData({
      articlesList: articlesList,
      descByStarTime: !this.data.descByStarTime,
    });
  },
  tapBtn_3() {
    btnFuncs.sortedByTime.call(this);
  },
  tapBtn_4() {
    this.get_favorite(true);
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
