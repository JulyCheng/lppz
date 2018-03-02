$(document).ready(function () {
	//购物车数目显示
	let cartNum = $('.cart-num');
	let num = localStorage.length;
	if (num > 0) {
		cartNum.show();
		cartNum.text(num);
	} else {
		cartNum.hide();
	}
	$('.desc').click(function () {
		console.log(1)
		$(this).css({ 'border': '2px solid red' })
	})
	$('.add').click(function () {
		let p = $(this).parent('.count').find('input')[0];
		let p_value = p.value;
		p_value = ++p_value;
		p.value = p_value;
	})
	$('.reduce').click(function () {
		let p = $(this).parent('.count').find('input')[0];
		let p_value = p.value;
		if (p_value > 1) {
			p_value = --p_value;
			p.value = p_value;
		}
		if (p_value <= 1) {
			p.value = 1;
		}
	})

	$('.buycart').click(function () {
		let parent = $(this).parent().parent().parent('.detail-buy');
		let title = parent.find('.detail-title').text();
		let weight = parent.children('.jiagou').find('.desc').text();
		let allTitle = title + weight;
		let price = parent.children('.detail-price').find('.Price').text();
		let img = parent.prev('.detail-img').find('.pic').attr('src');
		let val = $(this).parent().prev('.count').find('input')[0].value;
		let cart = {
			'id': 101,
			'pic': img,
			'value': val,
			'tip': allTitle,
			'price': price
		};
		localStorage.setItem('cartList', JSON.stringify(cart));
		console.log(localStorage.getItem("cartList"));
	})
	var nav = (function (navObj) {
		navObj.init = function () {
			this.n = 0;
			this.offsetTop = [];
			this.scrolltype = true;
			this.al = document.getElementsByTagName('dd');
			this.review = function () {
				$('.detail-sidebar dd a').eq(this.n).addClass('cur').parent().siblings().children().removeClass('cur');
			};
			for (var i = 0; i < $('.Detail').length; i++) {
				this.offsetTop.push($('.Detail').eq(i).offset().top);
			};
			navObj.bindE();
		};
		navObj.bindE = function () {//滚动条滚动改变导航元素效果
			var self = this;//这里的this等同于上面的this
			$(window).bind('load scroll', function () {
				var stval = $(this).scrollTop();
				// console.log(stval)
				if (stval >= 736) {
					$('.tooldetail').css({ 'position': 'fixed', top: 0, 'z-index': 1, 'box-shadow': '0px 0px 5px 5px #aaa', 'background-color': '#fff' })
					$("#side").css({ 'position': 'fixed', top: 0 })
				} else {
					$('.tooldetail').css({ 'top': 736, 'position': 'static', 'box-shadow': '0px 0px 0px 0px #fff' })
					$('#side').css({ 'top': 736, 'position': 'absolute' });
				}
			});
			$('#side dd').delegate('a', 'click', function (e) {//   点击导航定位页面内容
				self.n = $(this).index('#side dd a');
				console.log(self.n);
				self.scrolltype = false;
				self.review();
				var t = self.offsetTop[self.n] - 60;
				console.log(t);
				// $(this).addClass('itemSelected').show();
				$('html,body').animate({ scrollTop: t }, 600, function () {//   滚动条滚动 页面不同内容的offsetTop值实现按钮对应效果
					self.scrolltype = true;
					$(self.n).addClass('cur').parent().siblings().children().removeClass('cur');
				});
			});
		};
		return navObj;
	})(window.navObj || {});
	nav.init();
});