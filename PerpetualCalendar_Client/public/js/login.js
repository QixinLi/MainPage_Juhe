function validate(){
        var name = $("#name").val();
        if(name == ''){
            $("#alert_panel").text("账号不能为空!");
            return false;
        }
        var pwd = $("#password").val();
        if( pwd == ''){
            $("#alert_panel").text("密码不能为空!");
            return false;
        }
        return true;
    }