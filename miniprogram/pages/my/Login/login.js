var format  = require('../../../utils/util');
// miniprogram/pages/my/Login/login.js
const app = getApp();
wx.cloud.init({
  env:'cloud1-4g9qg03576050163'
})
const db = wx.cloud.database({
  env:'cloud1-4g9qg03576050163'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {

    items:[
      {value:'Student',name:'学生',type:'学号',checked:true},
      {value:'Teacher',name:'教师',type:'工号'}
    ],
    userId:'',
    loginType:'Student',
    passWord:'',
    userType:app.globalData.userType
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  console.log(app.globalData);
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

  radioChange:function(e){
      this.data.loginType=e.detail.value
  },
  radioInfo:function(e){
    let index=e.currentTarget.dataset.index
    this.setData({
      userType:this.data.items[index].type
    })
  },

  useridInput:function(e){
      this.data.userId=parseInt(e.detail.value)
  },

  passwordInput:function(e){
      this.data.passWord=e.detail.value
  },

  loginBtn:function(e){
    var that = this
    if(this.data.userId == 0 || this.data.passWord == 0){
      wx.showToast({
        title: '账号或密码不能为空',
        icon:'none',
        duration:3000
      })
    }else{
      db.collection(this.data.loginType).where({
        userId:that.data.userId,
      }).get({
        success:function(res){
          if(res.data.length==0){
            wx.showToast({
              title: '学号/工号或密码填写错误',
              icon:'none',
              duration:3000
            })
          }else if(that.data.passWord == res.data[0].passWord){
            if(that.data.loginType == 'Student'){
              app.globalData.isBindId=true
              app.globalData.userId = that.data.userId
              app.globalData.userType = that.data.userType
              app.globalData.vindex = res.data[0].vaccine.vindex
              app.globalData.isqiandao = res.data[0].qiandao.isqiandao
              app.globalData.isgoout = res.data[0].goout.isgoout
              app.globalData.isyuyue = res.data[0].vaccine.isyuyue
              wx.switchTab({
               url: '../my',
              })
            }else{
              app.globalData.isBindId=true;
              app.globalData.userId = that.data.userId
              app.globalData.userType = that.data.userType
              wx.switchTab({
                url: '../my',
              })
            }
          }else{
            wx.showToast({
              title: '学号/工号或密码填写错误',
              icon:'none',
              duration:3000
            })
          }
        }
      })

   }

  },
  regBtn:function(){
    wx.navigateTo({
      url: '../Login/register/register',
    })
  }
})