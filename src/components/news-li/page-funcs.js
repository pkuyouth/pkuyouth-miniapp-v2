/**
 * Project: PKUYouth MiniApp v2
 * File: page-funcs.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');

function filterExisted(newArticles) {
  let aids = Array.from(this.data.articlesList, (a) => a.aid);
  return newArticles.filter((a) => {
    return aids.indexOf(a.aid) === -1; // 返回不存在于已有 news 中的 news
  });
}

function getNewsUrl(article) {
  let { appmsgid, idx, sn } = article;
  return `https://mp.weixin.qq.com/s?__biz=MzA3NzAzMDEyNg==&mid=${appmsgid}&idx=${idx}&sn=${sn}#wechat_redirect`;
}

function handleTapStar() {
  this.setData({
    star: !this.data.star,
  });
  requests.post("/star_article", {
    utoken: wx.getStorageSync('utoken'),
    aid: this.data.aid,
    action: this.data.star ? "star" : "unstar" // tap后的实际状态
  }).then((data) => {
  }).catch((data) => {
    if (data.errcode && data.errcode !== 0) {
      this.setData({
        star: !this.data.star,
      });
    }
  });
}

function handleTapRecommend() {
  wx.navigateTo({
    url: '/pages/recommend-result/recommend-result?aid=' + this.data.aid,
  });
}

function handleTapNavigate() {
  let url = encodeURIComponent(getNewsUrl(this.data));
  let title = encodeURIComponent(this.data.title);
  let cover = encodeURIComponent(this.data.cover_url);
  wx.navigateTo({
    url: `/pages/web-frame/web-frame?url=${url}&title=${title}&cover=${cover}&type=news"`,
  });
}

module.exports = {
  filterExisted: filterExisted,
  getNewsUrl: getNewsUrl,
  handleTapStar: handleTapStar,
  handleTapRecommend: handleTapRecommend,
  handleTapNavigate: handleTapNavigate,
}
