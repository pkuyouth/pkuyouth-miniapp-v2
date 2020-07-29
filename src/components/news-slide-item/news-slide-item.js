/**
 * Project: PKUYouth MiniApp v2
 * File: news-slide-item.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const utils = require('../../libs/utils.js');
const cardFuncs = require('../news-li/page-funcs.js');

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
    cover_url: '',
    read_num: -1,
    like_num: -1,
  },
  ready() {
    let article = this.data.article;
    this.setData({
      aid: article.aid,
      appmsgid: article.appmsgid,
      idx: article.idx,
      sn: article.sn,
      title: article.title,
      time: utils.strftime(article.masssend_time, "%Y年%M月%d日"),
      cover_url: article.cover_url,
      read_num: article.read_num,
      like_num: article.like_num,
    });
  },
  methods: {
    tapNavigate() {
      cardFuncs.handleTapNavigate.call(this);
    },
  }
})
