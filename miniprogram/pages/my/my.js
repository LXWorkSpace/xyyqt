// pages/my/my.js
var menus  = require('../../utils/tarBar');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: '../../images/user.png',
    outsrc:'../../images/signout.png',
    infosrc:'../../images/info.png',
    xiugaisrc:'../../images/xiugai.png',
    yimiaosrc:'../../images/yimiao.png',
    chuxiaosrc:'../../images/chuxiao.png',
    shenpisrc:'../../images/shenpi.png',
    nickName:'点击登录',
    isLogin:false,
    isBindId:false
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
    if(app.globalData.userType == '学号'){
      this.setData({
        menus: menus.student
      })
    } else{
      this.setData({
        menus: menus.teacher
      })
    }

    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      list: this.data.menus.index,
      selected: 3
    })
  }

    this.setData({
      isLogin:app.globalData.isLogin,
      isBindId:app.globalData.isBindId,
      userId:app.globalData.userId,
      userType:app.globalData.userType,
      isgoout:app.globalData.isgoout,
      isyuyue:app.globalData.isyuyue
    })
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

  getlogin:function(){
    var that = this;
    wx.getUserProfile({
      desc: '展示用户信息',
      success:function(res){
        var userInfo = res.userInfo
        app.globalData.isLogin=true
        that.setData({
          nickName:userInfo.nickName,
          src:userInfo.avatarUrl,
        })


        wx.navigateTo({
          url: '../my/Login/login',
        })
      }
    })
  },
  signout:function(){
    app.globalData.isBindId=false
    app.globalData.userId=''
    app.globalData.passWord=''
    app.globalData.userType='学号'
    app.globalData.vindex=0
    app.globalData.isqiandao=false
    app.globalData.isgoout=0
    app.globalData.isyuyue=0
    wx.showToast({
      title: '解绑成功',
      duration: 1200
    })
    this.onShow()
  },
  update:function(){

      wx.navigateTo({
        url: './update/update',
      })

  },
  cxsq:function(){
    wx.navigateTo({
      url: './sq/sq?index='+this.data.isgoout,
    })
  },
  ymsq:function(){
    wx.navigateTo({
      url: './sq/sq?index='+this.data.isyuyue,
    })
  },
  cxsp:function(){
    wx.navigateTo({
      url: './sp/sp?index=goout',
    })
  },
  ymsp:function(){
    wx.navigateTo({
      url: './sp/sp?index=vaccine',
    })
  },
})