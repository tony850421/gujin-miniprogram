const AV = require('./utils/av-live-query-weapp-min');

AV.init({
  appId: 'qNFjWh6zS7D36L7lwPl7JAnN-gzGzoHsz',
  appKey: 'Mizywm8n5MtGwJWaWpRAElF3',
});


//app.js
App({
  onLaunch: function () {
    var query = new AV.Query("Article");
    query.count().then(function (number) {
      if(number > 0){
        query.find().then(function (results) {
          results.forEach(function (article, i, a) {

            var queryComment = new AV.Query('Comment');
            queryComment.equalTo('owner', article);
            queryComment.find().then(function (comments) {
              comments.forEach(function (comment, i, a) {
              });
            });

          });
        }, function (error) {
          //error
        });
      }else{
        var commerce  = new AV.Object('Article');
        commerce.set('name', 'Commerce');
        var ccomment = new AV.Object('Comment');
        ccomment.set('content', 'hello commerce article');
        ccomment.set('owner', commerce);
        ccomment.save();

        var tourism = new AV.Object('Article');
        tourism.set('name', 'Tourism');
        var tcomment = new AV.Object('Comment');
        tcomment.set('content', 'hello tourism article');
        tcomment.set('owner', tourism);
        tcomment.save();

        var health = new AV.Object('Article'); 
        health.set('name', 'Health');
        var hcomment = new AV.Object('Comment');
        hcomment.set('content', 'hello health article');
        hcomment.set('owner', health);
        hcomment.save();
      }
    }, function (error) {
      //error
    });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
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
    })
  },
  globalData: {
    userInfo: null
  }
})