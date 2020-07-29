/**
 * Project: PKUYouth MiniApp v2
 * File: alert-bar.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (newVal === true) {
          this.playAnimation();
        }
      }
    },
    text: String,
  },
  data: {
    onAlert: false,
    animation: {},
  },
  created() {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    });
    this.setData({
      onAlert: false,
    });
  },
  methods: {
    playAnimation() {
      if (!this.data.onAlert) {
        setTimeout(this.showAlert.bind(this), 0);
        setTimeout(this.hideAlert.bind(this), 1500); // 显示 1s
      }
    },
    showAlert() {
      this.setData({
        animation: this.animation.translateY(50).step().export(),
        onAlert: true,
      });
    },
    hideAlert() {
      this.setData({
        animation: this.animation.translateY(0).step().export(),
      });
      setTimeout(this.showAlertDown.bind(this), 500);
    },
    showAlertDown() {
      this.setData({
        onAlert: false,
        show: false,
      });
    }
  }
})
