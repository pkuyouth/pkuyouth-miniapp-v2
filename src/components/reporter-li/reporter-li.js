/**
 * Project: PKUYouth MiniApp v2
 * File: reporter-li.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const app = getApp();

Component({

	properties: {
		reporter: Object,
	},
	data: {
		name: '',
		newsCount: -1,
	},
	ready() {
		let reporter = this.data.reporter;
		let name = reporter.name;
		this.setData({
			name: name.length == 2 ? name.split('').join('　') : name,
			newsCount: reporter.article_count,
		});
	},
	methods: {
		tapRptCard() {
			wx.navigateTo({
				url: `/pages/reporter-news/reporter-news?name=${encodeURIComponent(this.data.name)}`,
			});
		}
	}
})
