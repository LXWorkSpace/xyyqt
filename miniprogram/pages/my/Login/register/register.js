// miniprogram/pages/my/Login/register/register.js
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
    colleges: ['---选择学院---','管理工程学院', '城市经济与公共管理学院', '工商管理学院', '经济学院', '会计学院', '劳动经济学院', '文化与传播学院', '财政税务学院', '法学院', '金融学院', '统计学院', '外国语学院 ', '华侨学院', '马克思主义学院', '国际经济管理学院', '国际学院'],
    vaccines:['---选择疫苗情况---','未接种','已接种第一针','已接种第二针'],
    region:'---选择住址区域---',
    cindex:0,
    vindex:0,
    userId:NaN,
    passWord:'',
    DepassWord:'',
    name:'',
    phoneNum:NaN,
    major:'',
    address:'',
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
    this.setData({
      cindex:e.detail.value
    })
  },
  vaccineChange:function(e){
    this.setData({
      vindex:parseInt(e.detail.value)
    })
  },
  userIdInput:function(e){
    this.setData({
      userId:parseInt(e.detail.value)
    })

  },
  passWordInput:function(e){
    this.setData({
      passWord:e.detail.value
    })
  },
  DepassWordInput:function(e){
    this.setData({
      DepassWord:e.detail.value
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
    if(this.data.userId == NaN || this.data.passWord == '' || this.data.DepassWord == '' || this.data.name == '' || this.data.phoneNum == NaN || this.data.region == '---选择住址区域---' || this.data.address == '' || this.data.cindex == 0 || this.data.vindex == 0 || this.data.major == ''){
      wx.showToast({
        title: '信息输入不完整',
        icon:'error',
        duration:2000
      })
    }else if(this.data.userId.toString().length != 11){
      wx.showToast({
        title: '学号输入有误',
        icon:'error',
        duration:2000
      })

    }else if(this.data.passWord.length <6){
      wx.showToast({
        title: '密码需大于6位',
        icon:'error',
        duration:2000
      })
    }else if (this.data.passWord != this.data.DepassWord){
      wx.showToast({
        title: '两次密码不匹配',
        icon:'error',
        duration:2000
      })
    }else if(this.data.phoneNum.toString().length != 11){
      wx.showToast({
        title: '手机输入有误',
        icon:'error',
        duration:2000
      })
    }else{
      db.collection('Student').where({userId:that.data.userId}).get({
        success(res){
          if(res.data.length>0){
            wx.showToast({
              title: '学号已被注册',
              icon:'error',
              duration:2000
            })
          }else{
            wx.showModal({
              title:'请确保输入的信息无误',
              content:'是否确认注册',
              success:function(res){
                if(res.confirm){
                  db.collection("Student").add({
                    data:{
                      userId:that.data.userId,
                      passWord:that.data.passWord,
                      name:that.data.name,
                      phoneNum:that.data.phoneNum,
                      region:that.data.region,
                      address:that.data.address,
                      college:that.data.colleges[that.data.cindex],
                      major:that.data.major,
                      vaccine:{vindex : that.data.vindex,vaccine : that.data.vaccines[that.data.vindex],isyuyue:0,time:''},
                      qiandao:{isqiandao:false, isovertem:false,isache:false,isarea:false,Location:{province:'',city:'',district:''},time:'',date:''},
                      goout:{isgoout:0,gooutLocation:'',gooutDetailLocation:'',godates:'',gotimes:'',returndates:'',returntimes:'',time:'',reason:'',date:''}
                    },success:function(){
                      if(that.data.userId == 22020210048){
                        wx.showToast({
                          title: '我爱你',
                          icon:'success'
                        })
                        setTimeout(function () {
                          app.globalData.isBindId=true
                          app.globalData.userId = that.data.userId
                          app.globalData.vindex = that.data.vindex
                          app.globalData.qiandao = false
                          app.globalData.isgoout= 0
                          app.globalData.isyuyue = 0
                          wx.switchTab({
                            url: '../../my',
                          })
                         }, 1000)
                      }else{
                        wx.showToast({
                          title: '注册成功',
                          icon:'success'
                        })
                        setTimeout(function () {
                          app.globalData.isBindId = true
                          app.globalData.userId = that.data.userId
                          app.globalData.vindex = that.data.vindex
                          app.globalData.isqiandao = false
                          app.globalData.isgoout= 0
                          app.globalData.isyuyue = 0
                          wx.switchTab({
                            url: '../../my',
                          })
                         }, 1000)
                      }
                    
                    }
                  })
                }
              }
            })
          }
        }

      })

    }



  }

})