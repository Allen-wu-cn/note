// miniprogram/pages/commentDetail/commentDetail.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:{}
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //console.log(options);
     var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type: "getById",
        id: options.id
      },
      success: function (res) {
        //console.log('获取单条数据');
        //console.log(res) // 3
        var itemData = res.result.data
        //that.dealDate(itemData);
        that.setData({
          comment: itemData
        })
      },
      fail: console.error
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
     return {
       title: "有意思"
     }
  }
})