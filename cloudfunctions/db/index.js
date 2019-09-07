// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init();
var db = cloud.database();
var comments = db.collection('comments');

// 云函数入口函数
exports.main = async(event, context) => {
  console.log(event);
  console.log('succss');
  // return add(event, context);
  // if(event.type === 'add'){
  //   return getData(event, context);
  // }
  if (event.type === "add") {
    return add(event, context);
  } else if(event.type === 'getById'){
    return getById(event, context);
  }
  else {
    return getData(event, context)
  }
};

//获取数据详情
function getById(event, context){
  //console.log(event)
  return comments.doc(event.id).get();
}

//增加数据到云数据库
function add(event, context) {
  //event.img
  //event.comment
  return new Promise(function(resolve, reject) {
    comments.add({
      data: {
        img: event.img,
        comment: event.comment,
        time: Date.now(),
        openid: event.userInfo.openId,
        locationObj:event.locationObj
      },
      success: function(res) {
        resolve(res);
      },
      fail: function(err) {
        reject(err);
      }
    })
  })
};

//获取数据的云函数
function getData(event, context) {
  return comments.get();
}