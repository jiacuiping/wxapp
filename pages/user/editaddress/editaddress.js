

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page5",
  /**
   * 页面的初始数据
   */

  data: {
    
    homeurl:''
    ,unionid:''
    ,address:''
    ,address_school:0
    ,address_schoolText:''
    ,address_id:0
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

    that.setData({address_id:param.address_id});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

    var that = this;

    //获取地址信息
    wx.request({
      url: that.data.homeurl+"/api/user/GetAddressInfo",
      data:{address_id:this.data.address_id},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        that.setData({address:res.data.address});
        that.setData({address_school:res.data.address.address_school});
      },
    });

    //获取学校信息
    wx.request({
      url: that.data.homeurl+"/api/user/GetSchoolByAddress",
      data:{address_id:this.data.address_id},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        console.log(res.data.school);
        that.setData({address_schoolText:res.data.school.school_name});
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
  
  tap_ce3cb451:function(e){
  },
  
  tap_1af9a8de:function(e){
  },
  
  tap_fa15a6ba:function(e){
  },
  
  tap_2e682e71:function(e){
  },
  
  tap_73d83197:function(e){
  },
  
  tap_29da5ab3:function(e){
  },
  formSubmit:function(e){
    wx.request({
      url: this.data.homeurl+"/api/user/UpdateAddress",
      data:{address_id:this.data.address_id,param:e.detail.value},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          wx.showToast({
            title: res.data.msg,
            icon: 'succes',
            duration: 1000,
            mask:true
          });
          setTimeout(function(){
            wx.navigateTo({
              url: "/pages/user/address/address",
            });
          },1000)
        }else{
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel:false,
          })
        }
      },
    });
  },
  DeleteAddress:function(e){

    var that = this;

    wx.showModal({
      title: '提示',
      content: '确定要删除该地址信息吗？',
      success:function(res){
        if (res.confirm) {
          wx.request({
            url: that.data.homeurl+"/api/user/DeleteAddress",
            data:{unionid:that.data.unionid,address_id:that.data.address_id},
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success:function(result){
              if(result.data.code == 1){
                wx.showToast({
                  title: result.data.msg,
                  icon: 'succes',
                  duration: 1000,
                  mask:true
                });
                setTimeout(function(){wx.navigateTo({url: "/pages/user/address/address",});},1000)
              }else{
                wx.showModal({
                  title: '提示',
                  content: result.data.msg,
                  showCancel:false,
                })
              }
            },
          });
        }
      }
    });
  }
})

