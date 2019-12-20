

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "renwu",
  /**
   * 页面的初始数据
   */
  data: {
    homeurl:""
    ,unionid:''
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
  
  tap_1c369bbb:function(e){
  },
  
  tap_155e5ca1:function(e){
  },
  
  tap_e2c9074c:function(e){
  },
  
  tap_a5f2c584:function(e){
  },
  
  tap_9421249a:function(e){
  },
  formSubmit: function(e) {

    console.log(e.detail.value);

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/Task/SubmitTask",
      data:{param:e.detail.value,unionid:that.data.unionid},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          that.paynow(res.data.order_sn);
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

  //支付任务
  paynow:function(order_sn){
    var that = this;
    wx.request({
      url: that.data.homeurl+"/api/Wechat_pay/PayNow",
      data:{order_sn:order_sn},
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
              that.changeorder(order_sn);
            },
            'fail':function(res){
              console.log(res);
              wx.showModal({
                title: '提示',
                content: '支付失败',
                showCancel:false,
                success:function(){
                  app.globalData.orderType = 'task';
                  app.globalData.statusType = 0;
                  wx.switchTab({
                    url: "/pages/order/order/order",
                  });
                },
              });
            }
          })
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

})