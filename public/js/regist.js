var phone = document.getElementById('phone');
var pwd = document.getElementById('pwd');
var repwd = document.getElementById('repwd');
var res = {
	'validate': false,
	'regist': false,
	'compare': false
}
function validate(id, reg) {
	id.onblur = () => {
		console.log(id.value)
		console.log(id.parentNode.children[1])
		var value = id.value;
		var errormsg = id.parentNode.children[1];
		if (reg.test(value)) {
			errormsg.style.display = "none";
			res.validate = true;
		} else {
			errormsg.style.display = "block";
			res.validate = false;
		}
	}
}
validate(phone, /^1[3578]\d{9}$/);
validate(pwd, /^\w{6,8}$/);
//验证手机号码是否被注册过
function number() {
	phone.onblur = () => {
		var number = phone.value;
		var err = document.querySelector(".error-msg");
		console.log(number)
		fetch(
			`http://localhost:3001/users/validate?phone=${number}`,
			{
				method: 'get',
			})
			.then(resp => resp.json())
			.then(data => {
				if (data.confirm==false) {
					err.innerHTML = "该手机号已被注册";
					err.style.display = "block";
					res.regist = false;
				} else {
					err.style.display = "none";
					res.regist = true;
				}
			})
			.catch(e => console.log(e))
	}
}
number();
function compare() {
	var err = repwd.parentNode.children[1];
	repwd.onblur = () => {
		if (repwd.value !== pwd.value) {
			console.log(err)
			err.innerHTML = "两次密码输入不一致，请重新输入";
			err.style.display = "block";
			res.compare = false;
		} else {
			err.innerHTML = '';
			res.compare = true;
		}
	}
}
compare();
function regist(e) {
	e = e || event;
	e.preventDefault();
	if (res.compare && res.validate && res.regist) {
		var phone = document.getElementById('phone').value;
        var pwd = document.getElementById('pwd').value;
		var data = {
			phone,
			pwd
		}

		fetch(
			"http://localhost:3001/users/regist",
			{
				method: 'post',
				body: JSON.stringify(data)
			})
			.then(resp => resp.json())
			.then(data => {
				console.log(data.id);
				if (data.id) {
					var form = document.getElementsByTagName('form')[0];
					form.reset();
					window.location.href = "login.html";
				}
			})
			.catch(e => console.log(e))
	}
}