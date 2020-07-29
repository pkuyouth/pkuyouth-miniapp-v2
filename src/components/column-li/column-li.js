/**
 * Project: PKUYouth MiniApp v2
 * File: column-li.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');
const app = getApp();

Component({

	properties: {
		column: Object,
	},
	data: {
		id: 0,
		title: "",
		desc: "",
		cover: "",
		articleCount: -1,
	},
	ready() {
		let column = this.data.column;
		this.setData({
			id: column.id,
			title: column.title,
			desc: column.desc,
			cover: app.globalData.config.prefix.column + column.cover,
			articleCount: column.article_count,
		});
	},
	methods: {
		tapColumnCard(event) {
			wx.navigateTo({
				url: '/pages/column-news/column-news?column=' + encodeURIComponent(this.data.title),
			});
		}
	}
})
