

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page13",
  /**
   * 页面的初始数据
   */

  data: {
    
    homeurl:""
    ,unionid:''
    ,order:[]
    ,order_id:0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (parameter) {

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

    if(parameter.order_id)
      that.setData({order_id:parameter.order_id});

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/order/GetOrderInfo",
      data:{
        order_id:that.data.order_id,
        unionid:that.data.unionid,
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          that.setData({order:res.data.data});
        }
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
  
  tap_29da5ab3:function(e){
  },
  
  //去支付
  GoPay:function(e){
    wx.navigateTo({
      url: "/pages/order/createorder/createorder?order_sn="+this.data.order.order_sn,
    });
  },

  //前往评价
  GoEval:function(e){

    wx.redirectTo({
      url: '/pages/order/evaluate/evaluate',
    });

  },


  //确认收货
  Status:function(e){

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/order/ConfirmReceipt",
      data:{order_id:e.currentTarget.dataset.order},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        wx.showModal({
          title: '提示',
          showCancel:false,
          content: res.data.msg,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: "/pages/order/info/info?order_id="+e.currentTarget.dataset.order,
              });
            }
          }
        })
      },
    });
  },
})