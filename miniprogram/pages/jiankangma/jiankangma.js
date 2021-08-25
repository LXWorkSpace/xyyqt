// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    name:'李翔',
    id:'22020210045',
    college:'管理工程学院'
  },
  nameInput(e) {
    this.setData({
      name:e.detail.value
    })
  },
  idInput(e) {
    this.setData({
      id:e.detail.value
    })
  },
  collegeInput(e) {
    this.setData({
      college:e.detail.value
    })
  },
  saiourukou(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      complete: function (res) {
        wx.navigateTo({
          url: './detail/detail?name=' + that.data.name + '&id=' + that.data.id + '&college=' + that.data.college + '&location=赛欧（入口）',
        })
      },
    })
  },
  saiouchukou(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      complete: function (res) {
        wx.navigateTo({
          url: './detail/detail?name=' + that.data.name + '&id=' + that.data.id + '&college=' + that.data.college + '&location=赛欧（出口）',
        })
      },
    })
  },
  beimenrukou(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      complete: function (res) {
        wx.navigateTo({
          url: './detail/detail?name=' + that.data.name + '&id=' + that.data.id + '&college=' + that.data.college + '&location=北门（入口）',
        })
      },
    })
  },
  beimenchukou(){
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      complete: function (res) {
        wx.navigateTo({
          url: './detail/detail?name=' + that.data.name + '&id=' + that.data.id + '&college=' + that.data.college + '&location=北门（出口）',
        })
      },
    })
  }
})
