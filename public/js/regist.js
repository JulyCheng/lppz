$(function() {
	//表单验证
	//做表单验证的目的是让不合法的数据不能提交到服务器端，提高用户的体验
	//好的用户体验应该是用户在每个输入项获得输入焦点前，就显示输入的基本要求，在用户输入的过程中也可以进行输入提示，
	//在失去焦点后验证用户输入的合法性.如果不合法，就立即显示错误提示，在再次输入合法后，如果验证合法，错误提示要消失
	//在用户提交表单的时候，如果有输入项不合，表单就不能提交
	//在电话输入项失去焦点的时候，验证电话号码的合法
	
	//电话号码失去焦点验证
	valiteInput("#phone",/^1[3578]\d{9}$/);
	//密码失去焦点验证
	valiteInput("#pwd",/^\w{6,8}$/);

	function valiteInput(id, reg) {
		//事件绑定
		$(id).blur(function() {
			var value = $(this).val();
			var $error_span = $(this).siblings(".error-msg"); //找到当前元素的兄弟元素.error-msg
			if(reg.test(value)) { //测试用户输入的手机号码是否与正则表达式匹配
				$error_span.hide();
				$(this).attr("data-validate",true);
			} else { //手机号码不合法
				$(this).attr("data-validate",false);
				$error_span.show();
			}
		});
	}
	//确认密码和密码的值要相同，失去教的的时候验证
	
	//当提交表单的时候，所有需要验证的元素都要合法，才能提交,否则显示错误信息，并阻止提交
	//利用h5的自定义属性
	$("#btn").click(function(){
		
		//如果有输入项不合法，就不能提交表单，并且要显示错误信息
		//在表单中，添加了data-require的属性，且值为true的元素是必须要数据，
		//而且，data-validate要为true,这个输入项才是合法的
		var $requires = $("[data-validate]");//找出所有的带有data-require自定义属性的元素
		//查看这些元素的data-validate的值是否为true
		var isPass = true;//表示所有的元素都经过检测，可以提交表单
		//如果有一个data-require元素的data-validate值为false,就将v赋值为false
		$requires.each(function(index,item){//index是当前元素在集合中的索引，item是正在遍历的元素，item是js原生对象
			var t = $(item).attr("data-validate");//读取data-validate这个自定义属性的值
			if(!t||t==="false"){//如果这个值为false,说明这个元素每有通过检测
				$(item).blur();
				isPass=false;//表单不能提交
			}
		});//遍历$requires
		
		
		if(isPass===true){//发送异步请求
			$.post('users/regist',$("form").serialize(),function(json){
				if(json.user){//如果返回的json对象中有user属性，说明注册成功，用户需要登录一下
//					location='login.html';
				}
			});
		}
		
	});
	
	$("#phone").blur(function(){
		$.getJSON('users/phoneInUse',{'phone':$(this).val()},function(json){
			//注意回调函数中，this和外面的this不是同一个对象
			if(json){
				console.dir(json);
				var $span = $("#phone").siblings(".error-msg");
				$span.show();
				$(this).attr("data-validate","false");
			}
		})
	});

})