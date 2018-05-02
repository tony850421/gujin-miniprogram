// pages/comerce/comerce.js
var text = '';
var aux = [];

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
    leftReply: '',
    commentsArray: []
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

    var idCommerce = ''

    // var comment = [{
    //   id:0,
    //   article: 'A',
    //   content: 'Assda sda sdas dasd',
    //   create_date: '01-05-2018',
    //   replyTextArea: false,
    //   childrens: [{
    //     id: 0,
    //     article: 'B',
    //     content: 'probando',
    //     create_date: '01-05-2018',
    //     replyTextArea: false,
    //     childrens: []
    //   },{
    //       id: 1,
    //       article: 'C',
    //       content: 'probando CCCC',
    //       create_date: '01-05-2018',
    //       replyTextArea: false,
    //       childrens: []
    //   }]
    // }]

    // this.setData({
    //   article: comment
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getStorage({
      key: 'Commerce',
      success: res => {
        console.log('page ready');
        console.log(res.data);
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
        console.log('page ready');
        this.fetchTodos(res.data).catch(error => console.error(error.message)).then(wx.stopPullDownRefresh);
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
    // var comment = {
    //   id: this.data.article.length,
    //   article: 'A',
    //   content: text + this.data.inputText,
    //   create_date: Date.toString,
    //   replyTextArea: false,
    //   childrens: []
    // }

    // var articleAux = []
    // articleAux = this.data.article
    // articleAux.push(comment)

    // this.setData({
    //   article: articleAux
    // })

    // this.setData({
    //   inputText: '',
    //   focus: true
    // })

    // console.log(this.data.article)
  },
  sendText: function(){
    this.confirmText()
  },
  hideKeyboard: function(){
    wx.hideKeyboard()
  },
  replyComment: function(event){
    console.log("llego aqui")
    // var articleAux = this.data.article

    // for (var i = 0; i < articleAux.length; i++){
    //   if (articleAux[i].id == event.currentTarget.dataset.id){
    //     articleAux[i].replyTextArea = true
    //     break
    //   }
    // }

    // this.setData({
    //   article: articleAux
    // })

    // console.log(this.data.article)
  }
})