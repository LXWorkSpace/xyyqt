// miniprogram/pages/index/more/detail/detail.js
Page({
  
  /**
   * 页面的初始数据
   */
  data:{

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://api.tianapi.com/txapi/ncov/index?key=04a7e916dda694f39cb00833fcf96360', 
      success: function (res) {
        if(res.data.code == 200){      
          var news = res.data.newslist[0].news[options.index]
          console.log(news)
          that.setData({
            newsTitle: news.title,
            newsSummary:news.summary,
            newsTime:news.pubDateStr,
            newsSource:news.infoSource
          })
        }
      }
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

})