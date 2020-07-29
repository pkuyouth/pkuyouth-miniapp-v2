/**
 * Project: PKUYouth MiniApp v2
 * File: utils.js
 * Created Date: 2020-07-28
 * Author: Xinghong Zhong
 * ---------------------------------------
 * Copyright (c) 2020 PKUYouth
 */

'use strict';

function alertNoInput() {
  wx.showToast({
    title: "输入内容不得为空",
    icon: 'none',
    duration: 1000,
  });
}

function strftime(timestamp, fmt) {
  function pad(value) {
    return (value.toString().length < 2) ? '0' + value : value;
  }
  let date = new Date(timestamp * 1000);
  return fmt.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
    switch (fmtCode) {
      case 'Y':
        return date.getUTCFullYear();
      case 'M':
        return pad(date.getUTCMonth() + 1);
      case 'd':
        return pad(date.getUTCDate());
      case 'H':
        return pad(date.getUTCHours());
      case 'm':
        return pad(date.getUTCMinutes());
      case 's':
        return pad(date.getUTCSeconds());
      default:
        throw new Error('Unsupported format code: ' + fmtCode);
    }
  });
}

module.exports = {
  alertNoInput: alertNoInput,
  strftime: strftime,
}
