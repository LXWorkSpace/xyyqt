// miniprogram/pages/index/index.js
var menus  = require('../../utils/tarBar');
var format  = require('../../utils/util');
import * as echarts from '../../ec-canvas/echarts';
import geoJson from './mapData.js';


wx.cloud.init({
  env:'cloud1-4g9qg03576050163'
})



const db = wx.cloud.database({
  env:'cloud1-4g9qg03576050163'
})

const app = getApp();

var provinces = [];
var provincesData = [];


Page({

  /**
   * 页面的初始数据-
   */
  data: {
    swiperImg:[
      {src:'../../images/lunbotu1.png'},
      {src:'../../images/lunbotu2.png'}
    ],
    ec: {
      lazyLoad:true
    },
    isshow:false,
    userType:app.globalData.userType
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.echartsComponnet = this.selectComponent('#mychart-dom-map');
    this.getNews();
    this.getInfo();

  
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

    this.setData({
      userType:app.globalData.userType,
      vindex:app.globalData.vindex,
      isBindId:app.globalData.isBindId,
      isyuyue:app.globalData.isyuyue
    })
    if(this.data.userType == '学号'){
      that.setData({
        menus: menus.student
      })
    } else{
      that.setData({
        menus: menus.teacher
      })
    }

    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
    this.getTabBar().setData({
      list: this.data.menus.index,
      selected: 0
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
  onPullDownRefresh(){

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

  getInfo:function(){
    var that = this
    wx.request({
      url: 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5&t='+ Date.now(),
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        const china_data=JSON.parse(res.data.data);
        provinces = china_data.areaTree[0].children
        provincesData = provinces.map(item => {
          return {
            name: item.name,
            value: item.total.nowConfirm
          }
        })
        that.setData({
          desc:china_data.chinaTotal,
          add:china_data.chinaAdd,
          time:china_data.lastUpdateTime,
          areaTree:china_data.areaTree[0].children
        })
        that.initChart()
       
      }
    })
  },

  getNews:function(){
    var that = this;
    
    wx.request({
      url: 'https://api.tianapi.com/txapi/ncov/index?key=04a7e916dda694f39cb00833fcf96360', 
      success: function (res) {
        if(res.data.code == 200){
          that.setData({
            newsList: res.data.newslist[0].news,
          })      
        }
      }
      
    })
  
  },
  


  newsClick:function(e){
    wx.navigateTo({
      url: '../index/more/detail/detail?index='+e.currentTarget.dataset.index,
    })
  },
  arrow:function(res){
    if(this.data.isshow){
      this.setData({
        isshow:false
      })
      this.onShow
    }else{
      this.setData({
        isshow:true
      })
      this.onShow
    }
  },
  yuyue:function(res){
    db.collection('Student').where({userId:app.globalData.userId}).update({
      data:{
        vaccine:{isyuyue:1,time:format.formatTime(new Date)},
        
      },success(res){
        app.globalData.isyuyue = 1
        wx.navigateTo({
          url: '../qiandao/qdsuccess/qdsuccess?index='+3,
        })
      }
    })
  },
  initChart:function(){
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      const Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(Chart);
      echarts.registerMap('china', geoJson);
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption:function(){
    var option = {
      tooltip: {
        trigger: 'item',
        backgroundColor: "#FFF",
        padding: [
          10, // 上
          15, // 右
          8, // 下
          15, // 左
        ],
        extraCssText: 'box-shadow: 5px 5px 10px rgba(21, 126, 245, 0.35);',
        textStyle: {
          fontFamily: "'Microsoft YaHei', Arial, 'Avenir', Helvetica, sans-serif",
          color: '#005dff',
          fontSize: 12,
        },
        formatter: (`{b}\n现有确诊： {c}`)
      },
  
      visualMap: {
        show: true,
        type: "piecewise",
        left: 10,
        bottom: "0",
        align: "left",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          fontSize: 10
        },
        pieces: [
          { min: 1000, label: '1000人以上', color: '#ED514E' },
          { min: 100, max: 999, label: '100-999人', color: '#FF8F66' },
          { min: 10, max: 99, label: '10-99人', color: '#FFB769' },
          { min: 1, max: 9, label: '1-9人', color: '#FFE6BD' },
          { min:0,max: 0, label: '0人', color: '#E2EBF4' }
        ]
      },
      series: [{
        type: 'map',
        mapType: 'china',
        label: {
          show: true,
          fontSize: 8
        },
        itemStyle: {
          normal: {
            borderColor: '#fff',
            areaColor: '#E2EBF4',
            borderWidth: 1.5
          },
          emphasis: {
            areaColor: '#FFE766',
            borderWidth: 1.5,
            borderColor:'#fff'
          }
        },
        animation: false,
        data: provincesData,
      }]
    };
    return option
  },
  jiankangma:function(){
    wx.navigateTo({
      url: '../jiankangma/jiankangma',
    })
  }

})
  
