var socketApi = {
    socket:null,
    connect : function(){
        this.socket =global.socket =  io('http://127.0.0.1:3001');
    },
    init: function(){
        console.log
        this.connect()
    }
}
export default socketApi