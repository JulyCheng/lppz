$(function () {
	//将购物车信息发送到服务器
	function sendToSer() {
		//遍历localstorage中的数据，并将数据存储为json类型字符串
		let buyCarData = "{";
		for (let i = 0; i < localStorage.length; i++) {
			let bb = localStorage.key(i);
			let cc = localStorage.getItem(bb);
			buyCarData = buyCarData + bb + ":" + "\"" + cc + "\"" + ",";
		}
		buyCarData = buyCarData + "}";
		//将json类型字符串转换为json对象
		let jsonData = eval('(' + buyCarData + ')');
		//将json对象发送给服务器，返回发送状态
		$.post('/users/buyCarInfo', jsonData, function (data, status) {
			console.log(status);
		});
	}
	//从服务器获取购物车信息，并在购物车页面中加载信息
	function getFromSer() {
		localStorage.clear();
		$.get('/users/getBuyCarInfo', loginUser, function (data, status) {
			//遍历取回的数据，并将数据按照键值对形式存储到localstorage中
			for (let p in data) {
				localStorage.setItem(p, data[p]);
			}
			loadBuyCarInfo();
		});
	}
	let loginUser = sessionStorage.getItem("loginUser");

	let $totalNumShow = $("#totalNum");
	let $buyNumShow = $("#buyNum");
	let $totalPriceShow = $("#totalPrice");
	let totalNum = localStorage.length;
	if (totalNum) {
		numShow();
	} else {
		// localStorage.setItem("total", 0);
		totalNum = localStorage.length;
		numShow();
	}
	//计算总价格
	function totalPriceShow() {
		let thePrice = 0;
		$(".buyCarMainSection li").find(".goodPrice").children("span").each(function () {
			let thisPrice = $(this).text();
			thePrice = thePrice + parseFloat(thisPrice);
		});
		$totalPriceShow.text(thePrice.toFixed(2));
	}

	//当totalNum=0时，角标隐藏
	function numShow() {
		if (totalNum <= 0) {
			totalNum = 0;
			$buyNumShow.hide();
		} else {
			$buyNumShow.show();
			$buyNumShow.text(totalNum);
			$totalNumShow.text(totalNum);
		}
	}

	// 点击加入购物车按钮时
	let $addCarBtn = $("#addCartBtn a");
	console.log($addCarBtn.length);
	// $addCarBtn.click(AddCarBtn);
	let $addBuyCar = $(".addBuyCar");
	let $addBuyCarShow = $(".addBuyCarShow");
	let $addBuyCarOver = $(".addBuyCarOver");
	let $imgshow = $(".addBuyCarShow .picture img");
	let $titleshow = $(".addBuyCarShow .middle .title h2");
	let $priceshow = $(".addBuyCarShow .middle .price #price");
	let close;
	$addBuyCarShow.hide();
	for (let i = 0; i < $addCarBtn.length; i++) {
		$addCarBtn[i].onclick = function () {
			$addBuyCar.show();
			$addBuyCarShow.show();
			$addBuyCarOver.hide();
			let $parent = $(this).parent().parent(".all");
			let dataname = $parent.find("#foodTitle").attr("data-name");
			let $picture = $parent.parent(".show").parent(".foodCart").prev("img").attr("src");
			let $foodweight = $parent.children(".weight").text();
			let $title = $parent.find("#foodTitle").text();
			let $alltitle = $title + " " + $foodweight;
			let $price = $parent.find("#price").text();
			$imgshow.attr("src", $picture);
			$titleshow.text($alltitle);
			$titleshow.attr("data-name", dataname);
			$priceshow.text($price);
			let cartList = {
				'id': dataname,
				'pic': $picture,
				'tip': $alltitle,
				'price': $price
			};
			localStorage.setItem('cartList' + i, JSON.stringify(cartList));
			// location.reload();
			console.log(localStorage.getItem("cartList"));
		}
	}

	//点击关闭按钮，关闭弹窗
	$(".addBuyCarShow .buyCarHeader a").click(function () {
		$addBuyCar.hide();
	});

	$(".addBuyCarOver .buyCarHeader a").click(function () {
		$addBuyCar.hide();
		clearTimeout(close);
	})
	// 确认将商品加入到购物车
	$(".addBuyCarShow .buyCarFooter a").click(addBuyCar);
	let addList = '<li class="goodList clear_fix"><div class="selectState floatL"><i id="delete"></i></div><div class="goodImg floatL"><img src=""/></div><div class="goodInfo floatL"><div class="goodName" data-name=""></div></div><div class="buyInfo floatR clear_fix"><div class="goodPrice">&yen;&nbsp;<span></span></div><div class="goodNum floatR clear_fix"><a href="javascript:;" class="floatL" id="reduce"></a><span class="floatL"></span><a href="javascript:;" class="floatL" id="add"></a></div></div></li>';
	function addBuyCar() {
		//获取产品信息
		let picture = $(".addBuyCarShow .picture img").attr("src");
		let title = $(".addBuyCarShow .middle h2").text();
		let price = $(".addBuyCarShow .middle span").text();
		let dataName = $(this).parent(".buyCarFooter").prev(".middle").find("h2").attr("data-name"); /*获取data-name值*/
		let carHaveFood = localStorage.getItem(dataName);
		console.log(carHaveFood);
		//判断是否已经购买过该商品
		if (carHaveFood) {
			// localStorage.setItem(dataName, ++carHaveFood);
			// localStorage.setItem("total", ++totalNum);
			numShow();
			$addBuyCarShow.hide();
			$addBuyCarOver.show();
			close = setTimeout(function () {
				$addBuyCar.hide();
			}, 1500);
			//改变相应的已购买物品的数量和价格
			let nowPrice = (price * carHaveFood).toFixed(2);
			$(".buyCarPage .buyCarMainSection").find("[data-name]").each(function () {
				let haveFood = $(this).attr("data-name");
				if (haveFood == dataName) {
					$(this).parent(".goodInfo").next(".buyInfo").children(".goodNum").children("span").text(carHaveFood);
					$(this).parent(".goodInfo").next(".buyInfo").children(".goodPrice").children("span").text(nowPrice);
				}
			});
			//如果用户登录，将购物信息发送给服务器
			if (loginUser) {
				sendToSer();
			}
		} else {
			numShow();
			$addBuyCarShow.hide();
			$addBuyCarOver.show();
			close = setTimeout(function () {
				$addBuyCar.hide();
			}, 2000);
			//购物车信息显示
			$(".buyCarPage .buyCarMainSection").append(addList);
			$(".buyCarMainSection li:last-child .goodImg img").attr("src", picture);
			$(".buyCarMainSection li:last-child .goodInfo .goodName").text(title);
			$(".buyCarMainSection li:last-child .goodInfo .goodName").attr("data-name", dataName); /*设置data-name值*/
			$(".buyCarMainSection li:last-child .buyInfo .goodPrice span").text(price);
			$(".buyCarMainSection li:last-child .buyInfo .goodNum span").text(1);
			//如果用户登录，将购物信息发送给服务器
			if (loginUser) {
				sendToSer();
			}
		}
	}

	//打开购物车界面
	$(".header .buyCar .buyCarLogo").click(openBuyCar);
	$(".addBuyCarOver .buyCarFooter a").click(openBuyCar);
	function openBuyCar() {
		$(".buyCarPage").show();
		totalPriceShow();
	}
	// 关闭购物车界面
	$(".buyCarPage .tipTitle a").click(function () {
		$(".buyCarPage").hide();
	})

});