// miniprogram/pages/static/static.js
import * as echarts from '../../ec-canvas/echarts';
wx.cloud.init({
  env:'cloud1-4g9qg03576050163'
})
const db = wx.cloud.database({
  env:'cloud1-4g9qg03576050163'
})
var menus  = require('../../utils/tarBar');
const app = getApp()
var data = []
var vaccines = [0,0,0]


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec1: {
      lazyLoad: true
    },
    ec2: {
      lazyLoad: true
    },
    isshow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.echartsComponnet1 = this.selectComponent('#mychart-dom-pie');
    this.echartsComponnet2 = this.selectComponent('#mychart-dom-bar');
    this.getData();

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
    if(app.globalData.userType == '学号'){
      this.setData({
        menus: menus.student
      })
    } else{
      this.setData({
        menus: menus.teacher
      })
    }

    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      this.getTabBar().setData({
        list: this.data.menus.index,
        selected: 2
      })
    }

    this.getData()

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
  getData:function(){
    var that = this
    db.collection('Student').get({
      success:function(res){
        let list = res.data
        var qiandao = 0
        var isovertem = 0
        var ache = 0
        var area = 0
        var vindex2 = 0
        var vindex1 = 0
        var vindex0 = 0
        var goout = 0
        var notInBeijing = 0

        that.setData({
          person:res.data.length,
          list:list
        })
        
        list.forEach(element => {
          if(element.qiandao.isqiandao){
            qiandao++
          }
          if(element.qiandao.isovertem){
            isovertem++
          }
          if(element.qiandao.isache){
            ache++
          }
          if(element.qiandao.isarea){
            area++
          }
          if(element.vaccine.vindex == 1){
            vindex0++
          }
          if(element.vaccine.vindex == 2){
            vindex1++
          }
          if(element.vaccine.vindex == 3){
            vindex2++
          }
          if(element.goout.isgoout != 0){
            goout++
          }
          if(element.qiandao.isqiandao && element.qiandao.Location.province != '北京市'){
            notInBeijing++
          }
        });
        that.setData({
          qiandao:qiandao,
          isovertem:isovertem,
          ache:ache,
          area:area,
          vindex0:vindex0,
          vindex1:vindex1,
          vindex2:vindex2,
          notInBeijing:notInBeijing

        })
        console.log(qiandao);
        vaccines=[{value:vindex0,name:'未接种'},{value:vindex1,name:'已接种一针'},{value:vindex2,name:'已完成接种'}]
        data=[qiandao,isovertem,ache,area,notInBeijing]
        that.initChart1()
        that.initChart2()
      }
    })

  },
  initChart2: function () {
    this.echartsComponnet2.init((canvas, width, height) => {
      // 初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      chart.setOption(this.getOption2());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  getOption2: function () {
    //时间显示范围
    var option = {
      grid: {
        left: '20',
        right: '30',
        bottom: '50',
        top: '50',
        containLabel: true
    },
      xAxis: {
          type: 'value',
          minInterval: 1
          
      },
      yAxis: {
          type: 'category',
          data: ['签到人数', '发热人数', '咽痛、呼吸困难人数','位于高风险区人数','离京人数']
      },
      series: [{
          barWidth: 20,
          data: data,
          type: 'bar'
      }]
  };
    return option;
  },
 
  initChart1: function () {
    this.echartsComponnet1.init((canvas, width, height) => {
      // 初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      chart.setOption(this.getOption1());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  getOption1: function () {
    //时间显示范围
    var option = {
      tooltip: {
          trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        x:'center',  
        y:'bottom',  
        padding:[0,0,60,0]
      },

      series: [
          {
              type: 'pie',
              radius: ['40%', '70%'],
              center: ["50%", "30%"],
              avoidLabelOverlap: false,
              itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
              },
              label: {
                  show: false,
                  position: 'center',

              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '20',
                      fontWeight: 'bold'
                  }
              },
              labelLine: {
                  show: false
              },
              data: vaccines
          }
      ]
  };
    return option;
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
 
})