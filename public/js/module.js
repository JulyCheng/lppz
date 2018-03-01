
function getComputedStyleValue(obj, prop) {
    var value = '';

    if (window.getComputedStyle) {
        value = getComputedStyle(obj)[prop];
    } else {
        value = obj.currentStyle[prop];
    }
    return value;
}

function animate(obj, json){
    var currentStyle = 0;

    if(obj.timer){
        clearInterval(obj.timer);
    }

    obj.timer = setInterval(function(){
        for(var styleName in json) {
            var speed = 0;
            currentStyle = parseInt(getComputedStyleValue(obj, styleName));
            speed = (json[styleName] - currentStyle) / 8;
            if(speed > 0) {
                speed = Math.ceil(speed);
            }else{
                speed = Math.floor(speed);
            }
            
            if((currentStyle >= json[styleName] && speed > 0) || (currentStyle <= json[styleName] && speed < 0)){
                delete json[styleName];
                // clearInterval(obj.timer);
            }else{
                if((currentStyle + speed > json[styleName] && speed > 0) || (currentStyle + speed < json[styleName] && speed < 0)){
                    obj.style[styleName] = json[styleName] + 'px';
                }else{
                    obj.style[styleName] = currentStyle + speed + 'px';
                }
            }
        }
    },30);
}

