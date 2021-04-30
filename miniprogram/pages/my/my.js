// pages/my/my.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src: '../../images/user.png',
    outsrc:'../../images/signout.png',
    shenpisrc:'../../images/shenpi.png',
    nickName:'点击登录',
    isLogin:app.globalData.isLogin,
    isBindId:app.globalData.isBindId
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
    this.setData({
      isLogin:app.globalData.isLogin,
      isBindId:app.globalData.isBindId,
      userId:app.globalData.userId,
      userType:app.globalData.userType
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
    app.globalData.isBindId=false;
    app.globalData.userId='';
    app.globalData.passWord='';
    app.globalData.userType='学号'
    this.setData({
      isBindId:app.globalData.isBindId,
      userType:app.globalData.userType
    })
    wx.showToast({
      title: '解绑成功',
      duration: 1200
    })
  }
  
})