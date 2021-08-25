// miniprogram/pages/qiandao/qiandao.js
var menus  = require('../../utils/tarBar');
var format  = require('../../utils/util');
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
    islocation:false,
    isgooutBtn:false,
    isTemBtn:false,
    isAcheBtn:false,
    isAreaBtn:false,
    region:['北京市','北京市','丰台区'].join(' - '),
    godates:format.formatDates(new Date),
    gotimes:format.formatTimes(new Date),
    returndates:format.formatDates(new Date),
    returntimes:format.formatTimes(new Date),
    detailLocation:'',
    isBindId:app.globalData.isBindId,
    isdisabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userType == '学号'){
      this.setData({
        menus: menus.student
      })
    } else{
      this.setData({
        menus: menus.teacher
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
    var that = this
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      this.getTabBar().setData({
        list: this.data.menus.index,
        selected: 2
      })
    }
    this.setData({
      isBindId:app.globalData.isBindId,
      islocation:false,
      isgooutBtn:false
    })


    if(this.data.isBindId){
      db.collection('Student').where({userId:app.globalData.userId}).get({
        success(res){
          let isgoout = res.data[0].goout.isgoout;
          that.setData({
            isqiandao:res.data[0].qiandao.isqiandao,
            isgoout:res.data[0].goout.isgoout
          })
          if(isgoout != 0){
            that.setData({
              isdisabled:true
            })
          }else{
            that.setData({
              isdisabled:false
            })
          }
      
        }
      })
    }else{
      this.setData({
        isqiandao:false,
        isdisabled:true,
        isgooutBtn:false,
        isTemBtn:false,
        isAcheBtn:false,
        isAreaBtn:false
      })
      wx.showModal({
        title:'请先绑定学号',
        content:'请跳转至绑定页面',
        cancelColor:  'cancelColor',
        confirmText:'跳转',
        success:function(res){
          if(res.confirm){
            wx.switchTab({
              url: '../my/my',
            })
          }
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
  getLocation:function(){
    let that = this
    wx.getLocation({
      altitude: false,
      success:function(res){
        const latitude = res.latitude
        const longitude = res.longitude
        that.getDistrict(latitude,longitude)
      }
    })
  },
  getDistrict:function(latitude,longitude){
    let that = this
    let keys='5WBBZ-CHU3X-7BS4Y-TRTCO-DOUQS-2CBLN'
    
    wx.showLoading({
      title: '获取位置中',
    })
    
    setTimeout(function () {
      wx.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${keys}`,
        header:{
          'Content-Type':'application/json'
        },
        success:function(res){
          let location=res.data.result.address_component
          console.log(location);
          that.setData({
            islocation:true,
            province:location.province,
            city:location.city,
            district:location.district
          })
        }
      })
      wx.hideLoading()
    }, 2000)

  },
  regionChange:function(e){
    this.setData({region:e.detail.value.join(' - ')});
    },


      //  点击时间组件确定事件
  goTimeChange: function (e) {
    this.setData({
      gotimes: e.detail.value,
      returntimes: e.detail.value
    })
  },
  //  点击日期组件确定事件
  goDateChange: function (e) {
    this.setData({
      godates: e.detail.value,
      returndates: e.detail.value
    })
  },
  returnTimeChange: function (e) {
    this.setData({
      returntimes: e.detail.value
    })
  },
  //  点击日期组件确定事件
  returnDateChange: function (e) {
    this.setData({
      returndates: e.detail.value
    })
  },
  goout:function(e){
    if(e.detail.value){
      this.setData({
        isgooutBtn:true
      })
    }else{
      this.setData({
        isgooutBtn:false
      })
    }
  },
  tem:function(e){
    if(e.detail.value){
      this.setData({
        isTemBtn:true
      })
    }else{
      this.setData({
        isTemBtn:false
      })
    }
  },
  ache:function(e){
    if(e.detail.value){
      this.setData({
        isAcheBtn:true
      })
    }else{
      this.setData({
        isAcheBtn:false
      })
    }
  },
  area:function(e){
    if(e.detail.value){
      this.setData({
        isAreaBtn:true
      })
    }else{
      this.setData({
        isAreaBtn:false
      })
    }
  },

  submit:function(){
    if (!this.data.islocation) {
      wx.showToast({
        icon:'error',
        title: '请获取当前位置',
        duration:2000
      })
    }else if (!this.data.isgooutBtn) {
      app.globalData.isqiandao = true
      db.collection('Student').where({userId:app.globalData.userId}).update({
        data:{
          qiandao:{isqiandao:true, isovertem:this.data.isTemBtn,isache:this.data.isAcheBtn,isarea:this.data.isAreaBtn,Location:{province:this.data.province,city:this.data.city,district:this.data.district},time:format.formatTime(new Date),date:format.formatDates(new Date)}
        }
      })
      wx.navigateTo({
        url: '../qiandao/qdsuccess/qdsuccess?index='+0,
      })
    }else if(this.data.isgooutBtn){
      if(this.data.detailLocation == ''){
        wx.showToast({
          icon:'error',
          title: '请补全出校信息',
          duration:2000
        })
      }else{
        app.globalData.isqiandao = true
        app.globalData.isgoout = 1
        db.collection('Student').where({userId:app.globalData.userId}).update({
          data:{
            goout : {isgoout:1,gooutLocation:this.data.region,gooutDetailLocation:this.data.detailLocation,godates:this.data.godates,gotimes:this.data.gotimes,returndates:this.data.returndates,returntimes:this.data.returntimes,time:format.formatTime(new Date),date:format.formatDates(new Date),reason:this.data.reason},
            qiandao:{isqiandao:true, isovertem:this.data.isTemBtn,isache:this.data.isAcheBtn,isarea:this.data.isAreaBtn,Location:{province:this.data.province,city:this.data.city,district:this.data.district},time:format.formatTime(new Date),date:format.formatDates(new Date)}
          }
        })
        wx.navigateTo({
          url: '../qiandao/qdsuccess/qdsuccess?index='+2,
        })
      }
    }

  },
submit2:function(res){
  if(!this.data.isgooutBtn || this.data.detailLocation == ''){
    wx.showToast({
      icon:'error',
      title: '请补全出校信息',
      duration:2000
    })
  }else{
    app.globalData.isgoout = 1
    db.collection('Student').where({userId:app.globalData.userId}).update({
      data:{
        goout : {isgoout:1,gooutLocation:this.data.region,gooutDetailLocation:this.data.detailLocation,godates:this.data.godates,gotimes:this.data.gotimes,returndates:this.data.returndates,returntimes:this.data.returntimes,time:format.formatTime(new Date),date:format.formatDates(new Date),reason:this.data.reason},
      }
    })
    wx.navigateTo({
      url: '../qiandao/qdsuccess/qdsuccess?index='+1,
    })
  }
},


  detailLocation:function(res){
    console.log(res);
    this.setData({
      detailLocation:res.detail.value
    })
  },
  reason:function(res){
    console.log(res);
    this.setData({
      reason:res.detail.value
    })
  }
})