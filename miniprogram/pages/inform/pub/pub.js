const util = require("../../../utils/util")
const app = getApp()

// miniprogram/pages/inform/pub/pub.js
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
    wordCount:0,
    pubcont:'',
    pubtitle:'',
    _id:'',
    isadd:app.globalData.isadd
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      isadd:app.globalData.isadd
    })
    if(!this.data.isadd){
      this.setData({
        _id:options.id
      })
      db.collection('Inform').where({_id:options.id}).get({
        success:function(res){
          that.setData({
            pubtitle:res.data[0].title,
            pubcont:res.data[0].cont
          })
        }
      })
    }
    

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
      isadd:app.globalData.isadd
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


  submit:function(e){
    var that = this
    if(this.data.isadd){
      if(that.data.pubcont!='' &&  that.data.pubtitle !=''){
        var time = util.formatTime(new Date());
        db.collection("Inform").add({
          data:{
            title:that.data.pubtitle,
            cont:that.data.pubcont,
            pubTime:time
          },success:function(){
            wx.showToast({
              title: '发布成功',
              duration:1000
            })
            setTimeout(function () {
              wx.switchTab({
                url: '../inform',
              })
             }, 1000)
          }
        })
      }else{
        wx.showToast({
          title: '标题或内容不能为空',
          icon:'none',
          duration:2000
        })
      }
      
    }else{
      if(that.data.pubcont!='' &&  that.data.pubtitle !=''){
        var time = util.formatTime(new Date());
        db.collection("Inform").where({_id:that.data._id}).update({
          data:{
            title:that.data.pubtitle,
            cont:that.data.pubcont,
            pubTime:time
          },success:function(res){
            wx.switchTab({
              url: '../inform',
            })
          }
        })
      }else{
        wx.showToast({
          title: '标题或内容不能为空',
          icon:'none',
          duration:2000
        })
      }
    }
   
    
  },
  title_input:function(e){
   this.setData({
    pubtitle:e.detail.value
   })
  },
  cont_input:function(e){
    this.setData({
      pubcont:e.detail.value,
      wordCount:e.detail.cursor
     })
    
  }


})