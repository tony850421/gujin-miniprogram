// pages/comerce/comerce.js
var text = '';

const AV = require('../../utils/av-live-query-weapp-min');
const bind = require('../../utils/live-query-binding');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    widht: '',
    inputText: '',
    focus: true,
    commentsArray: [],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight,
          widht: res.windowWidth
        })
      },
    })

    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getStorage({
      key: 'Commerce',
      success: res => {
        this.fetchComments(res.data).catch(error => console.error(error.message)).then(wx.stopPullDownRefresh);
      },
    })
  },
  fetchComments: function (id) {
    const query = new AV.Query('Comment')
      .equalTo('owner', AV.Object.createWithoutData('Article', id))
      .descending('createdAt');
    const setComments = this.setComments.bind(this);
    return AV.Promise.all([query.find().then(setComments), query.subscribe()]).then(([commentsArray, subscription]) => {
      this.subscription = subscription;
      if (this.unbind) this.unbind();
      this.unbind = bind(subscription, commentsArray, setComments);
    }).catch(error => console.error(error.message));
  },

  setComments: function (commentsArray) {
    commentsArray.forEach(function (comment, i, a) {
      comment.createdAt = comment.createdAt.toLocaleString()
    });

    this.setData({
      commentsArray,
    });
    
    return commentsArray;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.subscription.unsubscribe();
    this.unbind();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.getStorage({
      key: 'Commerce',
      success: res => {
        this.fetchComments(res.data).catch(error => console.error(error.message)).then(wx.stopPullDownRefresh);
      },
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindKeyInput: function (e) {
    this.setData({
      inputText: e.detail.value
    })
  },
  confirmText: function(){
    wx.getStorage({
      key: 'Commerce',
      success: res => {
        var article = AV.Object.createWithoutData('Article', res.data)
        
        var ccomment = new AV.Object('Comment');
        ccomment.set('content', text + this.data.inputText);
        ccomment.set('avatarUrl', this.data.userInfo.avatarUrl);
        ccomment.set('nickName', this.data.userInfo.nickName);
        ccomment.set('owner', article);
        ccomment.save();

        this.setData({
          inputText: '',
          focus: true
        })
      },
    })
  },
  sendText: function(){
    this.confirmText()
  },
  hideKeyboard: function(){
    wx.hideKeyboard()
  }
})