/**
 * Project: PKUYouth MiniApp v2
 * File: floating-button.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

Component({
  properties: {
    num: { // 按钮数量
      type: Number,
      value: 3,
    },
    text: { // 按钮文字描述
      type: Array,
      value: [],
    },
    icon: {
      type: Array,
      value: [],
    },
    tapChange: { // 单击后是否自动折叠
      type: Array,
      value: [true, true, true],
    },
    hasSearchBar: {
      type: Boolean,
      value: false,
    },
    searchRange: {
      type: String,
      value: 'all',
    },
    searchBarPlaceholder: {
      type: String,
      value: "搜索题目｜内容",
    },
    searchNotFound: {
      type: String,
      value: "你好像发现了北青未涉及的领地～",
    },
    moveAction: {
      type: String,
      value: '',
      observer(newVal) {
        if (!this.data.unfolded) {
          if (newVal == 'left' && !this.data.showMenu) {
            this.showMenu();
          } else if (newVal == 'right' && this.data.showMenu) {
            this.hiddenMenu();
          }
        }
      }
    }
  },
  data: {
    onInit: true,
    unfolded: false, // 菜单栏折叠与否
    display: true, // 折叠打开中控制小按钮的display
    showMenu: true, // 显示菜单栏，或者隐藏到侧栏
    animation_1: {},
    animation_2: {},
    animation_3: {},
    animation_4: {},
    animation_5: {},
    animationTotal: {},
  },
  created() {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
      transformOrigin: 'right bottom',
    });
  },
  ready() {
    this.setData({
      unfolded: false,
      display: true, // 之后播放动画时还会反转，最后保持同步
    });
    this.playanimation();

    setTimeout(function () {
      this.setData({
        onInit: false
      });
    }.bind(this), 1000); // 1.0s 后显示图标
  },
  methods: {
    changeStatus() {
      if (this.data.showMenu) {
        this.setData({
          unfolded: !this.data.unfolded,
        });
        this.playanimation();
      }
    },
    changeDisplay() {
      this.setData({
        display: !this.data.display,
      });
    },
    playanimation() { // 注意！ 进入后属性已经反转！
      if (this.data.unfolded) { // 关闭时（显示为展开），立即显示，再播放动画
        this.changeDisplay();
      } else { // 展开时（显示为关闭），先播放完动画再隐藏
        setTimeout(this.changeDisplay.bind(this), 1000);
      }

      if (this.data.unfolded) {
        this.unfoldAnimation();
      } else {
        this.foldAnimation();
      }
    },
    foldAnimation() {
      this.setData({
        animation_1: this.animation.translateX(130).step({ delay: 250 }).export(),
        animation_2: this.animation.translateX(130).step({ delay: 200 }).export(),
        animation_3: this.animation.translateX(130).step({ delay: 150 }).export(),
        animation_4: this.animation.translateX(130).step({ delay: 100 }).export(),
        animation_5: this.animation.translateX(130).step({ delay: 50 }).export(),
      });
    },
    unfoldAnimation() {
      this.setData({
        animation_1: this.animation.translateX(0).step({ delay: 50 }).export(),
        animation_2: this.animation.translateX(0).step({ delay: 100 }).export(),
        animation_3: this.animation.translateX(0).step({ delay: 150 }).export(),
        animation_4: this.animation.translateX(0).step({ delay: 200 }).export(),
        animation_5: this.animation.translateX(0).step({ delay: 250 }).export(),
      });
    },
    showMenu() {
      this.setData({
        animationTotal: this.animation.translateX(0).step({ delay: 50 }).export(),
        showMenu: true,
      });
    },
    hiddenMenu() {
      this.setData({
        animationTotal: this.animation.translateX(65).step({ delay: 50 }).export(),
        showMenu: false,
      });
    },
    tapBtn_1() {
      this.triggerEvent("tap-btn-one");
      if (this.data.tapChange[0]) {
        this.changeStatus();
      }
    },
    tapBtn_2() {
      this.triggerEvent("tap-btn-two");
      if (this.data.tapChange[1]) {
        this.changeStatus();
      }
    },
    tapBtn_3() {
      this.triggerEvent("tap-btn-three");
      if (this.data.tapChange[2]) {
        this.changeStatus();
      }
    },
    tapBtn_4() {
      this.triggerEvent("tap-btn-four");
      if (this.data.tapChange[3]) {
        this.changeStatus();
      }
    },
    tapBtn_5() {
      this.triggerEvent("tap-btn-five");
      if (this.data.tapChange[4]) {
        this.changeStatus();
      }
    }
  }
})
