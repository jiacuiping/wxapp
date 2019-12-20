

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page11",
  /**
   * 页面的初始数据
   */

  data: {
    
    homeurl:"http://dxc.gqwlcm.com/"
    ,unionid:''
    ,order:[]
  
    ,orderType:'goods'
    ,statusType:'-1'



  },

  globalData:{
    orderType:'goods',
    statusType:'-1',
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

    //获取用户unionid
    wx.getStorage({
      key: 'unionid',
      success (res) {
        that.setData({unionid:res.data});
      }
    });

    if(app.globalData.orderType){
      that.setData({orderType:app.globalData.orderType});
      app.globalData.orderType = 'goods';
    }

    if(app.globalData.statusType){
      that.setData({statusType:app.globalData.statusType});
      app.globalData.statusType = '-1';
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

    this.Getdata();

    // var that = this;

    // wx.request({
    //   url: that.data.homeurl+"/api/order/GetOrderList",
    //   data:{
    //     unionid:that.data.unionid,
    //     type:that.data.orderType,
    //     status:that.data.statusType
    //   },
    //   method: 'POST',
    //   header: {
    //       'content-type': 'application/json'
    //   },
    //   success:function(res){
    //     if(res.data.code == 1){
    //       that.setData({order:res.data.order});
    //       console.log(that.data.order);
    //     }
    //   },
    // });


    // wx.request({
    //   url: that.data.homeurl+"/api/order/GetOrderList",
    //   data:{unionid:that.data.unionid},
    //   method: 'POST',
    //   header: {
    //       'content-type': 'application/json'
    //   },
    //   success:function(res){
    //     if(res.data.code == 1){

    //     }else{

    //     }
    //   },
    // });

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
  
  tap_ca22cdea:function(e){
  },
  
  tap_bd257ad8:function(e){
  },
  
  tap_1891a258:function(e){
  },
  
  tap_0be1f266:function(e){
  },
  
  tap_a050b30d:function(e){
  },
  
  clickTab:function(e){
    var that = this;
    if (this.data.orderType !== e.currentTarget.dataset.type) {
      that.setData({orderType: e.currentTarget.dataset.type})
    }

    wx.request({
      url: that.data.homeurl+"/api/order/GetOrderList",
      data:{
        unionid:that.data.unionid,
        type:e.currentTarget.dataset.type,
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          that.setData({order:res.data.order});
        }
      },
    });
  },  
  clickStatus:function(e){
    var that = this;

    if (this.data.statusType !== e.currentTarget.dataset.status)
      that.setData({statusType: e.currentTarget.dataset.status})

    wx.request({
      url: that.data.homeurl+"/api/order/GetOrderList",
      data:{
        unionid:that.data.unionid,
        type:e.currentTarget.dataset.type,
        status:e.currentTarget.dataset.status
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          that.setData({order:res.data.order});
        }
      },
    });
  },

  GoInfo:function(e){
    wx.navigateTo({
      url: "/pages/order/info/info?order_id="+e.currentTarget.dataset.id,
    });
  },

  cancelOrder:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要取消此订单吗？',
      confirmText:'确认取消',
      cancelText:'我再想想',
      success: function (res) {
        wx.request({
          url: that.data.homeurl+"/api/order/cancelOrder",
          data:{
            order_id:e.currentTarget.dataset.id,
          },
          method: 'POST',
          header: {
              'content-type': 'application/json'
          },
          success:function(res){
            if(res.data.code == 1)
              that.Getdata();
          },
        });
      }
    });
  },

  removeOrder:function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要删除此订单吗？',
      confirmText:'确认删除',
      cancelText:'我再想想',
      success: function (res) {
        wx.request({
          url: that.data.homeurl+"/api/order/cancelOrder",
          data:{
            order_id:e.currentTarget.dataset.id,
          },
          method: 'POST',
          header: {
              'content-type': 'application/json'
          },
          success:function(res){
            if(res.data.code == 1)
              that.Getdata();
          },
        });
      }
    });
  },
  ApplyRefund:function(e){
    wx.showModal({
      title: '提示',
      content: '申请退款需后台审核！',
      confirmText:'确认申请',
      cancelText:'我再想想',
      success: function (res) {
        wx.request({
          url: that.data.homeurl+"/api/order/cancelOrder",
          data:{
            unionid:that.data.unionid,
            order_id:e.currentTarget.dataset.id,
          },
          method: 'POST',
          header: {
              'content-type': 'application/json'
          },
          success:function(res){
            if(res.data.code == 1){
              this.setData({order:res.data.order});
            }
          },
        });
      }
    });
  },

  Getdata:function(e){
    var that = this;
    wx.request({
      url: that.data.homeurl+"/api/order/GetOrderList",
      data:{
        unionid:that.data.unionid,
        type:that.data.orderType,
        status:that.data.statusType
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          that.setData({order:res.data.order});
          console.log(that.data.order);
        }
      },
    });
  }

})