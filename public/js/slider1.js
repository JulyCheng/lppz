//构造函数
function Slider(container,images) {
    this.container = container;
    this.images = images;
    this.len = 0; //组件规模，等于图片的数量
    this.index = 0; //组件状态
    this.slider = null;
    this.imgsArea =null;
    this.imgBox = null;
    this.imgs = [];
    this.btns = [];
    this.indicatorWrap = null;
    this.indicators = [];
    this.indicator = null;
    this.timer = null;
}

//原型
Slider.prototype = {
    constructor: Slider,
    init: function () {
        this.len = this.images.length;
        this.slider = document.createElement('div');
        this.slider.style = 'overflow:hidden;width:100%;height:100%;position:relative;';
        this.createImg();
        this.container.appendChild(this.slider);
        this.setTimer();
    },
    createImg: function () {
        this.imgsArea = document.createElement('ul');
        var w = this.container.offsetWidth;
        this.imgsArea.style = 'position:relative;width:' + (this.len + 2) * w + 'px';
        this.imgsArea.style.left = -w + 'px';
        for (var i = -1; i < this.len + 1; i++) {
            this.imgBox = document.createElement('li');
            this.imgBox.style = 'float:left;width:' + w + 'px';
            var img = document.createElement('img');
            img.src = this.images[i];
            if (i == -1) {
                img.src = this.images[this.len - 1];
            } else if (i == this.len) {
                img.src = this.images[0];
            }
            img.style = 'width:100%;';
            this.imgBox.appendChild(img);
            this.imgsArea.appendChild(this.imgBox);
            this.imgs.push(img);
        }
        this.slider.appendChild(this.imgsArea);
    },
    createIndicator: function () {
        this.indicatorWrap = document.createElement('div');
        this.indicatorWrap.style = 'text-align:center;width:600px;height:20px;position:absolute;bottom:30px;left:50%;margin-left:-300px;'
        for (var i = 0; i < this.len; i++) {
            this.indicator = document.createElement('div');
            this.indicator.style = 'display:inline-block;width:20px;height:20px;border-radius:50%;background:#ccc';
            i == 0 ? this.indicator.style.marginLeft = 0 : this.indicator.style.marginLeft = 30 + 'px';
            this.indicatorWrap.appendChild(this.indicator);
            this.indicators.push(this.indicator);
            this.indicators[0].className = 'current';
        }
        this.slider.appendChild(this.indicatorWrap);
    },
    setTimer: function () {
        var that = this;
        if (this.timer) {
            this.timer = null;
        }
        this.timer = setInterval(function () {
            that.index++;
            animate(that.imgsArea, {
                left: -(that.index + 1) * that.imgBox.offsetWidth
            })
            if (that.imgsArea.style.left == -(that.len + 1) * that.imgBox.offsetWidth + 'px') {
                that.imgsArea.style.left = -that.imgBox.offsetWidth + 'px';
            }
            if (that.index === that.len) {
                that.index = 0;
            }
        }, 2000);
    },
}