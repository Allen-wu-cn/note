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
  
  //点击写文章
  onArticle: function () {
    wx.navigateTo({
      url: '../../pages/addArticle/addArticle',
    })
  },


/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})