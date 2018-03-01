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
        // this.createBtn('left');
        // this.createBtn('right');
        this.createIndicator();
        this.container.appendChild(this.slider);

        this.setTimer();
        this.setIndicator();
        // this.setBtn();
        // this.toggle();
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
    // createBtn: function (mark) {
    //     var btn = document.createElement('div');
    //     btn.style= 'width:60px;height:60px;position:absolute;top:50%;margin-top:-20px;cursor:pointer;';
    //     if (mark == "left") {
    //         btn.style.left =  '10px';
    //         btn.innerHTML = '&lt;';
    //     } else if (mark == 'right') {
    //         btn.style.right='10px';
    //         btn.innerHTML = '&gt;';
    //     }
    //     this.slider.appendChild(btn);
    //     this.btns.push(btn);
    // },
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
            if (that.engine) {
                that.engine = null;
            }
            that.engine = animate(that.imgsArea, {
                left: -(that.index + 1) * that.imgBox.offsetWidth
            })
            if (that.imgsArea.style.left == -(that.len + 1) * that.imgBox.offsetWidth + 'px') {
                that.imgsArea.style.left = -that.imgBox.offsetWidth + 'px';
            }
            if (that.index === that.len) {
                that.index = 0;
            }
            that.getStatu();
            // console.log(that.index);
        }, 2000);
    },
    setIndicator: function () {
        var that = this;
        for (var i = 0; i < that.len; i++) {
            that.indicators[i].index = i;
            that.indicators[i].onmouseover = function () {
                that.index = this.index;
                that.getStatu();
                animate(that.imgsArea, {
                    left: -(this.index + 1) * that.container.offsetWidth
                })
                // console.log(that.index);
            }
        }
    },
    // setBtn: function () {
    //     var that = this;
    //     that.btns[0].onclick = function () {
    //         that.index--;
    //         animate(that.imgsArea, {
    //             left: -(that.index + 1) * that.container.offsetWidth
    //         })
    //         if (that.imgsArea.style.left == 0 + 'px') {
    //             that.imgsArea.style.left = -that.len * that.container.offsetWidth + 'px';
    //         }
    //         if (that.index == -1) {
    //             that.index = 1;
    //         }
    //         that.getStatu();
    //         console.log(that.index);
    //     }
    //     that.btns[1].onclick = function () {
    //         that.index++;
    //         if (that.imgsArea.style.left == -(that.len + 1) * that.container.offsetWidth + 'px') {
    //             that.imgsArea.style.left = -that.container.offsetWidth + 'px';
    //         }
    //         animate(that.imgsArea, {
    //             left: -(that.index + 1) * that.container.offsetWidth
    //         })

    //         if (that.index == that.len) {
    //             that.index = 0;
    //         }
    //         that.getStatu();
    //         console.log(that.index);
    //     }
    // },
    // toggle: function () {
    //     var that = this
    //     that.slider.onmouseover = function () {
    //         that.indicatorWrap.style.display = "block";
    //         that.btns[0].style.display = "block";
    //         that.btns[1].style.display = "block";
    //         clearInterval(that.timer);
    //     }
    //     that.slider.onmouseleave = function () {
    //         that.indicatorWrap.style.display = "none";
    //         that.btns[0].style.display = "none";
    //         that.btns[1].style.display = "none";
    //         that.setTimer();
    //     }
    // },
    getStatu: function () {
        for (var i = 0; i < this.len; i++) {
            this.indicators[i].className = '';
        }
        this.indicators[this.index].className = 'current';
    }
}