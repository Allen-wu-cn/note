// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  
  },
  //
  bindGetUserInfo: function() {
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
  },
  // onLogin:function(){

  //   //调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     complete: res => {
  //       console.log('callFunction test result: ', res)
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

//点击写评论
onComment: function() {
  wx.navigateTo({
    url: '../../pages/addComment/addComment',
  })
},
  //点击写书摘
  onBook: function () {
    wx.navigateTo({
      url: '../../pages/addDigest/addDigest',
    })
  },
  //点击写文章
  onArticle: function () {
    wx.navigateTo({
      url: '../../pages/addArticle/addArticle',
    })
  },
/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})