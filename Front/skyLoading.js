
export default {
    bind(el, binding, vnode) {
      let position = window.getComputedStyle(el).position;
      if ((position === 'static' || position === '') && el.className.indexOf('el-dialog__wrapper')==-1) {
        el.style.position = 'relative';
      }
      let msg = document.createElement('div');
      let loadingImg = document.createElement('i');
      loadingImg.className = 'loading-img';
      msg.appendChild(loadingImg);
      msg.className = 'msg-box';
      let box = document.createElement('div');
      box.className = 'sky-loading-box';

      box.appendChild(msg);
      if(el.className.indexOf('el-dialog__wrapper')!==-1){
          el.getElementsByClassName('el-dialog')[0].appendChild(box);
      }else{
        el.appendChild(box);
      }      
      if(binding.value){
          let selector = el.getElementsByClassName('sky-loading-box');
          selector[selector.length - 1].style.display = 'block';
      }
    },
    update(el, binding, vnode) {
        let selector = el.getElementsByClassName('sky-loading-box');
        let box = selector[selector.length - 1];
        if (binding.oldValue != binding.value) { // Mutated State
            if (binding.value) {
                 box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        }
    }
}