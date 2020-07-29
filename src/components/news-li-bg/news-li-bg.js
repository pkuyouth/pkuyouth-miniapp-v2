/**
 * Project: PKUYouth MiniApp v2
 * File: news-li-bg.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

// components/news-li/news-li.js

'use strict';

const utils = require("../../libs/utils.js");
const cardFuncs = require('../news-li/page-funcs.js');
const app = getApp();

Component({
  properties: {
    article: Object,
  },
  data: {
    aid: -1,
    appmsgid: '',
    idx: -1,
    sn: '',
    title: '',
    time: '',
    read_num: -1,
    like_num: -1,
    star: false,
    star_time: -1,
    // rank: -1,
    cover_url_bg: '',
    hidden: false,
  },
  ready() {
    let article = this.data.article;
    let imgid = ('000000000' + article.appmsgid).slice(-10) + article.idx;
    this.setData({
      aid: article.aid,
      appmsgid: article.appmsgid,
      idx: article.idx,
      sn: article.sn,
      title: article.title,
      time: utils.strftime(article.masssend_time, "%Y/%M/%d"),
      read_num: article.read_num,
      like_num: article.like_num,
      // rank: article.rank === undefined ? -1 : article.rank, // 默认值 -1
      star: article.star_time !== null,
      star_time: article.star_time === null ? -1 : article.star_time,
      cover_url_bg: app.globalData.config.prefix.bg_cover + imgid + '.jpeg',
      hidden: article.hidden,
    });
  },
  methods: {
    tapStar() {
      cardFuncs.handleTapStar.call(this);
    },
    tapRecommend() {
      cardFuncs.handleTapRecommend.call(this);
    },
    tapNavigate() {
      cardFuncs.handleTapNavigate.call(this);
    },
  }
})
