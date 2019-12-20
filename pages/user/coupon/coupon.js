

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page7",
  /**
   * 页面的初始数据
   */

  data: {
    
    homeurl:''
    ,unionid:''
    
    ,coupon:[]
  
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
      url: that.data.homeurl+"/api/user/GetUserCoupon",
      data:{param:that.data.unionid},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        console.log(res);
        that.setData({coupon:res.data.coupon});
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
  
  tap_3cfb9167:function(e){
  },
  
  tap_2e682e71:function(e){
  },
  
  tap_fa15a6ba:function(e){
  },
  
  tap_73d83197:function(e){
  },
  
  tap_52acac38:function(e){
  },
  
  tap_29da5ab3:function(e){
  },
  GoGoods:function(e){
    wx.navigateTo({
      url: "/pages/goods/goodslist/goodslist",
    });
  }
})