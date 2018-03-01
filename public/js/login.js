$(function(){
	//当用户点击登陆按钮的时候，发送登陆的异步请求
	$("#btn").click(function(){
		$.post('users/login',$('form').serialize(),function(json){
			if(json.user){//登录成功
				//登录成功，应该将用户的信息保存到localStorage或sessionStorage
				sessionStorage.setItem("user",json.user);
				location='index.html';
			}else if(json.error){//登录失败
				$("#err").text("手机号码或密码不正确");
			}
		});
	})
})