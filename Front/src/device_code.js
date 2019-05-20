import * as types from '../types';
/*
车辆主数据传递数据
*/

const state={
   CodeObject:{}
}

const mutations = {
    [types.DEVICE_CODE](state,res){
        state.CodeObject = res;
    }
}

const actions ={
    storeDeviceCode({commit},obj){
        commit(types.DEVICE_CODE,obj)
    },
}

const getters = {
    getDeviceCodeObject: state => state.CodeObject,
}
export default {
    state,
    actions,
    getters,
    mutations
}
