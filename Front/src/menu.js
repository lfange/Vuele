import * as types from '../types';
import axios from 'axios';
import 'babel-polyfill';
import {MemoryCache} from '@/util/cache.js';
const moduleCache = new MemoryCache();
/*
通用配置 -(菜单点击效果)

*/

const state={
   Menu:[],
   Headshow:true,
   contentHeight:0,             //内容高度
}

const mutations = {
    [types.MENU_Menu](state,res){
        state.Menu = res;
    },
    [types.MENU_Change_Head_Show](state, bool) {
        state.Headshow = bool;
    },
    [types.MENU_SET_CONTENTHEIGHT](state,num = 0){
        let windowHeight = window.innerHeight;
        state.contentHeight = state.Headshow ? windowHeight - 135 + num : windowHeight - 63 + num;
    }
}

const actions ={
    getMenuActions({ commit }){
        const ignoreModuleUris = ['/Waybill/FreightBasics/'
                                    , '/Waybill/TransportFreightDuty/'
                                    , '/Waybill/OtherOndutyWaybill/'
                                    , '/Waybill/PassengerWaybill/'];
        return moduleCache.getOrAdd(''
            , (complete, error)=> 
                axios.post('/Home/GetUserModules')
                    .then(response=> response.data.data.filter(_=> ignoreModuleUris.indexOf(_.ModuleUri) === -1))
                    .then(creatParent)
                    .then(modules =>{
                        commit(types.MENU_Menu, modules);
                        complete(modules);
                    })
                    .catch(e => error(e))
        );
    },
    changeHeadshow({commit},bool){
        commit(types.MENU_Change_Head_Show,bool)
        commit(types.MENU_SET_CONTENTHEIGHT)
    }
}
function creatParent(dataSource){
    let parents = ({});
    dataSource.forEach(_=>parents[_.ModuleId] = _.ModuleName);
    dataSource.forEach(_=> _.ParentName = _.ParentModuleId && parents[_.ParentModuleId]);
    return dataSource;
}
const getters = {
    getMenu: state => state.Menu,
    getHeadshow: state => state.Headshow,
    getHeight : state => state.contentHeight
}
export default {
    state,
    actions,
    getters,
    mutations
}