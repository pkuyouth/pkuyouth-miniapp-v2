/**
 * Project: PKUYouth MiniApp v2
 * File: page-funcs.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

function handleTouchStart(event) {
  this.setData({
    'touch.start.X': event.changedTouches[0].pageX,
    'touch.start.Y': event.changedTouches[0].pageY,
  });
}

function handleTouchEnd(event) {
  this.setData({
    'touch.end.X': event.changedTouches[0].pageX,
    'touch.end.Y': event.changedTouches[0].pageY,
  });
  let dx = this.data.touch.end.X - this.data.touch.start.X;
  let dy = this.data.touch.end.Y - this.data.touch.start.Y;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    this.setData({ // 至少滑动 50 px 。如果是 tap 则 dx == dy == 0
      moveAction: dx > 0 ? 'right' : 'left'
    });
  } else {
    this.setData({
      moveAction: ''
    });
  }
}

function feedback() { // 反馈
  wx.navigateTo({
    url: '/pages/feedback/feedback',
  });
}

function scrollToUpper() { // 回到顶端
  wx.pageScrollTo({
    scrollTop: 0,
    duration: 500,
  });
}

function pageBack() { // 连续退出搜索和推荐页
  let pageStack = getCurrentPages();
  let backPageNum = 0; // 返回多少页
  for (var i = pageStack.length - 1; i >= 0; i--) {
    let route = pageStack[i].route;
    let path = route.substring(route.lastIndexOf('/') + 1);
    if (["search-keyword-result", "recommend-result"].indexOf(path) !== -1) {
      backPageNum++;
    } else { // 退出连续的搜索和推荐，一直到其他界面
      break;
    }
  }
  wx.navigateBack({
    delta: backPageNum,
  });
}

function sortedByTime() {
  let articlesList = this.data.articlesList;
  if (articlesList.length === 0) return;
  articlesList.sort((news1, news2) => {
    if (this.data.descByTime) {
      return (news1.time > news2.time ? -1 : 1);
    } else {
      return (news2.time > news1.time ? -1 : 1);
    }
  });
  this.setData({
    articlesList: articlesList,
    descByTime: !this.data.descByTime, // 可以不用设置，默认为 false
  });
}

function sortedByRank() {
  let articlesList = this.data.articlesList;
  if (articlesList.length === 0) return;
  articlesList.sort((news1, news2) => {
    if (this.data.descByRank) {
      return (news1.rank > news2.rank ? -1 : 1);
    } else {
      return (news2.rank > news1.rank ? -1 : 1);
    }
  });
  this.setData({
    articlesList: articlesList,
    descByRank: !this.data.descByRank,
  });
}

/*
function sortedByReadNum() {
    let articlesList = this.data.articlesList;
    if (articlesList.length === 0) return;
    articlesList.sort((news1,news2)=>{
        if (this.data.descByReadNum) {
            return (news1.read_num > news2.read_num ? -1 : 1);
        } else {
            return (news2.read_num > news1.read_num ? -1 : 1);
        }
    });
    this.setData({
        articlesList: articlesList,
        descByReadNum: !this.data.descByReadNum,
    });
}
 */

function sortedByReadNum() { // 阅读量排序
  let articlesList = this.data.articlesList;
  if (articlesList.length === 0) return;
  articlesList.sort((news1, news2) => news2.read_num - news1.read_num) // 只按从高到低排序
  this.setData({
    articlesList: articlesList,
  });
}

module.exports = {
  handleTouchStart: handleTouchStart,
  handleTouchEnd: handleTouchEnd,
  feedback: feedback,
  scrollToUpper: scrollToUpper,
  pageBack: pageBack,
  sortedByTime: sortedByTime,
  sortedByRank: sortedByRank,
  sortedByReadNum: sortedByReadNum,
}
