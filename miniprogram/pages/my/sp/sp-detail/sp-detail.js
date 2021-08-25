// miniprogram/pages/my/sp/sp-detail/sp-detail.js
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
    console.log(options);
    this.setData({
      _id:options._id,
      type:options.type,
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
    db.collection("Student").where({
      _id:this.data._id
    }).get({
      success:function(res){
        console.log(res);
        that.setData({
          list:res.data[0]
        })
      },
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
  button1:function(){
    var that = this
    if(this.data.type == 'goout'){
      db.collection('Student').where({_id:that.data._id}).update({
        data:{
          goout:{isgoout:2}
        },
        success:function(res){
          console.log(res);
          wx.showToast({
            title: '已批准',
            duration:2000
          })
          setTimeout(function () {
           wx.navigateBack()
           }, 2000)
  
        }
      })  
    }else if(this.data.type == 'vaccine'){
      db.collection('Student').where({_id:that.data._id}).update({
        data:{
          vaccine:{isyuyue:2}
        },
        success:function(res){
          console.log(res);
          wx.showToast({
            title: '已批准',
            duration:2000
          })
          setTimeout(function () {
           wx.navigateBack()
           }, 2000)
  
        }
      })  
    }

  },
  button2:function(){
    var that = this
    if(this.data.type == 'goout'){
      db.collection('Student').where({_id:that.data._id}).update({
        data:{
          goout:{isgoout:0}
        },
        success:function(res){
          console.log(res);
          wx.showToast({
            title: '已批准',
            duration:2000
          })
          setTimeout(function () {
           wx.navigateBack()
           }, 2000)
  
        }
      })  
    }else if(this.data.type == 'vaccine'){
      db.collection('Student').where({_id:that.data._id}).update({
        data:{
          vaccine:{isyuyue:0}
        },
        success:function(res){
          console.log(res);
          wx.showToast({
            title: '已驳回',
            duration:2000
          })
          setTimeout(function () {
           wx.navigateBack()
           }, 2000)
  
        }
      })  
    }
  }

})