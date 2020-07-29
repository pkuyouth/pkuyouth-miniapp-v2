/**
 * Project: PKUYouth MiniApp v2
 * File: retrieve.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const requests = require('../../libs/requests.js');
const utils = require('../../libs/utils.js');

Page({

	data: {
		keyword: '',
		date: '',
		dateArray: [],
		rptName: '',
		dateRange: {},
		keywordInputFocus: false,
		rptInputFocus: false,
		keywordSearchRange: 'all',
		keywordSearchNotFound: '你好像发现了北青未涉及的领地～',
	},
	onLoad() {
		requests.get("/get_date_range", {
      utoken: wx.getStorageSync('utoken')
    }).then((data)=>{
			this.setData({
        dateRange: data.range,
				date: data.range.end,
				dateArray: data.range.end.split("-"),
			});
		});
	},
	bindKeywordInputChange(event) {
		this.setData({
			keyword: event.detail.value,
		});
	},
	bindDateChange(event) {
		this.setData({
			date: event.detail.value,
			dateArray: event.detail.value.split("-"),
		});
	},
	bindRptInputChange(event) {
		this.setData({
			rptName: event.detail.value,
		});
	},
	bindKeywordInputFoucs() {
		this.setData({
			keywordInputFocus: true,
		});
	},
	bindKeywordInputBlur() {
		this.setData({
			keywordInputFocus: false,
		});
	},
	bindRptInputFoucs() {
		this.setData({
			rptInputFocus: true,
		});
	},
	bindRptInputBlur() {
		this.setData({
			rptInputFocus: false,
		});
	},
	tapKeywordInputConfirm() {
		this.submitKeywordSearch();
	},
	tapRptInputConfirm() {
		this.submitRptSearch();
	},
	submitTimeSearch(event) {
		wx.navigateTo({
			'url': `/pages/search-time-result/search-time-result?date=${this.data.date}&method=${event.currentTarget.dataset.method}`,
		});
	},
	submitKeywordSearch() {
		if (this.data.keyword.trim() === '') {
			utils.alertNoInput();
			return;
		}
		let [keyword, range, notFound] = Array.from(
			[this.data.keyword, this.data.keywordSearchRange, this.data.keywordSearchNotFound], x => encodeURIComponent(x));
		wx.navigateTo({
			url: `/pages/search-keyword-result/search-keyword-result?keyword=${keyword}&range=${range}&notfound=${notFound}`,
		});
	},
	submitRptSearch() {
		if (this.data.rptName.trim() === '') {
			utils.alertNoInput();
			return;
		}
		wx.navigateTo({
			url: `/pages/search-reporter-result/search-reporter-result?name=${encodeURIComponent(this.data.rptName)}`,
		});
	}
})
