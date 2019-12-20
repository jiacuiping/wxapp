

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page14",
  /**
   * 页面的初始数据
   */

  data: {

    homeurl:""
    ,unionid:''
    
    ,order_sn:''
    ,info:[]
    ,number:0
    ,freight:0
    ,address:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (param) {

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

    if(param.order_sn)
      that.setData({order_sn:param.order_sn});

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

    var that = this;

    //订单信息
    wx.request({
      url: that.data.homeurl+"/api/order/GoSettlement",
      data:{order_sn:that.data.order_sn},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        that.setData({info:res.data.info});
        that.setData({number:res.data.number});
        that.setData({freight:res.data.freight});
        that.setData({address:res.data.address});
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
  GoPay:function(e){

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/Wechat_pay/PayNow",
      data:{order_sn:that.data.order_sn},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success':function(res){
              that.changeorder(that.data.order_sn);
            },
            'fail':function(res){
              wx.showModal({
                title: '提示',
                content: '支付失败',
                showCancel:false,
              });
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel:false,
          });
        }
      },
    });
  },

  changeorder:function(order_sn){
    var that = this;
    wx.request({
      url: that.data.homeurl+"/api/Wechat_pay/CallBack",
      data:{order_sn:order_sn},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        wx.redirectTo({
          url: "/pages/order/info/info?order_id="+res.data,
        });
      },
    });
  }
});