import Vue from 'vue';
import axios from '@/axios/index'
var vm = new Vue();
//成功消息提示
const successMessage = function (message) {
  vm.$notify({
    title: '成功',
    message: message,
    offset: 100,
    type: 'success'
  });
}
//警告消息提示
const warningMessage = function (message) {
  vm.$message({
    showClose: true,
    duration: 5000,
    message: message,
    type: 'warning'
  });
}
//错误消息提示
const errorMessage = function (message) {
  vm.$message({
    showClose: true,
    duration: 5000,
    offset: 100,
    message: message,
    type: 'error'
  });
}
//消息提示
const infoMessage = function (message) {
  vm.$message({
    showClose: true,
    message: message,
    type: 'info'
  });
}
//删除确认提示
const delConfirmMessage = function (message, url) {
  return new Promise((resolve, reject) => {
    vm.$confirm(`此操作将永久删除该条数据,且该数据包含了${message.ChildNum}条子数据, 是否继续?`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      axios.post(`${url}`, { keyId: `${message.KeyId}` }).then((res) => {
        successMessage(res.data.message)
      });
      resolve();
    }).catch(() => {
      infoMessage('已取消删除')
    });
  })
}


/**
 * 删除确认，执行回调函数
 * 
 * @param {array} delIds    ：[0,1,2] 
 * @param {function} func 
 */
const delBtnConfirm = (delIds, func) => {
  if (delIds.length > 0) {
    vm.$confirm('此操作将删除选择的数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      func();
    })
  } else {
    warningMessage('请勾选选择项');
  }
}

/**
 * 确认，执行回调函数
 * 
 * @param {string} message   'abc' 
 * @param {function} func 
 * @param {string} cancelMessage  'abc'
 */
const funConfirm = (string, func, cancelMessage) => {
  vm.$confirm(string, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    func();
  }).catch(() => {
    if (cancelMessage) {
      warningMessage(cancelMessage);
    }
  })
}
export { successMessage, warningMessage, errorMessage, infoMessage, delConfirmMessage, delBtnConfirm, funConfirm }