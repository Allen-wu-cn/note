// miniprogram/pages/list/list.js
const db = wx.cloud.database();
const comments = db.collection('comments');
//让时间的显示补零
function fixZero (num) {
  return num < 10 ? "0" + num : num;
};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();

  },
  //获取云端数据
  getData: function() {
    var that = this;

    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
         type:"get"
      },
      success: function (res) {
        console.log('成功获取');
        console.log( res) // 3
        var itemData = res.result.data.reverse();
        that.dealDate(itemData);
        that.setData({
          comments: itemData
        })
      },
      fail: console.error
    })
    // comments.get({
    //   success(res) {
    //     //console.log(res.data);
    //     var itemData = res.data.reverse(); //让数据倒序呈现

    //     that.dealDate(itemData);
    //     that.setData({
    //       comments: itemData
    //     });

    //   }
    // })
  },
  
  //转换时间戳
  dealDate: function(itemData) {
    //console.log(itemData)
    //通过forEach来遍历数组进行转换
    itemData.forEach(function(item) {
      //console.log(item);
      var dateInfo = new Date(item.time);
      //console.log(dateInfo);
      
      item.timeInfo = {
        year: dateInfo.getFullYear(),
        month: fixZero(dateInfo.getMonth() + 1),
        date: fixZero(dateInfo.getDate()),
        hours: fixZero(dateInfo.getHours()),
        minutes: fixZero(dateInfo.getMinutes())
      }
    });
    //console.log(item.timeInfo);
  },
//跳转评论详情页面
  onCommentDetail:function(e){
    //console.log(e);
    wx.navigateTo({
      url: '/pages/commentDetail/commentDetail' ,
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