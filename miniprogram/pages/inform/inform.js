// miniprogram/pages/inform/inform.js
const app = getApp()

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
    src:'../../images/tongzhidatu.png',
    addBtn_src:'../../images/addBtn.png',
    delBtn_src:'../../images/delete.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.isadd=false
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
    
    db.collection("Inform").orderBy('pubTime','desc').get({
      success:function(res){
        that.setData({
          informList:res.data
        })
  
      }
      
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

  addBtn:function(){
    app.globalData.isadd=true
    wx.navigateTo({
      url: '../inform/pub/pub',
    })
  },

  clickBtn:function(res){
    app.globalData.isadd=false
    wx.navigateTo({
      url: '../inform/pub/pub?id='+res.currentTarget.id
    })
  },

  delBtn:function(e){
  var that = this
  var id = e.currentTarget.id
  wx.showModal({
    cancelColor: 'cancelColor',
    title:'删除公告',
    content:'是否确认删除',
    success:function(res){
      if(res.confirm==true){
        console.log(id);
        db.collection('Inform').where({_id:id}).remove({
          success:function(res){
            console.log(res);
            wx.showToast({
              title: '删除成功',
              duration:1000
            })
            setTimeout(function () {
              that.onShow()
             }, 1000)

          }
        })
      }
    }
  })
 
  }


})