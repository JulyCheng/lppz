var shopid = window.location.search.split("=")[1];
console.log(shopid);
let title =document.querySelector('.detail-title');
fetch(
    `http://localhost:3001/shop/show?pid=${shopid}`,
    {
        method: 'get',
    })
    .then(resp => resp.json())
    .then(data => {
        var id = data.detail.pid;
        title.innerHTML=data.detail.liang;
    })
    .catch(e => console.log(e))