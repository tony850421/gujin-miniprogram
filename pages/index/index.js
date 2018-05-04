//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShareAppMessage: function () {
    console.log('share')
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scanQRCode: function(){
    wx.scanCode({
      success: (res) => {
        wx.showToast({
          title: res.result,
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  goToComerce: function(){
    wx.navigateTo({
      url: '../comerce/comerce',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  goToHealth: function () {
    wx.navigateTo({
      url: '../health/health',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goToTourism: function () {
    wx.navigateTo({
      url: '../tourism/tourism',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goToWomen: function () {
    wx.navigateTo({
      url: '../women/women',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goToHavana: function () {
    wx.navigateTo({
      url: '../havana/havana',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goToHavanaClub: function () {
    wx.navigateTo({
      url: '../havana/havana',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})
