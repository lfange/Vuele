
export default {
    bind(el, binding) {
        let oDiv = el.childNodes[0];   //当前元素
        oDiv.style.marginBottom = 0 + 'px';//diolag默认有50px的下边距
        el.style.overflow = 'hidden';
        let self = this;  //上下文
        oDiv.childNodes[0].onmousedown = function (e) {
            //鼠标按下，计算当前元素距离可视区的距离
            let disX = e.clientX - oDiv.offsetLeft; 
            let disY = e.clientY - oDiv.offsetTop;
            document.onmousemove = function (e) {
                //通过事件委托，计算移动的距离 
                let l = e.clientX - disX + 400 ;
                let t = e.clientY - disY + 160 ;
                //移动当前元素 
                oDiv.style.left = l + 'px';
                oDiv.style.top = t + 'px';
                //如果上偏移<=0，即demo跑到屏幕外（上）,设置为0              oDiv.offsetWidth是容器的宽度
                if (oDiv.offsetTop <= 0) {
                    oDiv.style.top = 160 + 'px';
                }
                 // //如果左偏移<=0,即demo跑到屏幕外（左）,设置为0；这里默认做偏移为demo宽度的一半。所以偏移设置为demo宽度的一半
                if (oDiv.offsetLeft  <= 0) {
                    oDiv.style.left = 400 + 'px';
                }
                // //如果右偏移>=整个视口的宽度。
                if (oDiv.offsetLeft + oDiv.offsetWidth >= el.clientWidth) {
                    oDiv.style.left = el.clientWidth -oDiv.offsetWidth+ 400 + 'px';
                }
                //如果下偏移>=整个视口的高度
                if (oDiv.offsetTop + oDiv.offsetHeight >= el.clientHeight) {
                    oDiv.style.top = el.clientHeight - oDiv.offsetHeight +160+ 'px';
                }
            };
            document.onmouseup = function (e) {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
}