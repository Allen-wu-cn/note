// miniprogram/pages/addComment/addComment.js
// const db = wx.cloud.database();
// const comments = db.collection('comments');

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
    //console.log(e);
    var comment = e.detail.value;
    this.setData({
      "form.comment": comment
    })
  },
 
  addComment: function (fileID){
    var form = this.data.form;
    console.log('开始调用云函数');
    wx.cloud.callFunction({
      // 云函数名称
      name: 'db',
      // 传给云函数的参数
      data: {
        type:"add",
        img: fileID,
        comment: form.comment,
      },
      success: function (res) {
        //console.log("成功")
        //console.log(res) // 3
      },
      fail: console.error
    })
  //   comments.add({
  //   // data 字段表示需新增的 JSON 数据
  //   data: {
  //     img: fileID,
  //     comment: form.comment,
  //     time: Date.now()
  //   },
  //   success: function (res) {
  //     //console.log(res)
  //     wx.showToast({
  //       title: '保存成功', 
  //     })
  //   },
  //   fail: console.error
  // })
  } ,

  //保存数据到云端
  onSave: function() {
    var that = this;
    var form = this.data.form;
    //为避免图片名称重复，用正则表达式设置图片云名称
    //var cloudPath = Data.now() + form.img.match(/\.[^.]+?$/)[0];
    wx.cloud.uploadFile({
      cloudPath: `${Math.floor(Math.random() * 1000000000)}.png`,  //使用cloudPath也行，严格来讲使用随机数表达更好 
      filePath: form.img, // 文件路径
      success: res => {
        // get resource ID
        //console.log(res.fileID);
        var fileID = res.fileID;
        that.addComment(fileID);
        wx.reLaunch({
          url: '../../pages/list/list',
        })
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

  
})