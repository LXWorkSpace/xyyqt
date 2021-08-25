// miniprogram/pages/my/update/update.js
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
    colleges: ['管理工程学院', '城市经济与公共管理学院', '工商管理学院', '经济学院', '会计学院', '劳动经济学院', '文化与传播学院', '财政税务学院', '法学院', '金融学院', '统计学院', '外国语学院 ', '华侨学院', '马克思主义学院', '国际经济管理学院', '国际学院'],
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
    var that = this
    db.collection('Student').where({userId:app.globalData.userId}).get({
      success(res){
        that.setData({
          name:res.data[0].name,
          phoneNum:res.data[0].phoneNum,
          region:res.data[0].region,
          address:res.data[0].address,
          college:res.data[0].college,
          major:res.data[0].major
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

  regionChange:function(e){
    this.setData({region:e.detail.value.join(' - ')});
  },
  collegeChange:function(e){
    console.log(e);
    this.setData({
      college:this.data.colleges[e.detail.value]
    })
  },
  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  phoneNumInput:function(e){
    this.setData({
      phoneNum:parseInt(e.detail.value)
    })
  },
  majorInput:function(e){
    this.setData({
      major:e.detail.value
    })
  },
  addressInput:function(e){
    this.setData({
      address:e.detail.value
    })
  },
  regBtn:function(){
    var that = this
    wx.showModal({
      cancelColor: 'cancelColor',
      title:'是否确认修改',
      success:function(res){
        if(res.confirm){
          db.collection('Student').where({userId:app.globalData.userId}).update({
            data:{
              name:that.data.name,
              phoneNum:that.data.phoneNum,
              region:that.data.region,
              address:that.data.address,
              college:that.data.college,
              major:that.data.major
            },success:function(res){
              wx.switchTab({
                url: '../my',
              })
            }
          })
        }
      }
    })
  }
})