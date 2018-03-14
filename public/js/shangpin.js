class Shangpin {
	constructor(con, num) {
		this.con = con;
		this.num = num;
		this.index = 0;
		this.indicators = [];
		this.init();
	}
	init() {
		for (let i = 0; i < this.num.length; i++) {
			this.div = document.createElement('div');
			this.div.style = "width:28%;height:90%;float:left;margin:23px 2.5%;background-color:#fff;";
			this.div.className = 'current';
			this.indicators.push(this.div);
			this.createImg(i);
			this.createLiang(i);
			this.createPrice(i);
			this.createGou(i);
			this.render(i);
			this.con.appendChild(this.div);
		}
		this.getStatu();
	}
	render(i) {
		let that = this;
		this.div.onclick = () => {
			let pid = that.num[i].pid;
			// let liang=that.num[i].liang;
			// let price=that.num[i].price;
			// let imgIcon1=that.num[i].imgIcon1;
			// let imgIcon2=that.num[i].imgIcon2;
			// let imgIcon3=that.num[i].imgIcon3;
			// let imgIcon4=that.num[i].imgIcon4;
			// let imgIcon5=that.num[i].imgIcon5;
			// let imgShow1=that.num[i].imgShow1;
			// let imgShow2=that.num[i].imgShow2;
			// let imgShow3=that.num[i].imgShow3;
			// let imgShow4=that.num[i].imgShow4;
			// let imgShow5=that.num[i].imgShow5;
			// let msales=that.num[i].msales;
			// let pingjia=that.num[i].pingjia;
			// let foodtaste=that.num[i].foodtaste;
			// let bianhao=that.num[i].bianhao;
			// let biaozhunhao=that.num[i].baiozhunhao;
			// let factoryName=that.num[i].factoryName;
			// let factoryAddr=that.num[i].factoryAddr;
			// let factoryPhone=that.num[i].factoryPhone;
			// let peiliao=that.num[i].peiliao;
			// let saveway=that.num[i].saveway;
			// let baozhiqi=that.num[i].baizhiqi;
			// let tianjiaji=that.num[i].tianjiaji;
			// let weight=that.num[i].weight;
			// let baoway=that.num[i].baoway;
			// let kinds=that.num[i].kinds;
			// let brand=that.num[i].brand;
			// let series=that.num[i].series;
			// let sugar=that.num[i].sugar;
			// let birthland=that.num[i].birthland;
			// let province=that.num[i].province;
			// let city=that.num[i].city;
			// let data={
			// 	pid,
			// 	liang,
			// 	price,
			// 	imgIcon1,
			// 	imgIcon2,
			// 	imgIcon3,
			// 	imgIcon4,
			// 	imgIcon5,
			// 	imgShow1,
			// 	imgShow2,
			// 	imgShow3,
			// 	imgShow4,
			// 	imgShow5,
			// 	msales,
			// 	pingjia,
			// 	foodtaste,
			// 	bianhao,
			// 	biaozhunhao,
			// 	factoryName,
			// 	factoryAddr,
			// 	factoryPhone,
			// 	peiliao,
			// 	saveway,
			// 	baozhiqi,
			// 	tianjiaji,
			// 	weight,
			// 	baoway,
			// 	kinds,
			// 	brand,
			// 	series,
			// 	sugar,
			// 	birthland,
			// 	province,
			// 	city
			// }
			// fetch(
			// 	"http://localhost:3001/shop/add",
			// 	{
			// 		method:'post',
			// 		body:JSON.stringify(data)
			// 	})
			// 	.then(resp=>resp.json())
			// 	.then(data=>{
			// 		console.log(data)
			// 	})
			// 	.catch(e=>console.log(e))
			window.location.href = "gouwu.html?shopid=" + pid;
		}
	}
	createImg(i) {
		let img = document.createElement('img');
		img.style = "width:100%;";
		img.src = this.num[i].img;
		this.div.appendChild(img);
	}
	createLiang(i) {
		let liang = document.createElement('P');
		liang.style = "font-size:22px;padding-top:15px;padding-left:15px;color:#444850;";
		liang.innerText = this.num[i].liang;
		this.div.appendChild(liang);
	}
	createPrice(i) {
		let price = document.createElement('p');
		price.style = "width:40%;font-size:24px;margin-top:20px;margin-left:15px;float:left;margin-right:0;color:#f18442;";
		price.innerText = '￥' + this.num[i].price;
		this.div.appendChild(price);
	}
	createGou(i) {
		let aL = document.createElement('a');
		let gou = document.createElement('img');
		gou.style = "width:30%;margin-left:200px;position:relative;float:left;margin-top:-43px;";
		gou.src = this.num[i].gou;
		aL.appendChild(gou);
		this.div.appendChild(aL);
	}
	getStatu() {
		for (let j = 0; j < this.num.length; j++) {
			this.indicators[j].className = '';
		}
		this.indicators[this.index].className = 'current';
		let that = this;
		for (let z = 0; z < this.indicators.length; z++) {
			this.indicators[z].onmouseover = function () {
				animate(this, {
					marginTop: 10
				})
			}
			this.indicators[z].onmouseleave = function () {
				animate(this, {
					marginTop: 23
				})
			}
		}
	}
}