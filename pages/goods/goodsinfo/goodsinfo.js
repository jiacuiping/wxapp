

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page6",
  /**
   * 页面的初始数据
   */

  data: {
    
    //base
    homeurl:''
    ,unionid:''
  
    ,goods_id:0
    ,number:1

    ,goods:[]
    ,evals:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (parameter) {

    var that = this;

    //var WxParse = require('../../../utils/wxParse/wxParse.js');


    //console.log(WxParse);
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

    if(parameter.goods_id)
      that.setData({goods_id:parameter.goods_id});

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

    //var WxParse = require('../../../utils/wxParse/wxParse.js');

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/goods/GetGoodsInfo",
      data:{goods_id:that.data.goods_id},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1)
          that.setData({goods:res.data.goods});
        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */
        //WxParse.wxParse('goods_info', 'html', that.data.goods.goods_info, that, 5);
      },
    });

    wx.request({
      url: that.data.homeurl+"/api/Evaluate/GetEvaluateList",
      data:{goods_id:that.data.goods_id},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1)
          that.setData({evals:res.data.Evaluate});
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
  
  tap_f1eb6dea:function(e){
  },
  
  tap_e9f362b9:function(e){
  },
  
  tap_c1320a8c:function(e){
  },
  
  tap_a4e499a9:function(e){
  },
  
  tap_968bca16:function(e){
  },
  
  tap_29da5ab3:function(e){
  },

  GoCar:function(e){
    wx.navigateTo({
      url: '/pages/user/car/car'
    });
  },

  AddCar:function(e){

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/user/JoinCar",
      data:{
        unionid:that.data.unionid,
        goods:that.data.goods.goods_id,
        is_offer:that.data.goods.is_offer,
        number:that.data.number
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          wx.showModal({
            title: '提示',
            content: '加入购物车成功！',
            confirmText:'前往结算',
            cancelText:'继续逛逛',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/user/car/car'
                })
              }
            }
          });
        }
      },
    });
  },

  CreateOrder:function(e){
    var that = this;
    wx.request({
      url: that.data.homeurl+"/api/user/BuyNow",
      data:{
        unionid:that.data.unionid,
        goods_id:that.data.goods.goods_id,
        is_offer:that.data.goods.is_offer,
        number:that.data.number
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          wx.navigateTo({
            url: "/pages/order/createorder/createorder?order_sn="+res.data.order_sn,
          });
        }else{
          if(res.data.msg == "您还没有设置默认收货地址"){
            wx.showModal({
              title: '提示',
              showCancel:false,
              confirmText:'前往添加',
              content: "您还没有设置默认收货地址",
              success: function (res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '/pages/user/addaddress/addaddress',
                  });
                }
              }
            })
          }else{
            wx.showModal({
              title: '提示',
              content: res.data.msg,
              showCancel:false,
            });
          }
        }
      },
    });
  },

  ChangeNumber:function(e){

    var that = this;

    if(e.currentTarget.dataset.type == 'dec')
      if(that.data.number == 1){
        wx.showModal({
          title: '提示',
          content: '件数最少为1',
          showCancel:false,
        });
      }else
        that.setData({number:that.data.number-1});
    else
      that.setData({number:that.data.number+1});
  },


})