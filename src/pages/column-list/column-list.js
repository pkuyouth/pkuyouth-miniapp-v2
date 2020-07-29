/**
 * Project: PKUYouth MiniApp v2
 * File: column-list.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require("../../libs/requests.js");

Page({
  data: {
    columns: [],
    touch: { start: { X: 0, Y: 0 }, end: { X: 0, Y: 0 } },
    moveAction: '',
  },
  onLoad() {
    requests.get("/get_column_list", {
      utoken: wx.getStorageSync('utoken')
    }).then((data) => {
      this.setData({
        columns: data.columns,
      })
    });
  },
})