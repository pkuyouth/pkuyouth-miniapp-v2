/**
 * Project: PKUYouth MiniApp v2
 * File: app.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

App({

  globalData: {
    userInfo: null,
    systemInfo: {},
    networkType: 'unknown',
    config: {},
    setting: {
      "auto_change_card": false,
      "use_small_card": true,
    },
  },
  onLaunch() {
    // 展示本地存储能力
		/*
		var logs = wx.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		wx.setStorageSync('logs', logs);
		 */
		/*
		// 登录
		wx.login({
			success: function(resp) {
				if (resp.code) {
					requests.post('/login',{
						js_code: resp.code,
					}).then((data)=>{
						api.setStorage("token", data.token, false);
					});
				} else {
					console.log('登录失败！' + resp.errMsg);
				}
			}
		});

		// 获取用户信息
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: (res) => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				}
			}
		});
		 */
    wx.getSystemInfo({ // 获取屏幕信息
      success: (res) => {
        this.globalData.systemInfo = res;
      }
    })
    wx.getNetworkType({
      success: (res) => {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        this.globalData.networkType = res.networkType;
      }
    });
    wx.onNetworkStatusChange((res) => {
      if (res.isConnected) {
        this.globalData.networkType = res.networkType;
      }
    });
  },
})
