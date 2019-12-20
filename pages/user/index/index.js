

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "wode",
  /**
   * 页面的初始数据
   */

  data: {
    
    homeurl:''
    ,unionid:''
    
    ,user:[]

  },
  globalData:{
    orderType:'goods',
    statusType:'-1',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {

    var that = this;

    //获取首页网址
    wx.getStorage({
      key: 'homeurl',
      success (res) {
        that.setData({homeurl:res.data});
      }
    });

    //获取用户token
    wx.getStorage({
      key: 'unionid',
      success (res) {
        that.setData({unionid:res.data});
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

    var that = this;

    //用户信息
    wx.request({
      url: that.data.homeurl+"/api/user/GetUserInfo",
      data:{param:that.data.unionid},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        that.setData({user:res.data.user});
      },
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  
  tap_2935270e:function(e){
  },
  
  tap_3cfb9167:function(e){
  },
  
  tap_2e682e71:function(e){
  },
  
  tap_0eeb4e6e:function(e){
  },
  
  tap_9e09150c:function(e){
  },
  
  tap_fa15a6ba:function(e){
  },
  
  tap_56f83221:function(e){
  },
  
  tap_73d83197:function(e){
  },
  
  tap_441ea3d5:function(e){
  },
  
  tap_24b6a232:function(e){
  },
  
  Jump:function(e){
    
    app.globalData.orderType = e.currentTarget.dataset.type;
    app.globalData.statusType = e.currentTarget.dataset.status;

    wx.switchTab({
      url: "/pages/order/order/order",
    });
  },

  JumpHref:function(e){

    var url = e.currentTarget.dataset.url

    wx.navigateTo({
      url: "/pages/user/"+url,
    });
  }
})

