export default {
  bind(el, binding) {
    let tbody = el.querySelector('.el-table__body-wrapper tbody');
    tbody.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowDown') {
        let nextCol; //上一个Col
        let col = e.target.parentNode.parentNode.parentNode; //获取tr
        let row = col.parentNode; //获取td
        let columnIndex = Array.prototype.indexOf.call(row.childNodes, col); //获取tr的位置
        let nextRow = row.nextSibling; //获取下一个td的
        let elRolChildNodes = row.parentNode.childNodes; //获取列表的Rows
        let elIndex = Array.prototype.indexOf.call(elRolChildNodes, row); //获取当前的Row在列表中的位置
        if (elIndex == elRolChildNodes.length - 2) {
          nextCol = elRolChildNodes[0].childNodes[columnIndex]; //为第一个那么就找到列表最后Row的Col
        } else {
          nextCol = nextRow.childNodes[columnIndex]; //获取下一个tr的
        }
        nextCol.querySelector('input').selectionStart = nextCol.querySelector('input').value.length;
        nextCol.querySelector('input').focus();
      }
      if (e.code === 'ArrowUp') {
        let previousCol; //上一个Col
        let col = e.target.parentNode.parentNode.parentNode; //当前的Col
        let row = col.parentNode; //当前的Row
        let columnIndex = Array.prototype.indexOf.call(row.childNodes, col); //获取当前的Col的位置
        let previousRow = row.previousSibling; //获取上一个row
        let elRolChildNodes = row.parentNode.childNodes; //获取列表的Rows
        let elIndex = Array.prototype.indexOf.call(elRolChildNodes, row); //获取当前的Row在列表中的位置
        if (elIndex == 0) {
          previousCol = elRolChildNodes[elRolChildNodes.length - 2].childNodes[columnIndex]; //为第一个那么就找到列表最后Row的Col
        } else {
          previousCol = previousRow.childNodes[columnIndex]; //获取上一个Col
        }
        previousCol.querySelector('input').selectionEnd = previousCol.querySelector('input').value.length;
        previousCol.querySelector('input').focus();
      }
      if (e.code === 'ArrowLeft') {
        if (e.target.selectionEnd == 0 && binding.value == false) {
          binding.value = true;
        } else {
          if (binding.value) {
            binding.value = false;
            let col = e.target.parentNode.parentNode.parentNode; //当前的Col
            let row = col.parentNode; //当前的Row
            let inputs = [...row.querySelectorAll('input')].filter(v =>
              !v.disabled && v.type != 'checkbox'
            );
            let rowChildNodes = row.childNodes;
            let columnIndex = Array.prototype.indexOf.call(rowChildNodes, col);
            try {
              if (col.previousSibling.querySelector('input').disabled || rowChildNodes[v].previousSibling.querySelector('input').type == 'checkbox') {
                xxx;
              } else {
                col.previousSibling.querySelector('input');
                col.previousSibling.querySelector('input').focus();
              }
            } catch (error) {
              for (let v = columnIndex; v > -1; v--) {
                try {
                  if (rowChildNodes[v].previousSibling.querySelector('input').disabled || rowChildNodes[v].previousSibling.querySelector('input').type == 'checkbox') {
                    xxx;
                  } else {
                    rowChildNodes[v].previousSibling.querySelector('input');
                    rowChildNodes[v].previousSibling.querySelector('input').focus();
                  }
                  break;
                } catch (error) {
                  if (inputs[0] == rowChildNodes[v].querySelector('input')) {
                    try {
                      let filterInputs = [...row.previousSibling.querySelectorAll('input')].filter(v => !v.disabled && v.type != 'checkbox');
                      filterInputs[filterInputs.length - 1].focus();
                    } catch (error) {}
                  }
                }
              }
            }
          }
        }
      }
      if (e.code === 'ArrowRight') {
        if (e.target.selectionEnd == e.target.value.length && binding.value == false) {
          binding.value = true;
        } else {
          if (binding.value) {
            binding.value = false;
            let col = e.target.parentNode.parentNode.parentNode; //当前的Col
            let row = col.parentNode; //当前的Row
            let inputs = [...row.querySelectorAll('input')].filter(v => !v.disabled && v.type != 'checkbox');
            let rowChildNodes = row.childNodes;
            let columnIndex = Array.prototype.indexOf.call(rowChildNodes, col);
            try {
              if (col.nextSibling.querySelector('input').disabled) {
                xxx;
              } else {
                col.nextSibling.querySelector('input');
                col.nextSibling.querySelector('input').focus();
              }
            } catch (error) {
              for (let v = columnIndex; v < rowChildNodes.length; v++) {
                try {
                  if (rowChildNodes[v].nextSibling.querySelector('input').disabled) {
                    xxx;
                  } else {
                    rowChildNodes[v].nextSibling.querySelector('input');
                    rowChildNodes[v].nextSibling.querySelector('input').focus();
                  }
                  break;
                } catch (error) {
                  if (inputs[inputs.length - 1] == rowChildNodes[v].querySelector('input')) {
                    try {
                      [...row.nextSibling.querySelectorAll('input')].filter(v => !v.disabled && v.type != 'checkbox')[0].focus();
                    } catch (error) {}
                  }
                }
              }
            }
          }
        }
      }
    });
  }
};