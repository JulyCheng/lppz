var cartTable = document.getElementById('cartTable');
var cartbox = document.querySelector('.cartbox');
var foot = document.querySelector('.foot');
var selected = document.getElementById("selected");
var money = document.getElementById('priceTotal');//总计
var deleteAll = document.getElementById('deleteAll');//删除按钮
var qty = document.getElementById('selectedTotal');
var tab = document.querySelector(".tab");
console.log(tab);
cartTable.onclick = function (e) {
    var target = e.target;
    if (target.className === 'check-one check') {
        var shuliang1 = target.parentElement.parentElement.getElementsByClassName('count-input')[0];
        var shuliang1_value = shuliang1.value;
        var tr=target.parentElement.parentElement.children;
        for(var i=0;i<tr.length;i++){
            if(tr[i].checked=false){

            }
        }
        getTotal();
    }
    if (target.className === 'add') {
        var jiage1 = target.parentElement.parentElement.getElementsByClassName('price')[0].innerText;
        var sub = target.parentElement.parentElement.getElementsByClassName('subtotal')[0];
        var shuliang1 = target.parentElement.getElementsByClassName('count-input')[0];
        var shuliang1_value = shuliang1.value;
        shuliang1_value = ++shuliang1_value;
        shuliang1.value = shuliang1_value;

        if (shuliang1_value >= 2) {
            target.parentElement.children[0].innerHTML = "-";
        } else {
            target.parentElement.children[0].innerHTML = " ";
        }
        sub.innerHTML = (parseFloat(shuliang1_value) * parseFloat(jiage1)).toFixed(2);
        getTotal();
    }
    if (target.className === 'reduce') {
        var check = target.parentElement.parentElement.getElementsByClassName('check-one check')[0];
        var tr = target.parentElement.parentElement;
        var jiage1 = target.parentElement.parentElement.getElementsByClassName('price')[0].innerText;
        var sub = target.parentElement.parentElement.getElementsByClassName('subtotal')[0];
        var shuliang1 = target.parentElement.getElementsByClassName('count-input')[0];
        var shuliang1_value = shuliang1.value;
        if (shuliang1_value > 1) {
            shuliang1_value = --shuliang1_value;
            shuliang1.value = shuliang1_value;
        }
        if (shuliang1_value == 1 && check.checked == true) {
            target.innerHTML = ' ';
        } else {
            target.innerHTML = "-";
        }
        sub.innerHTML = (parseFloat(shuliang1_value) * parseFloat(jiage1)).toFixed(2);

        getTotal();
    }
    if (target.className === 'delete') {
        var tr = target.parentElement.parentElement;
        var check1 = tr.getElementsByClassName('check')[0];
        var conf = confirm('确定要删除该商品吗？');
        var jiage = tr.getElementsByClassName('price')[0].innerText;
        var shuliang = tr.getElementsByClassName('count-input')[0].value;
        if (conf) {
            localStorage.removeItem('cartList0');
            location.reload();
        }
        getTotal();
    }
    if (target.className === 'check-all') {
        var tr=target.parentElement.parentElement.parentElement.parentElement.parentElement;
        var tb=tr.children[1].children;
        for (var i = 0; i < tb.length; i++) {
            tb[i].getElementsByTagName('input')[0].checked=target.checked;
            getTotal();
        }
    }
    function getTotal() {
        var len = tbody.children.length;
        var tr = tbody.children;
        var select = 0;
        var price = 0;
        for (var i = 0; i < len; i++) {
            if (tr[i].getElementsByTagName("input")[0].checked) {
                tbody.children[i].className = "on";
                select += parseInt(tr[i].getElementsByTagName("input")[1].value);
                price += parseFloat(tr[i].getElementsByClassName('price')[0].innerHTML) * parseFloat(tr[i].getElementsByTagName("input")[1].value);
                console.log(tr[i].getElementsByClassName('price')[0].innerHTML);

            }
            else {
                tr[i].className = "";
            }
        }
        money.innerHTML = price.toFixed(2);
        qty.innerHTML = select;
    }

    function keyup() {
        var tr = tbody.children;
        for (var i = 0; i < tr.length; i++) {
            tr[i].getElementsByTagName('input')[1].onkeyup = function () {
                var val = parseInt(this.value);
                var s = 0;
                var sub = this.parentElement.parentElement.getElementsByClassName('subTotal')[0];
                var price = this.parentElement.parentElement.getElementsByClassName('price')[0].innerHTML;
                if (isNaN(val) || val <= 0) {
                    val = 1;
                }
                if (this.value != val) {
                    this.value = val;
                }
                s = parseFloat(val) * parseFloat(price);
                sub.innerHTML = s.toFixed(2);
                getTotal();
            }
        }
    }
    keyup();
}
