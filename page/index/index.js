
var app = getApp();
var date = new Date();
Page( {
    data: {
        changeloading: false,
        tipsHidden: true,
        actionHidden: true,
        modalHidden: true,
        fxHidden: true,
        showside: false,
        dianji: {},
        chu: {},
      
        showImg: true,
        array:['当地','其他'],
        index:0,
        date:"2013-01-10",
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        name: '此时此刻',
        author: '许巍',
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    },
 
    showSide: function() {


var that=this;

       
        var dianji = wx.createAnimation( {
            duration: 300,
            timingFunction: 'ease-in'
        })
        dianji.translateY('-60px').step().translateY(0).step().translateY("-20px").step().translateY(0).step();
        // dianji.width( '200rpx' ).step().height( '200rpx' ).step();
        this.setData( {
            dianji: dianji.export()
        })

        var chu = wx.createAnimation( {
            duration: 200,
            timingFunction: 'ease'
        })
        if( this.data.showside ) {
            chu.translateX( '-100%' ).step();
        } else {
            chu.translateX( '0' ).step();
        }
        this.setData( {
            chu: chu.export()
        })
        this.setData( {
            showside: !this.data.showside
        })
    


        

    },
    show: function( e ) {
        // var ide=e.target.dataset.id;
        // console.log( e.target.dataset.id )
        wx.navigateTo( {
            url: "/page/show/show?id=" + e.target.dataset.id
        })

    },
    hide: function() {
        this.setData( {
            tipsHidden: true

        })
    },
    aaaa: function( e ) {
        var id = e.currentTarget.dataset.id;
        // console.log( id )

        this.setData( {
            actionHidden: false,
            id: id
        })
    },
    hideAction: function() {
        this.setData( {
            actionHidden: true

        })
    },
    action: function( e ) {
        var that = this;
        var type = e.target.dataset.name;
        if( type == "阅读" ) {
            wx.navigateTo( {

                url: "/page/show/show?id=" + that.data.id
            })
            this.setData( {
                actionHidden: true

            })
            // wx.navigateTo({
            //     url:'/page/about/about'
            // })
        } else {
            this.setData( {
                actionHidden: true,
                modalHidden: false
            });

        }
    },
    modalConfirm: function() {
        this.setData( {

            modalHidden: true,
            fxHidden: false
        });
    },
    modalCancel: function() {
        this.setData( {
            modalHidden: true
        });
    },
    fxhide: function() {
        this.setData( {

            fxHidden: true
        });
    },

    refresh: function( e ) {
        // console.log( 1 )
        var that = this;
        this.setData( {
            changeloading: false
        })
        if( !this.data.changeloading ) {
            wx.request( {

                url: "http://zhihuapi.duapp.com/getnewsbydate",
                data: {
                    date: "" + date.getFullYear() + ( date.getMonth() + 1 ) + date.getDate()
                },
                header: {
                    "content-Type": "application/json"
                },
                success: function( r ) {
                    date = new Date( date.getFullYear(), date.getMonth(), ( date.getDate() - 1 ) );
                    r.data.stories.forEach( function( v ) {
                        v.images[ 0 ] = 'https://images.weserv.nl/?url=' + v.images[ 0 ].slice( 7 );
                        that.data.news.push( v );
                    })
                    that.setData( {
                        changeloading: true,

                        news: that.data.news
                    })
                },
                // complete:function(){
                //     that.setData({
                //         changeloading:false
                //     })
                // }
            })
        }

    },
    toabout:function(e){
       var that=this
       console.log(e.currentTarget.dataset.id) ;
       this.setData({
           idabout:e.currentTarget.dataset.id
       })
         wx.navigateTo( {

                url: "/page/about/about?id=" + that.data.idabout
            })
          
    },
    onLound: function() {

    },

    onShow: function() {
        // console.log( '' );
    },
    onReady: function() {
        var that = this;

        wx.login( {
            success: function() {
                wx.getUserInfo( {
                    success: function( res ) {
                        // console.log( res );
                        that.setData( {
                            userPic: res.userInfo.avatarUrl
                        })
                    }
                })
            }
        })
     
       wx.request( {
            url: "http://zhihuapi.duapp.com/getlist",
            header: {
                "Content-Type": "application/json"
            },
            success: function( r ) {
                console.log(r)
                that.setData({
                    names:r.data.others
                })
             
               
            }
        })
     
       
        wx.request( {
            url: "http://zhihuapi.duapp.com/getnews",
            header: {
                "Content-Type": "application/json"
            },
            success: function( r ) {
              
                r.data.top_stories.forEach( function( v ) {
                    v.image = "http://images.weserv.nl?url=" + v.image.slice( 7 );
                })
                r.data.stories.forEach( function( v ) {
                    v.images[ 0 ] = "http://images.weserv.nl?url=" + v.images[ 0 ].slice( 7 );
                })

                // console.log( r );
                that.setData( {
                    changeloading: true,
                    imgs: r.data.top_stories,
                    news: r.data.stories,
                    length: r.data.stories.length
                })
            }
        })


        
    },
    onHide: function() {
        // console.log( '' );
    },
    onUnload: function() {
        // console.log( '' );
    },
    onPullDownRefresh: function() {
        var that = this;
        wx.request( {
            url: "http://zhihuapi.duapp.com/getnews",
            success: function( r ) {
                var len = r.data.stories.length;
                if( len !== that.data.length ) {
                    for( var i = 0;i < len - that.data.length;i++ ) {
                        r.data.stories[ i ].images[ 0 ] = "http://images.weserv.nl?url=" + r.data.stories[ i ].images[ 0 ].slice( 7 );
                        that.data.news.unshift( r.data.stories[ i ] );
                    }
                    that.setData( {
                        length: len,
                        news: that.data.news
                    })

                } else {

                }
                wx.stopPullDownRefresh();
                that.setData( {
                    tipsHidden: false
                })

            }
        })

    }

})