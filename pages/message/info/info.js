

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "xiaoxi",
  /**
   * 页面的初始数据
   */

  data: {
    homeurl:""
    ,unionid:''
    ,message_id:0
    ,messageinfo:[]
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

    if(parameter.message_id)
      that.setData({message_id:parameter.message_id});

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/message/GetMessageInfo",
      data:{message_id:that.data.message_id},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1){
          that.setData({messageinfo:res.data.data});
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
  
  tap_996d78a8:function(e){
  },
  
  tap_20fb7f6e:function(e){
  },
  
  tap_9af66870:function(e){
  },
  
  tap_f63c94ac:function(e){
  },
  
  tap_957361e4:function(e){
  },
  
  tap_34938622:function(e){
  },
  
  tap_bd77d780:function(e){
  },
  
  tap_2ead0f0f:function(e){
  },

  GoInfo:function(e){
  }
  
})