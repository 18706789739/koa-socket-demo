const Koa = require('koa')
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router();

app.use(bodyParser())
      .use(router.routes())
      .use(router.allowedMethods());

var server = require('http').Server(app.callback())
var io = require('socket.io')(server)

router.get('/', function (ctx, next) {

  ctx.body={name:1};
});


var clientList = [];
io.on('connection', function(socket){

  //新用户进入房间
  clientList.push('用户'+socket.id)
  io.emit('client updata',clientList)

  //聊天室消息
  socket.on('chat message', function(msg){
    const res = {
      content:msg,
      clientName:'用户'+socket.id,
      sendTime:new Date().toLocaleString()
    }
    io.emit('chat message', res);
  });
});

io.on('disconnect',function(socket){
console.log('离开')
  const name = '用户'+socket.id
  const index = clientList.indexOf(name);

  if(index != -1)
  clientList.splice(index,1);
  io.emit('client updata',clientList)

})

server.listen(3001, () => {
  console.log('server is running at http://localhost:3001')
})