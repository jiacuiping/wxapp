

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page9",
  /**
   * 页面的初始数据
   */

  data: {

    homeurl:''
    ,unionid:''
  
    ,car:''
    ,freight:''
    ,countPrice:''
    ,countNumber:''
    ,is_all_checked:false
    , is_all_value: 0
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

    //获取用户unionid
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

    this.RequestData();

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

  ChangeGoods:function(e){

    var that = this;

    wx.request({
      url: this.data.homeurl+"/api/user/ChangeCar",
      data:{
        unionid:this.data.unionid,
        car_id:e.currentTarget.dataset.id,
        type:e.currentTarget.dataset.type,
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          that.RequestData();
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

  RequestData: function (is_all = 0, cars = ''){
    if (cars.length == 0) {
      cars = [0];
    }
    var that = this;
    wx.request({
      url: that.data.homeurl+"/api/user/GetCars",
      data: { unionid: that.data.unionid, is_all: is_all, cars: cars},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        that.setData({car:res.data.car});
        that.setData({freight:res.data.freight});
        that.setData({countPrice:res.data.countPrice});
        that.setData({countNumber:res.data.countNumber});
      },
    });
  },

  CreateOrder:function(e){
    wx.request({
      url: this.data.homeurl+"/api/user/CreateOrder",
      data:{unionid:this.data.unionid,cars:e.detail.value.checkbox},
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

  IsAll: function (e) {
    console.log(e.detail.value.length)
    var that = this;

    var check = e.detail.value.length;
    if (!check) { // 取消全选
      that.setData({ is_all_checked: false });
      that.setData({ is_all_value: 0 });
      that.RequestData();
    } else { // 全选

     
      that.setData({ is_all_checked: true });
      that.setData({ is_all_value: 1 });
      that.RequestData(1);
    }
  },

  checkboxChange: function (e) {
    // console.log(typeof (e.detail.value))
    var that = this;

    var carsObj = e.detail.value;


    that.RequestData(-1, carsObj);
  
  },
})