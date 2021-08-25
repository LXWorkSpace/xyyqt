Component({
  data: {
    selected: 0,
    color: "#8a8a8a",
    selectedColor: "#47D1AF",
 
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
    //  this.setData({
    //    selected: data.index
    //  })
    }
  }
})