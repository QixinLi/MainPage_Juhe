var mymongoose = require("mongoose"); //  顶会议用户组件

if (process.env.VCAP_SERVICES) {
    var db_config = JSON.parse(process.env.VCAP_SERVICES).mongodb[0].credentials;
    dbUrl = db_config.uri
}

mymongoose.connect("mongodb://WangnimaDB:Wangnima520@106.14.151.117/myDB", function(err) {
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
    }
});
var Schema = mymongoose.Schema;   //  创建模型
var userSchema = new Schema({
    name: String,
    pwd: String
}); //  定义了一个新的模型，但是此模式还未和myData集合有关联
exports.user = mymongoose.model('mydata', userSchema); //  与myData集合关联