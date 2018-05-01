// pages/comerce/comerce.js
var text = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: '',
    widht: '',
    value: '',
    inputText: '',
    focus: true,
    comments: [],
    leftReply: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight -45,
          widht: res.windowWidth -50,
          leftReply: res.windowWidth - 85
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
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
  confirmText: function(e){
    text = text + this.data.inputText + '\n',
    this.setData({
      value: text,
      inputText: '',
      focus: true
    })
  },
  sendText: function(){
    confirmText()
  },
  hideKeyboard: function(){
    wx.hideKeyboard()
  },
  replyComment: function(){

  }
})