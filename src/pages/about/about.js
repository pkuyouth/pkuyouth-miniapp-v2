/**
 * Project: PKUYouth MiniApp v2
 * File: about.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

Page({

  data: {
    name: '',
    version: '',
  },

  onReady() {
    this.setData(getApp().globalData.config.app_info);
  }
})
