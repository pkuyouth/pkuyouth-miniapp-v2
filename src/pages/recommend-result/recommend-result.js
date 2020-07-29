/**
 * Project: PKUYouth MiniApp v2
 * File: recommend-result.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');

Page({
	data: {
		initDone: false,
		articlesList: [],
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad(options) {
		wx.showNavigationBarLoading();
		requests.post('/recommend',{
			newsID: options.newsid,
			limit: 10,
		}).then((data)=>{
			this.setData({
				articlesList: data.articles,
				initDone: true,
			});
			wx.hideNavigationBarLoading();
		}).catch((data)=>{
			this.setData({
				initDone: true,
			});
			wx.hideNavigationBarLoading();
		});
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() {
		btnFuncs.sortedByTime.call(this);
	},
	tapBtn_3() {
		btnFuncs.pageBack.call(this);
	},
	handleTouchStart(event) {
		btnFuncs.handleTouchStart.call(this, event);
	},
	handleTouchEnd(event) {
		btnFuncs.handleTouchEnd.call(this, event);
	},
})