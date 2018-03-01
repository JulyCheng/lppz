function Tabs() {
    let detail = document.querySelector('.detail-img');
    let dimg = document.querySelector('.dimg1');
    this.aDiv = dimg.getElementsByTagName('div');
    this.aLi = detail.getElementsByTagName('li');
    this.init();
}

Tabs.prototype={
    constructor:Tabs,
    init:function(){
        var that=this;
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
}
var aa=new Tabs();