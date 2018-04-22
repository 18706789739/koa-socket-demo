var Crawler = require("crawler");

var mongodb = require('mongodb');

const targetUrl = 'http://xwow.net/video/newvideo/'
mongodb.MongoClient.connect("mongodb://localhost:27017/ChatRoom",function(err,db){
    if(!err){

    var dbase = db.collection('eamovie');


  var moviePageLinks = [];

  //获取播放详情页列表
  var c = new Crawler({
      maxConnections : 100,
      forceUTF8:true,
    // incomingEncoding: 'gb2312',
      // This will be called for each crawled page
      callback : function (error, res, $) {
        var $ = res.$;
        $('.thumbs a').each(function(index,item){
          moviePageLinks.push ( 'http://xwow.net/' + $(item).attr('href') )
        });
        
      }
  });

  //获取视频地址列表
  var video = new Crawler({
    maxConnections : 100,
    forceUTF8:true,
  // incomingEncoding: 'gb2312',
    // This will be called for each crawled page
    callback : function (error, res, $) {
      var $ = res.$;
      var movieLink = '';

      var timer = setInterval(function(){
        movieLink = $('.jw-video').attr('src');
        console.log(movieLink)
        if( movieLink != 'undefined') clearInterval(timer);
      },1000)

    }
});
video.queue('http://xwow.net/video/play/ph5ad1585bbaa02/1pondo-031417-498')
  //循环获取十页的播放详情地址
  // for(let i = 0 ; i < 1 ; i++){
  //   c.queue(`${targetUrl}${i}`)
  // }




  db.close()


    }
})

