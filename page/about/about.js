Page({
  data:{
    // text:"这是一个页面"
  },
  dianji:function(e){
  var that=this
  
       console.log(e.currentTarget.dataset.id) ;
       this.setData({
           idabout:e.currentTarget.dataset.id
       })
         wx.navigateTo( {

                url: "/page/show/show?id=" + that.data.idabout
            })
          
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
     console.log(options.id)
     console.log(555)
    var that=this;
    wx.request({
        url:'http://zhihuapi.duapp.com/getlistbyid',
        data:{
            id:options.id
        },
        success:function(r){
       console.log(r)
      console.log(1)
      that.setData({
          background:r.data.background,
          description:r.data.description,
          bigimage:r.data.image,
          titles:r.data.stories

      })
      
            // that.setData({
            //     title:r.data.title,
            //     body:r.data.body
            // })
            // if(r.data.image){
            //   that.setData({
            //     image:'https://images.weserv.nl/?url='+r.data.image.slice(7)

            //   })
            // }
           
        }
    })
  },
  onReady:function(){
    // 页面渲染完成
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