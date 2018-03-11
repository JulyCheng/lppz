var tbody = document.querySelector(".tab");
function createCart() {
    for (let p in localStorage) {
        var len = JSON.parse(localStorage.getItem(p));
        document.documentElement.scrollTop = 0;
        var tr = document.createElement('tr');
        tr.id = p;
        var td1 = document.createElement('td');
        td1.className = 'checkbox';
        var input1 = document.createElement('input');
        input1.className = 'check-one';
        input1.className += ' check';
        input1.type = 'checkbox';
        td1.appendChild(input1);
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.className = 'goods';
        var img = document.createElement('img');
        img.style = 'width:100px;height:80px;margin-right:10px;float:left;';
        img.src = len.pic;
        var span = document.createElement('span');
        span.style = 'width:180px;margin-top:20px;text-align:left;float:left;';
        span.innerText = len.tip;
        td2.appendChild(img);
        td2.appendChild(span);
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.className = 'price';
        td3.innerText = len.price;
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.className = 'count';
        var span1 = document.createElement('span');
        span1.className = 'reduce';
        span1.innerText = "-";
        var input2 = document.createElement('input');
        input2.className = "count-input";
        input2.type = "text";
        input2.value = len.value;
        var span2 = document.createElement('span');
        span2.className = "add";
        span2.innerText = "+";
        td4.appendChild(span1);
        td4.appendChild(input2);
        td4.appendChild(span2);
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.className = 'subtotal';
        td5.innerText = len.subtotal;
        tr.appendChild(td5);

        var td6 = document.createElement('td');
        td6.className = 'operation';
        var span3 = document.createElement('span');
        span3.className = "delete";
        span3.innerText = '删除';
        td6.appendChild(span3);
        tr.appendChild(td6);

        tbody.appendChild(tr);
    }
}
createCart();