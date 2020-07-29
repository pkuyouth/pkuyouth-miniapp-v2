/**
 * Project: PKUYouth MiniApp v2
 * File: news-li-sm.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

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
    star: false,
    star_time: -1,
    // rank: -1,
    cover_url_sm: '',
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
      time: article.masssend_time,
      // rank: article.rank === undefined ? -1 : article.rank, // 默认值 -1
      star: article.star_time !== null,
      star_time: article.star_time === null ? -1 : article.star_time,
      cover_url_sm: app.globalData.config.prefix.sm_cover + imgid + '.jpeg',
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
    }
  }
})
