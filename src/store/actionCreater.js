//统一创建action

import {INIT_ASYNIC,INIT_LIST,CHANGE_IPTVAL,ADDITEM, DELITEM} from './actionType'


// saga中间件   action为一个对象 
export const getInitAsynicAction=()=>({
    type:INIT_ASYNIC
})



// 一般情况下action是一个对象    用于描述组件想要执行的操作
export const getInitItemAction=(data)=>({
    type:INIT_LIST,
    // 等价于：value:value
    data
})

export const getIptValCAction=(value)=>({
    type:CHANGE_IPTVAL,
    value
})
export const getAddItemAction=(color)=>({
        type:ADDITEM,
        color
})
export const getDelItemAction=(value)=>({
    type:DELITEM,
    // 等价于：value:value
    value
})


