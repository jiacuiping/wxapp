

// 获取全局应用程序实例对象
const app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "page10",
  /**
   * 页面的初始数据
   */

  data: {

    //base
    homeurl:''
    ,unionid:''
  
    //wheres
    ,keyword:''
    ,sort:0
    ,is_top:false
    ,SortName:'complex'
    ,SortType:'desc'

    //lists
    ,goods:[]
    ,sorts:[]

    //弹出框
    ,animate: 'myfirst'
    ,RiOrDe: 'none'
    ,flag: true
    ,ModalBox:'rise'
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

    if(parameter.keyword)
      that.setData({keyword:parameter.keyword});

    if(parameter.sort)
      that.setData({sort:parameter.sort});

    if(parameter.is_top)
      that.setData({is_top:parameter.is_top});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

    var that = this;

    wx.request({
      url: that.data.homeurl+"/api/goods/GetGoodsList",
      data:{
        unionid:that.data.unionid,
        keyword:that.data.keyword,
        sort:that.data.sort,
        is_top:that.data.is_top,
        ordername:that.data.SortName,
        ordertype:that.data.SortType,
        page:1,
        limit:10000
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1)
          that.setData({goods:res.data.goods});
      },
    });

    wx.request({
      url: that.data.homeurl+"/api/Sort/GetSortList",
      data:{},
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1)
          that.setData({sorts:res.data.sort});
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
  
  tap_4528f800:function(e){
  },
  
  tap_968bca16:function(e){
  },
  
  tap_a4e499a9:function(e){
  },
  
  tap_c1320a8c:function(e){
  },
  SelectSort:function () {
    this.setData({RiOrDe: 'block'})
    this.setData({ModalBox: 'rise'})
    this.setData({flag: false})
  },
  laqi: function () {
    this.setData({ModalBox: 'decline'})
    this.setData({flag: true})
  },

  filter:function(e){
    this.setData({sort:e.currentTarget.dataset.sort});
    this.GetData();
    this.laqi();
  },

  Changeorder:function(e){

    var value = e.currentTarget.dataset.value
    var type = e.currentTarget.dataset.type

    if(this.data.SortName == value){
      this.setData({SortType:type == 'desc' ? 'asc' : 'desc'});
    }else{
      this.setData({SortName:value});
    }
    this.GetData();
  },


  GetData:function(){
    var that = this;
    that.setData({goods:[]});
    wx.request({
      url: that.data.homeurl+"/api/goods/GetGoodsList",
      data:{
        unionid:that.data.unionid,
        keyword:that.data.keyword,
        sort:that.data.sort,
        is_top:that.data.is_top,
        ordername:that.data.SortName,
        ordertype:that.data.SortType,
        page:1,
        limit:10000
      },
      method: 'POST',
      header: {
          'content-type': 'application/json'
      },
      success:function(res){
        if(res.data.code == 1)
          that.setData({goods:res.data.goods});
      },
    });
  },

  //搜索
  search:function(e){
    var that = this;
    that.setData({keyword:e.detail.value});
    that.GetData();
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
})