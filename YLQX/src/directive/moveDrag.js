export default {
  bind(el, binding) {
    let oDiv = el.childNodes[0]; //当前元素
    oDiv.style.marginBottom = 0 + 'px'; //diolag默认有50px的下边距
    el.style.overflow = 'hidden';
    console.dir(oDiv)
    let self = this; //上下文
    oDiv.childNodes[0].onmousedown = function (e) {
      //鼠标按下，计算当前元素距离可视区的距离 e.offsetX  e.offsetY
      let disX = e.clientX - oDiv.offsetLeft;
      let disY = e.clientY - oDiv.offsetTop;
      document.onmousemove = function (e) {
        let l = e.clientX - disX;
        let t = e.clientY - disY;

        //因为element-ui  el-dialog弹框外有个蒙层是100%宽，显示弹框位置是根据margin设置的，所以设置为marginLeft,marginTop
        oDiv.style.marginLeft = l + "px";
        oDiv.style.marginTop = t + "px";
        //如果上偏移<=0，即demo跑到屏幕外（上）,设置为0
        if (oDiv.style.marginTop <= '0px') {
          oDiv.style.marginTop = 0 + 'px';
        }
        // //如果左偏移<=0,即demo跑到屏幕外（左）,设置为0；这里默认做偏移为demo宽度的一半。所以偏移设置为demo宽度的一半
        if (oDiv.style.marginLeft <= '0px') {
          oDiv.style.marginLeft = 0 + 'px';
        }

        let overBottom = Number(oDiv.style.marginTop.substring(0, oDiv.style.marginTop.indexOf("px")));
        let overRight = Number(oDiv.style.marginLeft.substring(0, oDiv.style.marginLeft.indexOf("px")));
        // //如果右偏移>=整个视口的宽度。
        if (overRight + oDiv.offsetWidth >= document.body.clientWidth) {
          oDiv.style.marginLeft = document.body.clientWidth - oDiv.offsetWidth + 'px';
        }
        // //如果下偏移>=整个视口的高度
        if (overBottom + oDiv.offsetHeight >= document.body.clientHeight) {
          oDiv.style.marginTop = document.body.clientHeight - oDiv.offsetHeight + 'px';
        }
      };
      document.onmouseup = function (e) {
        document.onmousedown = null;
        document.onmousemove = null;
      }
    }
  }
}
