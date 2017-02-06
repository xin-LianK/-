Page({
  data:{
    // text:"这是一个页面"
    // title:''
  },
start:function(e){
  console.log(2)
this.setData({
  startPos:e.touches[0].pageX
})
},
move:function(e){
  console.log(1)
var x=e.touches[0].pageX;
if(x-this.data.startPos>100){

wx.navigateBack();
}
},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  //  wx.showNavigationBarLoading();
    console.log(options)
    var that=this;
    wx.request({
        url:'http://zhihuapi.duapp.com/getnewsbyid',
        data:{
            id:options.id
        },
        success:function(r){
          // wx.hideNavigationBarLoading()
          console.log(r.data.image)
            that.setData({
                title:r.data.title,
                body:r.data.body
            })
            if(r.data.image){
              that.setData({
                image:'https://images.weserv.nl/?url='+r.data.image.slice(7)

              })
            }
           
        }
    })
  },
  onReady:function(){
    // 页面渲染完成
     wx.setNavigationBarTitle({
      title:this.data.title
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
