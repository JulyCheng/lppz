function Shangpin(con,num){
	this.con=con;
	this.num=num;
	this.index=0;
	this.indicators=[];
	this.init();
}
Shangpin.prototype = {
	constructor:Shangpin,
	init:function(){
		for(var i=0;i<this.num.length;i++){
			this.div=document.createElement('div');
			this.div.style="width:28%;height:90%;float:left;margin:23px 2.5%;background-color:#fff;";
			this.div.className='current';
			this.indicators.push(this.div);
			this.createImg(i);
			this.createLiang(i);
			this.createPrice(i);
			this.createGou(i);
			this.render(i);
			this.con.appendChild(this.div);
		}
		this.getStatu();
	},
  render:function(i){
		var that=this;
		this.div.onclick=function(){
			let pid=that.num[i].pid;
			let liang=that.num[i].liang;
			let data={
				pid,
				liang,
			}
			let str='';
			fetch(
				`http://localhost:3001/shop/show?pid=${pid}`, 
				{ 
						method: 'get' ,
				})
						.then(resp => resp.json())
						.then(data=>{
							  var id=data.detail.pid;
							  console.log(data.detail.pid)
								console.log(data.detail.liang);
								str+="<a href='gouwu.html?shopid="+id+"'/>"; 
								this.innerHTML+=str;
						})
						.catch(e => console.log(e))
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
		}
	},
	createImg:function(i){
		var img=document.createElement('img');
		img.style="width:100%;";
		img.src=this.num[i].img;
    this.div.appendChild(img);
	},
	createLiang:function(i){
		var liang=document.createElement('P');
		liang.style="font-size:22px;padding-top:15px;padding-left:15px;color:#444850;";
		liang.innerText=this.num[i].liang;
    this.div.appendChild(liang);
	},
	createPrice:function(i){
		var price=document.createElement('p');
		price.style="width:40%;font-size:24px;margin-top:20px;margin-left:15px;float:left;margin-right:0;color:#f18442;";
		price.innerText='￥'+this.num[i].price;
    this.div.appendChild(price);
	},
	createGou:function(i){
		var aL=document.createElement('a');
		var gou=document.createElement('img');
		gou.style="width:30%;margin-left:200px;position:relative;float:left;margin-top:-43px;";
		gou.src=this.num[i].gou;
		aL.appendChild(gou);
    this.div.appendChild(aL);
	},
	getStatu:function(){
		for (var j = 0; j < this.num.length; j++) {
        this.indicators[j].className = '';
    }
    this.indicators[this.index].className = 'current';
    var that=this;
		for(var z=0;z<this.indicators.length;z++){
			this.indicators[z].onmouseover=function(){
			  animate(this,{
          marginTop: 10
        })
		  }
		  this.indicators[z].onmouseleave=function(){
			  animate(this,{
          marginTop: 23
        })
		  }
		}
 }
}