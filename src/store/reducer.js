//reducer接收store中传来的信息   并指导store怎样去修改数据
// reducer相当于笔记本   怎样存放数据   存储数据情况    如何对数据操作



import {INIT_LIST,CHANGE_IPTVAL,ADDITEM, DELITEM} from './actionType'

//初始化store  
const defaultState={
    disabled:true,
    iptVal:'',
    list:[],
    itemColor:'rgba(0,0,0,0.5)'
}


//reducer 能接收state  但是不能修改state
// reducer 是纯函数（给定输入，一定输出固定的内容；且不会有任何副作用）
            // 如果函数内有日期  ajax 随机数等内容   则固定输入不会有固定输出----不是纯函数
            // 副作用：对输入的内容作了修改    也就是要先对要修改的输入做深拷贝
//导出一个函数     state为整个store中存储的数据   并初始化为空对象
export default (state=defaultState,action)=>{
    // 对之前的state中的值做深拷贝-----因为reducer能接收state  不能修改state
    const newState=JSON.parse(JSON.stringify(state))
    if(action.type===INIT_LIST){
        newState.list=action.data
        console.log(action.data);
        console.log(newState);
        
        return newState

    }else if (action.type===CHANGE_IPTVAL) {
        
        newState.iptVal=action.value    //对state做修改
        if(newState.iptVal!==''){
            newState.disabled=false
        }else{
            newState.disabled=true
        }
        return newState      //将修改后的内容做返回     reducer中的newState返回给store
                            // store用接收到新的数据替换旧的数据（自动进行的）
    }else if(action.type===ADDITEM){
        // newState.list.push(action.value)
        console.log(newState.list.indexOf(newState.iptVal));
        
        if(newState.list.indexOf(newState.iptVal)===-1){
            newState.list.push(newState.iptVal)
            newState.iptVal=''
            newState.itemColor=action.color
            newState.disabled=true
            return newState
        }else{
            alert('事件已添加')
            newState.iptVal=''
            newState.disabled=true
            return newState
        }

    }else if(action.type===DELITEM){
        newState.list.splice(action.value,1)
        return newState
    }else{
        return state
    }
}