import * as types from '../types';
/*
分页当前页码和页码选项切换
*/

const state={
    page: 10,                    //每页显示条目个数
    pageSizes:[10,20,50,100],    //每页显示个数选择器的选项设置,
    Sappage: 50,                    //Sap每页显示条目个数
    SapPageSizes:[10,20,50,100,200,250],    //每页显示个数选择器的选项设置,
}

const mutations = {
    
}

const actions ={

}

const getters = {
    getPage : state => state.page,
    getPageSizes : state => state.pageSizes,
    getSapPage : state => state.Sappage,
    getSapPageSizes : state => state.SapPageSizes
}
export default {
    state,
    actions,
    getters,
    mutations
}