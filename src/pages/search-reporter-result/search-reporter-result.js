/**
 * Project: PKUYouth MiniApp v2
 * File: search-reporter-result.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');

Page({

	data: {
		initDone: false,
		reporters: [],
	},

	onLoad(options) {
		requests.get("/search_reporters", {
      utoken: wx.getStorageSync('utoken'),
			keyword: decodeURIComponent(options.name),
		}).then((data)=>{
			this.setData({
				reporters: data.reporters,
				initDone: true,
			});
		}).catch((data)=>{
			this.setData({
				initDone: true,
			});
		});
	},
})
