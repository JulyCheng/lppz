var shopid = window.location.search.split("=")[1];
console.log(shopid);
let title =document.querySelector('.detail-title');
let dimg1=document.querySelector('.dimg1');
let dimg2=document.querySelector('.dimg2');
let img1=dimg2.querySelector('.img1');
let img2=dimg2.querySelector('.img2');
let img3=dimg2.querySelector('.img3');
let img4=dimg2.querySelector('.img4');
let img5=dimg2.querySelector('.img5');
let desc=document.querySelector('.desc');
let Price=document.querySelector('.Price');
let selling=document.querySelector('.selling');
let content=document.querySelector('.content');
let showing=document.querySelector('.showing');
fetch(
    `http://localhost:3001/shop/show?pid=${shopid}`,
    {
        method: 'get',
    })
    .then(resp => resp.json())
    .then(data => {
        var id = data.detail.pid;
        title.innerHTML=data.detail.liang;
        dimg1.innerHTML="<div style='display:block'><img src='"+data.detail.imgIcon1+"'></div><div><img src='"+data.detail.imgIcon2+"'></div><div><img src='"+data.detail.imgIcon3+"'/></div><div><img src='"+data.detail.imgIcon4+"'/></div><div><img class='pic' src='"+data.detail.imgIcon5+"'/></div>";
        img1.src=data.detail.imgIcon1;
        img2.src=data.detail.imgIcon2;
        img3.src=data.detail.imgIcon3;
        img4.src=data.detail.imgIcon4;
        img5.src=data.detail.imgIcon5;        
        Price.innerHTML=data.detail.price;
        desc.innerHTML=data.detail.foodtaste;
        selling.innerHTML="<li>月销量<i>"+data.detail.msales+"</i></li><li>累计评价<i>"+data.detail.pingjia+"</i></li><li>积分<i>13</i>";
        content.innerHTML="<li>生产许可证编号:"+data.detail.bianhao+"</li><li>产品标准号:"+data.detail.biaozhunhao+"</li><li>厂名:"+data.detail.factoryName+"</li><li>厂址:"+data.detail.factoryAddr+"</li><li>厂家联系方式:"+data.detail.factoryPhone+"</li><li>配料表:"+data.detail.peiliao+"</li><li>储藏方法:"+data.detail.saveway+"</li><li>保质期:"+data.detail.baozhiqi+"</li><li>净含量:"+data.detail.weight+"</li><li>包装方式:"+data.detail.baoway+"</li><li>食品口味:"+data.detail.series+"</li><li>是否含糖:"+data.detail.sugar+"</li><li>产地:"+data.detail.birthland+"</li><li>省份:"+data.detail.province+"</li><li>城市:"+data.detail.city+"<li>";       
        showing.innerHTML="<img src='"+data.detail.imgShow1+"'/><img src='"+data.detail.imgShow2+"'/><img src='"+data.detail.imgShow3+"'/><img src='"+data.detail.imgShow4+"'/><img src='"+data.detail.imgShow5+"'/>";    
    })
    .catch(e => console.log(e))