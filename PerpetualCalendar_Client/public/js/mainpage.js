//获取今日数据（万年历、天气）
getDataToday = function(){  
    var myDate=new Date();
    var year=myDate.getFullYear();
    var month=myDate.getMonth()+1; 
    var day=myDate.getDate(); 
    $.ajax({
       url: 'https://v.juhe.cn/calendar/day',
       type: "get",
       data:{  
              "date":year+'-'+month+'-'+day,  
              "key": '83b6197b7*************ab28851fd8'
          },  
       dataType:'jsonp',
       crossDomain: 'true',
       success:function(data){
           if(typeof data !== "null"&&data.error_code!=="0"){
               $('#getmsgtoday').text("");
               $('#getmsgtoday').append('<div class=\"myp\"><b>公历</b>：'+data.result.data.date+'<br>'+
                              '<b>农历</b>：'+data.result.data.lunar+'<br>'+
                              '<b>属相</b>：'+data.result.data.animalsYear+'<br>'+
                              '<b>星期</b>：'+data.result.data.weekday+'<br>'+
                              '<b>忌</b>：'+data.result.data.avoid+"<br>"+
                              '<b>宜</b>：'+data.result.data.suit+'<br>'+
                              '<b>纪年</b>：'+data.result.data.lunarYear+'<br></div>'
               );
           }
           else{
               $('#getmsgtoday').text('数据获取失败。');
           }  
       },
       error:function(er){
           console.error(er);
       }
    });
    var isShowWeather=true;//天气API有条数限制，测试时限时调用此API的次数
    if (isShowWeather)
    {
        $.ajax({
           url: 'https://v.juhe.cn/weather/index',
           type: "get",
           data:{  
               "key": '66022d283**********68872f0a3',
               "cityname": "南京"
              },  
           dataType:'jsonp',
           crossDomain: 'true',
           success:function(data){
               if(typeof data !== "null"&&data.error_code!=="0"){
                   $('#getmsgweather').text("");
                   $('#getmsgweather').append('<div class=\"myp\"><b>实时温度</b>：'+data.result.sk.temp+'<br>'+
                                  '<b>风向</b>：'+data.result.sk.wind_direction+'<br>'+
                                  '<b>风力</b>：'+data.result.sk.wind_strength+'<br>'+
                                  '<b>湿度</b>：'+data.result.sk.humidity+'<br>'+
                                  '<b>今日天气</b>：'+data.result.today.weather+'<br>'+
                                  '<b>今日温度</b>：'+data.result.today.temperature+'<br>'+
                                  '<b>穿衣指数</b>：'+data.result.today.dressing_index+'<br>'+
                                  '<b>穿衣建议</b>：'+data.result.today.dressing_advice+'<br>'+
                                  '<b>最后更新时间</b>：'+data.result.sk.time+'<br></div>'
                   );
               }
               else{
                   $('#getmsgweather').text('数据获取失败。');
               }  
           },
           error:function(er){
               console.error(er);
           }
        });
    } 
    else {
        $('#getmsgweather').text("后端禁用了天气功能");
    }
}
var isBeingCallMsg=true;
//获取新闻数据
getDataNews = function(){
    $.ajax({
       url: 'http://localhost:8080/getJuheData/getNews',
       type: "get",
       dataType:'jsonp',
       jsonp: 'callback',   
       jsonpCallback: 'jsoncallback',
       crossDomain:'true',
       success:function(data){
           if(typeof data !== "null"&&data.reason==="成功的返回"){
               $('#getmsgnews').text("");
               for(var i=0;i<10;i++){
                   $('#getmsgnews').append("<div class=\"myp\"><h3 onclick=\"window.open('"+data.result.data[i].url+"')\">"
                   +data.result.data[i].title+"</h3>"
                   +data.result.data[i].date+"  来源:"+data.result.data[i].author_name
                   +"<br><br>"+"<img src='" + data.result.data[i].thumbnail_pic_s+ "'>"
                   +"</div><br><br><br>");
               }
           }
           else{
               $('#getmsgnews').text("");
               $('#getmsgnews').append('<p>数据获取失败</p>');
           }  
       },
       error:function(er){
           $('#getmsgnews').text("");
           $('#getmsgnews').append('<p>数据获取时出错</p>');
       }
    });
}
//获取笑话数据
getDataJokes = function(){
    $.ajax({
       url: 'https://v.juhe.cn/joke/img/text.php',
       type: "get",
       data:{  
              "key": '1152bc4502**********8c9320ea365',
              "pagesize": 10
          },  
       dataType:'jsonp',
       crossDomain: 'true',
       success:function(data){
           if(typeof data !== "null"&&data.error_code!=="0"){
               $('#getmsgjokes').text("");
               for(var i=0;i<10;i++){
                   $('#getmsgjokes').append("<div class=\"myp\"><h3>"+data.result.data[i].content+"</h3>"
                   +"<br>"+"<img src='" + data.result.data[i].url+ "'>"
                   +"</div><br><br>");
               }
           }
           else{
               $('#getmsgjokes').text("");
               $('#getmsgjokes').append('<p>数据获取失败</p>');
           }  
       },
       error:function(er){
           $('#getmsgjokes').text("");
           $('#getmsgjokes').append('<p>数据获取失败</p>');
       }
    });
}
//获取NBA数据
getDataNba = function(){
    $.ajax({
       url: 'https://op.juhe.cn/onebox/basketball/nba',
       type: "get",
       data:{  
              "key": 'b5f6b829**********21e425e03ab',
              "pagesize": 10
          },  
       dataType:'jsonp',
       crossDomain: 'true',
       success:function(data){
           if(typeof data !== "null"&&data.reason==="查询成功"){
               $('#getmsgnba').text("");
               $('#getmsgnba').append("<p>"+data.result.title+"</p>" +"<br><br>");
               for(var i=0;i<data.result.list.length;i++){
                   $('#getmsgnba').append("<div id=\"myp"+i+"\" class=\"myp\"><h3>"+data.result.list[i].title+"</h3>");
                   for(var j=0;j<data.result.list[i].tr.length;j++){
                       $('#myp'+i).append("<a href=\""+data.result.list[i].tr[j].link1url+"\">"
                       +data.result.list[i].tr[j].link1text+"</a>&nbsp;&nbsp;&nbsp;");
                       $('#myp'+i).append("<a href=\""+data.result.list[i].tr[j].link2url+"\">"
                       +data.result.list[i].tr[j].link2text+"</a><br><br>");
                       $('#myp'+i).append("<table><tr><td>"
                       +data.result.list[i].tr[j].player1+"</td><td></td><td>"
                       +data.result.list[i].tr[j].player2+"</td></tr><tr><td><img src=\""
                       +data.result.list[i].tr[j].player1logo+"\"></td><td>&nbsp;&nbsp;VS&nbsp;&nbsp;</td><td><img src=\""
                       +data.result.list[i].tr[j].player2logo+"\"></td></tr>"
                       +"</table><br>");
                       var getscore=data.result.list[i].tr[j].score;
                       if(getscore!=="VS"){
                           $('#myp'+i).append("总比分："+data.result.list[i].tr[j].score);
                       }
                       else{
                           $('#myp'+i).append("-比赛尚未开始-");
                       }
                       
                       $('#myp'+i).append("<br>比赛时间："+data.result.list[i].tr[j].time);
                   }
               }
           }
           else{
               $('#getmsgnba').text("");
               $('#getmsgnba').append('<p>数据获取失败</p>');
           }  
       },
       error:function(er){
           $('#getmsgnba').text("");
           $('#getmsgnba').append('<p>数据获取失败</p>');
       }
    });
}
var Cons="水瓶座";
getSelectedCons = function(){
    var obj=document.getElementById('consSelect');
    var index=obj.selectedIndex; //序号，取当前选中选项的序号
    Cons = obj.options[index].text;
    getDataCons();
}
//获取星座数据
getDataCons = function(){
    $('#getmsgcons').text("正在更新数据...");
    $.ajax({
       url: 'http://localhost:8080/getJuheData/getCons',
       type: "get",
       data:{  
              "consName": Cons,
          },  
       dataType:'jsonp',
       jsonp: 'callback',   
       jsonpCallback: 'jsoncallback',
       crossDomain:'true',
       success:function(data){
           if(typeof data !== "null"&&data.resultcode==="200"){
               $('#getmsgcons').text("");
               $('#getmsgcons').append("<div class=\"myp\"><p>"+data.name+"</p>"
                   +"<br><b>日期</b>：" + data.datetime
                   +"<br><b>幸运色</b>："+data.color
                   +"<br><b>幸运数字</b>："+data.number
                   +"<br><b>速配星座</b>："+data.QFriend
                   +"<br><b>健康指数</b>："+data.health
                   +"<br><b>爱情指数</b>："+data.love
                   +"<br><b>财运指数</b>："+data.money
                   +"<br><b>工作指数</b>："+data.work
                   +"<br><b>综合指数</b>："+data.all
                   +"<br><b>今日概述</b>："+data.summary
                   +"</div><br><br>");
               
           }
           else{
               $('#getmsgcons').text("");
               $('#getmsgcons').append('<p>数据获取失败</p>');
           }  
       },
       error:function(er){
           $('#getmsgjokes').text("");
           $('#getmsgjokes').append('<p>数据获取失败</p>');
       }
    });
}
