var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util.js');
var network_util = require('../../utils/network_util.js');
var json_util = require('../../utils/json_util.js');
var md5 = require('../../utils/md5.js');
var util = require('../../utils/util.js');

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "index",
  /**
   * 页面的初始数据
   */

  data: {
    
    homeurl:"https://dxc.gqwlcm.com/"
    ,unionid:''
    ,openid:''
    ,is_unionid:false
    
    ,slider: []
    ,sort:[]
    ,page:[]
    ,limited:[]
    , goods: []
    , school: []
    ,school_name:""
    ,index:0


    ,currentTab: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {

    var that = this;

    //将首页网址缓存
    wx.setStorageSync('homeurl',that.data.homeurl);

    wx.getStorage({
      key: 'unionid',
      success (res) {
        that.setData({unionid:res.data});
      }
    });

    if(that.data.unionid == ''){
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: that.data.homeurl+"/api/wechat_base/GetUnionId",
              data: {code:res.code},
              method: 'POST',
              success:function(result){
                if(result.data.code == 1){
                  console.log(result.data.openid);
                  that.setData({unionid:result.data.unionid});
                  that.setData({openid:result.data.openid});
                  wx.setStorageSync('unionid',result.data.unionid);

                  console.log(that.data.openid);
                  wx.request({
                    url: that.data.homeurl+"/api/user/FindUser",
                    data:{unionid:result.data.unionid,wxid:result.data.openid},
                    success:function(ress){
                      if(ress.data == 1){
                        that.setData({is_unionid:true});
                      }else{
                        that.setData({is_unionid:false});
                      }
                    },
                  });
                }else{
                  wx.showToast({
                    title: '授权登陆失败！请刷新重试',
                    icon: 'none',
                    duration: 2000,
                    complete:function(){
                      wx.switchTab({
                        url: '/pages/index/index'
                      })
                    }
                  });
                }
              }
            });
            //发起网络请求
            // wx.request({
            //   url: 'https://api.weixin.qq.com/sns/jscode2session',
            //   data: {
            //     appid:'wxf24c79e7f9eb5a96',
            //     secret:'3ba543b6783c16958d95f0c441df0a05',
            //     js_code: res.code,
            //     grant_type:'authorization_code',
            //   },success:function(result){
            //     if(result.statusCode == 200){
            //       console.log(result);
            //       that.setData({unionid:result.data.unionid});
            //       that.setData({openid:result.data.openid});
            //       wx.setStorageSync('unionid',result.data.unionid);
            //       wx.request({
            //         url: that.data.homeurl+"/api/user/FindUser",
            //         data:{unionid:result.data.unionid,wxid:result.data.openid},
            //         success:function(ress){
            //           if(ress.data == 1){
            //             that.setData({is_unionid:true});
            //           }else{
            //             that.setData({is_unionid:false});
            //           }
            //         },
            //       });
            //     }else{
            //       wx.showToast({
            //         title: '授权登陆失败！请刷新重试',
            //         icon: 'none',
            //         duration: 2000,
            //         complete:function(){
            //           wx.switchTab({
            //             url: '/pages/index/index'
            //           })
            //         }
            //       });
            //     }
            //   }
            // })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

    var that = this;

    setTimeout(function () {
      that.GetLimitedList();
      that.GetGoodsList();
    },1000);

    wx.request({
      url: that.data.homeurl+"/api/rotate/getrotatelist",
      data:{},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
          that.setData({slider:res.data.rotate});
      },
    });

    wx.request({
      url: that.data.homeurl+"/api/sort/GetSortList",
      data:{sorting:true},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
          that.setData({sort:res.data.sort});
          that.setData({page:res.data.page});
      },
    });

    wx.request({
      url: that.data.homeurl + "/api/school/GetSchoolList",
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ school: res.data.school });
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
  
  tap_495514ce:function(e){
  },
  
  tap_562a4121:function(e){
  },
  
  tap_c1320a8c:function(e){
  },
  
  tap_a4e499a9:function(e){
  },
  
  tap_346da9a9:function(e){
  },
  
  tap_968bca16:function(e){
  },
  AddCar:function(e){

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/user/JoinCar",
      data:{
        unionid:that.data.unionid,
        goods:e.currentTarget.dataset.id,
        is_offer:e.currentTarget.dataset.offer,
        number:1
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

  // 选择校区
  bindPickerChange: function (e) {
    var that = this;
    var school_id = this.data.school[e.detail.value].school_id;
    var schoolName = this.data.school[e.detail.value].school_name;

    that.setData({ school_name: schoolName });
    that.setData({ index: e.detail.value });

    wx.request({
      url: that.data.homeurl + "/api/goods/GetGoodsList",
      data: {
        unionid: that.data.unionid,
        keyword: '',
        sort: 0,
        is_top: true,
        page: 1,
        limit: 4,
        school: school_id
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({ goods: res.data.goods });
      },
    });
    
  },

  //搜索
  search:function(e){
    wx.navigateTo({
      url: "/pages/goods/goodslist/goodslist?keyword="+e.detail.value,
    });
  },

  // 点击授权按钮，返回的信息
  bindGetUserInfo: function(e) {

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/user/CreateUser",
      data:{
        data:e.detail.userInfo,
        openid:that.data.openid,
        unionid:that.data.unionid
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        that.setData({is_unionid:true});
        that.GetLimitedList();
        that.GetGoodsList();
      },
    });
  },


  GetLimitedList:function(){

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/limited/GetLimitedList",
      data:{
        unionid:that.data.unionid,
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
          that.setData({limited:res.data.limited});
      },
    });
  },


  GetUserInfo:function(){
    wx.getUserInfo({
      withCredentials:false,
      success:(obj)=>{
          wx.request({
              url: openIdUrl,
              data: {
                  code: data.code,
                  encryptedData : obj.encryptedData,
                  iv : obj.iv,
              },
              success: function(res) {
                  self.globalData.openid = res.data.openid
              },
              fail: function(res) {
                  console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              }
          })
      }
    })
  },


  GetGoodsList:function(){

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/goods/GetGoodsList",
      data:{
        unionid:that.data.unionid,
        keyword:'',
        sort:0,
        is_top:true,
        page:1,
        limit:4,
        school:0
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        that.setData({goods:res.data.goods});
      },
    });
  },


  click: function (e) {
    wx.showToast({
      title: '第' + e.currentTarget.dataset.id + '栏' + '第' + e.currentTarget.dataset.index + '个',
      icon: 'success',
      duration: 1500
    })
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {
    console.log(e.detail.current)
    this.setData({ currentTab: e.detail.current });
  },

})