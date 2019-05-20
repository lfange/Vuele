import * as types from '../types';
/*
基础数据码表长度maxLenth
*/

const state={
    BasisCodeMaxLength:16,               //编码最大长度16
    BasisNameMaxLength:256,              //名称最大长度256
    BasisShortCodeMaxLength:32,          //助记码最大长度32
    BasisSortNumberMaxLength:5,          //排序码最大长度5
    BasisRemarkMaxLength:256,             //备注最大长度256
    Basis8Length:8,                      //里程最大长度
    Basis10Length:10,                      //时间最大长度
    Basis64Length:64,                      //最大长度64
    Basis11Length:11,                      //最大长度11
    Basis18Length:18,                      //最大长度18
}

const mutations = {
    
}

const actions ={

}

const getters = {
    getBasisCodeMaxLength : state => state.BasisCodeMaxLength,
    getBasisNameMaxLength : state => state.BasisNameMaxLength,
    getBasisShortCodeMaxLength : state => state.BasisShortCodeMaxLength,
    getBasisSortNumberMaxLength : state => state.BasisSortNumberMaxLength,
    getBasisRemarkMaxLength : state => state.BasisRemarkMaxLength,
    getBasis8Length : state => state.Basis8Length,
    getBasis10Length : state => state.Basis10Length,
    getBasis64Length : state => state.Basis64Length,
    getBasis11Length : state => state.Basis11Length,
    getBasis18Length : state => state.Basis18Length,
}
export default {
    state,
    actions,
    getters,
    mutations
}