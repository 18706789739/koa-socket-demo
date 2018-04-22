const Koa = require('koa')
const cors = require('koa2-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
var mongodb = require('mongodb');

const app = new Koa()
const router = new Router();

app.use(bodyParser())
.use(cors())
.use(router.routes())
.use(router.allowedMethods());


function getUrl(dbase,page){
  const realPage = (page) * 10;
  return new Promise((resolve,reject)=>{
          dbase.find().skip(realPage).limit(10).toArray(function(err,res){
            resolve(res)
          })
    })
}

function getTotal(dbase){
  return new Promise((resolve,reject)=>{
    dbase.find().count().then((count)=>{
      const pages = Math.ceil(count / 10);
        resolve({
          count,
          pages
        });
    });
  })
}

function connectDB(){
  return new Promise((resolve,reject)=>{
    mongodb.MongoClient.connect("mongodb://localhost:27017/ChatRoom",function(err,db){
      resolve(db)
    })
  })
}

router.get('/',async function (ctx, next) {

  const {
    page
  } = ctx.query;

  // 连接数据库
  const db = await connectDB();
  const dbase = db.collection('user');

  //获取电影地址、总条数、页数
  const movieArr = await getUrl(dbase,page,);
  const {
    count,
    pages
  } = await getTotal(dbase);

  const data = {
    count,
    pages,
    movieArr
  }

  console.log(data)
  ctx.body = data

});

app.listen(8001, () => {
  console.log('server is running at http://localhost:8001')
})



