// miniprogram/pages/addComment/addComment.js
const db = wx.cloud.database();
const comments = db.collection('comments');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      img: '',
      comment: ''
    },
    showAdd: true
  },

  //点击上传图片事件
  uploadImg: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        //console.log(res);

        that.setData({
          "form.img": res.tempFilePaths[0],
          showAdd: false
        });


      }
    })
  },
  //获取评论内容
  onInput: function(e) {
    console.log(e);
    var comment = e.detail.value;
    this.setData({
      "form.comment": comment
    })
  },
 
  addComment: function (fileID){
    var form = this.data.form
    comments.add({
    // data 字段表示需新增的 JSON 数据
    data: {
      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      img: fileID,
      comment: form.comment,
      
    },
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
      wx.showToast({
        title: '保存成功',
        
      })
    },
    fail: console.error
  })
  } ,

  //保存数据到云端
  onSave: function() {
    var that = this;
    var form = this.data.form;
    //为避免图片名称重复，用正则表达式设置图片云名称
    //var cloudPath = Data.now() + form.img.match(/\.[^.]+?$/)[0];
    wx.cloud.uploadFile({
      cloudPath: `${Math.floor(Math.random() * 10000000)}.png`,  //使用cloudPath也行，严格来讲使用随机数表达更好 
      filePath: form.img, // 文件路径
      success: res => {
        // get resource ID
        console.log(res.fileID);
        var fileID = res.fileID;
        that.addComment(fileID);
      },
      fail: err => {
        // handle error
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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