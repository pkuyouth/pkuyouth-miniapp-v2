/**
 * Project: PKUYouth MiniApp v2
 * File: search-bar.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const utils = require('../../libs/utils.js');

Component({
  properties: {
    show: {
      type: Boolean,
      value: true,
    },
    range: { // 搜索范围
      type: String,
      value: 'all',
    },
    placeholder: { // 搜索栏的提示语
      type: String,
      //value: "搜索题目｜作者｜内容",
      value: "搜索标题｜内容",
    },
    notFound: { // 无搜索结果的标语
      type: String,
      value: "你好像发现了北青未涉及的领地～",
    },
  },
  data: {
    keyword: '',
  },
  methods: {
    keywordInput(event) {
      this.setData({
        keyword: event.detail.value,
      });
    },
    tapConfirm(event) {
      this.searchSubmit();
    },
    searchSubmit() {
      if (this.data.keyword.trim() === '') {
        utils.alertNoInput();
        return;
      }
      let [keyword, range, notFound] = Array.from(
        [this.data.keyword, this.data.range, this.data.notFound], x => encodeURIComponent(x));
      wx.navigateTo({
        url: `/pages/search-keyword-result/search-keyword-result?keyword=${keyword}&range=${range}&notfound=${notFound}`,
      });
    }
  }
})
