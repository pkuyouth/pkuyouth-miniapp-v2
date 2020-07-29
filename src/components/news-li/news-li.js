/**
 * Project: PKUYouth MiniApp v2
 * File: news-li.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

Component({
	properties: {
		article: Object,
	},
	data: {
		networkType: '',
		auto_change_card: false,
		use_small_card: true,
	},
	ready() {
		const app = getApp();
		this.setData({
			networkType: app.globalData.networkType,
			auto_change_card: app.globalData.setting.auto_change_card,
			use_small_card: app.globalData.setting.use_small_card,
		});
		wx.onNetworkStatusChange((res)=>{
			if (res.isConnected) {
				this.setData({
					networkType: res.networkType,
				});
			}
		});
	},
})
