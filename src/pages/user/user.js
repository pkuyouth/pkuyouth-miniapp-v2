/**
 * Project: PKUYouth MiniApp v2
 * File: user.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

const app = getApp();

Page({

  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      //console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = (resp) => {
        //console.log(resp.userInfo)
        this.setData({
          userInfo: resp.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: (resp) => {
          app.globalData.userInfo = resp.userInfo
          this.setData({
            userInfo: resp.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    //console.log(e)
    let userInfo = e.detail.userInfo === undefined ? null : e.detail.userInfo;
    app.globalData.userInfo = userInfo;
    this.setData({
      userInfo: userInfo,
      hasUserInfo: userInfo === null ? false : true,
    });
  },
  logout() {
    this.setData({
      hasUserInfo: false,
    });
  },
  tapContactUs() {
    wx.showActionSheet({
      itemList: ['意见反馈', '我要投稿'],
      itemColor: '#353535',
      success(res) {
        switch (res.tapIndex) {
          case 0:
            wx.navigateTo({
              url: '/pages/feedback/feedback',
            });
            break;
          case 1:
            wx.navigateTo({
              url: '/pages/contribute/contribute',
            });
            break;
        }
      }
    });
  }
})
