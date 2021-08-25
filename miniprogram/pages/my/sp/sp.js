// miniprogram/pages/my/sp/sp.js
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type : options.index
    })

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
    var that = this
    if(this.data.type == 'goout'){
      db.collection("Student").where({
        goout:{
          isgoout:1
        }
      }).get({
        success:function(res){
          console.log(res);
          that.setData({
            spList:res.data
          })
        },
      })
    }else if(this.data.type == 'vaccine'){
      db.collection("Student").where({
        vaccine:{
          isyuyue:1
        }     
      }).get({
        success:function(res){
          that.setData({
            spList:res.data
          })
        }
      })
    }




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
  clickBtn:function(res){
    console.log(res);
    wx.navigateTo({
      url: './sp-detail/sp-detail?_id='+res.currentTarget.id + '&type=' + this.data.type,
    })
  },

})