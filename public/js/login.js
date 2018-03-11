let phone = document.getElementById('phone');
let pwd = document.getElementById('pwd');
function validate(id, reg) {
	id.onblur = () => {
		console.log(id.value)
		console.log(id.parentNode.children[1])
		let value = id.value;
		let errormsg = id.parentNode.children[1];
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
function login(e) {
	e = e || event;
	e.preventDefault();
	let phone = phone.value;
	let pwd = pwd.value;
	let data = {
		phone,
		pwd
	}
	sessionStorage.setItem("user1",JSON.stringify(data));
	fetch(
		"http://localhost:3001/users/login", 
		{
			method: 'post',
			body: JSON.stringify(data)
		})
			.then(resp => resp.json())
			.then(data=>{
				console.log(data.status);
				if(data.status=="wrong"){
					let form=document.getElementsByTagName('form')[0];
					form.reset();
					sessionStorage.removeItem('user1')
				}
				if(data.status=="ok"){
					let form=document.getElementsByTagName('form')[0];
					form.reset();                           
					window.location.href="lppzShopping.html"
				}
			})
			.catch(e => console.log(e))
	
}