import { put, takeEvery} from 'redux-saga/effects'
import axios from 'axios';
import {INIT_ASYNIC} from './actionType'
import {getInitItemAction} from './actionCreater';
// saga常用的API
// call
// put
// put(action)    类似于   store.dispatch(action)
// takeEvery
// takeEvery(INIT_ASYNIC, getInitAsynic);每当捕捉到每一个INIT_ASYNIC类型的action 就会执行getInitAsynic方法 
// takeLatest


// saga内的函数必须为generator函数（生成器）
function* todoSagas() {
    // 每一次dispatch INIT_ASYNIC类型的action时都会被捕获
    // 每当捕捉到每一个INIT_ASYNIC 就会执行getInitAsynic方法   
    yield takeEvery(INIT_ASYNIC, getInitAsynic);
}

function * getInitAsynic() {
    // 对异步请求失败的情况做处理
    try{
        const res=yield axios.get('/todolist')      //获取到res的数据继续向下执行
        const action=getInitItemAction(res.data)
        yield put(action)    //store.dispatch(action)

    }catch(e){
        alert("网络请求失败")
    }
    



    // generator函数里做异步请求时不要再使用promise形式
    // axios.get('/todolist').then((res)=>{   
    //   const data=res.data
    //   const action=getInitItemAction(data)
    //   store.dispatch(action)
    //   }
    // ).catch(()=>{console.log(''error)})
}


export default todoSagas;