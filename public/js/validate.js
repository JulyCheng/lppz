$(function(){
	let loginUser=sessionStorage.getItem('user1');
	let user=JSON.parse(loginUser)
	console.log(user.phone);
	
    if (loginUser) {
		//如果用户成功登录并跳转到此页面，禁用后退按钮功能，防止回退到登陆页面进行重复登录
		// history.pushState(null, null, document.URL);
		// window.addEventListener('popstate', function () {
		// 	history.pushState(null, null, document.URL);
		// });
		$(".login").hide();
		$(".register").hide();
		$(".headerText span").text(user.phone);
		$(".headerLogout").css({'display':'block'})
		//从服务器获取用户购物车信息并加载
		// getFromSer();
	}
	//如果用户点击退出按钮，显示登录/注册，并清除用户信息以及购物车信息
	$(".logout").click(function () {
		sessionStorage.clear("user1");
		localStorage.clear();
		$(".login").show();
		$(".register").show();
		$(".headerText span").text("");
		$(".headerLogout").css({'display':'none'})
		// loadBuyCarInfo();
	});
})