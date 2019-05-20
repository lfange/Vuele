import * as types from '../types';
import axios from 'axios';
import 'babel-polyfill';
/*
通用配置 -(导航标签)

*/

const state = {
    //导航菜单仓库
    openNav: [
        {
            ModuleName: '首页',
            ModuleUri:'/',
            ModuleId:'0',
            checked:true
        }
    ],
    NavDom:[],
    tabHandle:false
}

const mutations = {
    [types.NAV_AddNav](state, obj) {
        let flag=false;
        state.openNav.forEach(function(item){
            item.checked = false;
            if(obj.ModuleUri==item.ModuleUri){
                flag=true;
               item.checked = true;
            }
        });
        if(!flag){
            obj.checked = true;
            obj.iconOpen = true;
            state.openNav.push(obj)
        }
    },
    /*删除标签页*/
    [types.NAV_DelNav](state, num) {
        state.openNav.splice(num,1)
        if(num==1){
           state.openNav[0].checked =true;
        }
    },
     [types.NAV_Dom](state, dmo) {
        state.NavDom = dmo;
    },
    [types.NAV_TabHandle](state, bool) {
        state.tabHandle = bool;
    },
    [types.NAV_CleanNav](state) {
        state.openNav = [{
            ModuleName: '首页',
            ModuleUri:'/',
            ModuleId:'0',
            checked:true
        }];
    }
}

const actions = {
   addOpenTab({ commit },obj){
         commit(types.NAV_AddNav,obj)
    },
    delOpenTab({ commit },num){
         commit(types.NAV_DelNav,num)
    },
    addNavDom({commit},dom){
        commit(types.NAV_Dom,dom)
    },
    changeTabHandleShow({commit},bool){
        commit(types.NAV_TabHandle,bool)
    }
}

const getters = {
    getOpenNav: state => state.openNav,
    getNavDoe: state => state.NavDom,
    getTabHandleShow: state => state.tabHandle
}
export default {
    state,
    actions,
    getters,
    mutations
}