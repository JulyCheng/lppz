class Tabs {
    constructor() {
        let detail = document.querySelector('.detail-img');
        let dimg = document.querySelector('.dimg1');
        this.aDiv = dimg.getElementsByTagName('div');
        this.aLi = detail.getElementsByTagName('li');
        let dside = document.querySelector(".detail-sidebar");
        this.item = dside.getElementsByTagName("dd");
        this.init();
        this.show();
    }
    init(){
        var that = this;
        for (var i = 0; i < this.aLi.length; i++) {
            this.aLi[i].index = i;
            this.aLi[i].onmouseover = function () {
                for (var j = 0; j < that.aDiv.length; j++) {
                    that.aDiv[j].style.display = 'none';
                }
                that.aDiv[this.index].style.display = 'block';
            }
        }
    }
    show(){
        var that = this;
        for (let i = 0; i < this.item.length; i++) {
            this.item[i].index = i;
            this.item[i].onclick = function () {
                for (var j = 0; j < that.item.length; j++) {
                    that.item[j].className = '';
                }
                that.item[this.index].className = 'itemSelected';
            }
        }
    }
}
let aa = new Tabs();