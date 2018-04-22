var Crawler = require("crawler");
var monk = require('monk')

//var db = monk('localhost:27017/ChatRoom')
var mongodb = require('mongodb');


mongodb.MongoClient.connect("mongodb://localhost:27017/ChatRoom",function(err,db){
    if(!err){

    var dbase = db.collection('user');

    var c = new Crawler({
      maxConnections : 100,
      forceUTF8:true,
    // incomingEncoding: 'gb2312',
      // This will be called for each crawled page
      callback : function (error, res, $) {
        var $ = res.$;
        var playList = $('#playList li');
  
        for(let i =0,len =playList.length ; i<len ; i++){
          var url = 'http://www.500113.com/' + $('#playList li').eq(i).attr('value') ;
          dbase.insert({
            url
          })
        }

        db.close()
      }
  });

    c.queue('http://www.500113.com/video.html');


    }
})

