var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../database/db').user;


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: '' });
});

/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: '' });
});

/*register*/
router.get('/register', function(req, res) {
    res.render('register', { title: '' });
});



/*ucenter*/
router.post('/ucenter', function(req, res) {
    var query_doc = {name:req.body.name, password:req.body.password};
    //console.log(req.body.name+"="+req.body.password);
    //MyStudent.find({}, function(err, docs) {});
    (function(){
        user.findOne({name:req.body.name}, function(err, doc){
            if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
                res.render('login', { title: '网络异常！' });
            }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
                res.render('login', { title: '账号不存在！' });
            //    res.redirect("/login");
            }else{ 
                if(req.body.password != doc.pwd){     //查询到匹配用户名的信息，但相应的password属性不匹配
                    res.render('login', { title: '密码错误！' });
                //    res.redirect("/login");
                }else{
                //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                    res.render('ucenter', { title: req.body.name });
                }
            }
        });
    })(query_doc);
});

/*rcenter*/
router.post('/rcenter', function(req, res) {
    var query_doc = {name:req.body.name, password:req.body.password};
    //console.log(req.body.name+"="+req.body.password);
    //MyStudent.find({}, function(err, docs) {});
    (function(){
        user.findOne({name:req.body.name},function(err,doc){   // 同理 /login 路径的处理方式
            if(err){ 
                res.render('register', { title: '网络异常！' });
            }else if(doc){ 
                res.render('register', { title: '该用户已存在！' });
            }else{ 
                user.create({                             // 创建一组user对象置入model
                    name: req.body.name,
                    pwd: req.body.password
                },function(err,doc){ 
                     if (err) {
                         res.render('register', { title: '服务器异常！' });
                     } 
                     else {
                         res.render('login', { title: '注册成功！' });
                     }
                });
            }
        });
    })(query_doc);
});

module.exports = router;
