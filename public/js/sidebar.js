$(document).ready(function(){
	//购物车数目显示
	let cartNum=$('.cart-num');
	let num=localStorage.length;
    if(num>0){
		cartNum.show();
		cartNum.text(num);
	}else{
		cartNum.hide();
	}
	var nav=(function(navObj){
		navObj.init=function(){
			this.n=0;
			this.offsetTop=[];
			this.scrolltype=true;
			this.review=function(){
				$('.sidebar .list a').eq(this.n).addClass('cur').parent().siblings().children().removeClass('cur');
			};
			for(var i=0;i<$('.shangpin .cont').length;i++){
				this.offsetTop.push($('.shangpin .cont').eq(i).offset().top);
                // console.log(this.offsetTop);
			};
			navObj.bindE();
		};
		navObj.bindE=function(){//滚动条滚动改变导航元素效果
			var self=this;//这里的this等同于上面的this
			$(window).bind('load scroll',function(){
				var stval=$(this).scrollTop();
				// console.log(stval);
				if(stval>729){//判断滚动条滚动距离大于或小于header高度时，让导航效果对应在第一个上
					if(stval<self.offsetTop[0]){
						console.log(self.offsetTop[0]);
						self.n=0;
					}else{
						for(var j=0;j<self.offsetTop.length;j++){
							if(stval>(self.offsetTop[j]+300)&& stval<self.offsetTop[j+1]){self.n=j+1;break;}//这里的300是常量
						};
					};
					if(self.scrolltype===true){
						self.review();
					}
					$('#side').removeClass('sidebar').addClass('move');
				}else{
					$('#side').removeClass('move').addClass('sidebar');
					$('#side li a').parent('li:first-child').children().addClass('cur').parent().siblings().children().removeClass('cur');
				};
			});
			$('#side .list').delegate('a','click',function(e){//   点击导航定位页面内容
				self.n=$(this).index('#side .list a');
				console.log(self.n);
				self.scrolltype=false;
				self.review();
				var t=self.offsetTop[self.n];
				// console.log(self.offsetTop);
				console.log(self.n);
				// console.log(t);
				$('html,body').animate({scrollTop:t},2000,function(){//   滚动条滚动 页面不同内容的offsetTop值实现按钮对应效果
					self.scrolltype=true;
					$(self.n).addClass('cur').parent().siblings().children().removeClass('cur'); 
				}); 
			});
		};
		return navObj;
	})(window.navObj || {});
	nav.init();
});