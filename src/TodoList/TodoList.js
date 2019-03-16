import React, { Component} from 'react';  


// 引入store  用于数据的读取    //const data=['自律','自由']
// import store from '../store/index'
// 如果是index.js文件后面的部分可以不写
import store from '../store/main' 
// import axios from 'axios';
import ComponentUI from './TodoListUI'

// import {CHANGE_IPTVAL,ADDITEM, DELITEM} from '../store/actionType'
import {getInitAsynicAction,getInitItemAction,getIptValCAction,getAddItemAction,getDelItemAction } from '../store/actionCreater'  

// 引入统一定义的action type常量
 


class TodoList extends Component {
  constructor(props){
    super(props)
    // 获取store中的数据
    this.state=store.getState()
    this.iptValC=this.iptValC.bind(this)
    this.addItem=this.addItem.bind(this)
    this.delItem=this.delItem.bind(this)
    this.storeChange=this.storeChange.bind(this)
    //订阅store的内容   只要store的内容发生改变subscribe里的函数自动执行
    store.subscribe(this.storeChange)  

    
  }
  // 拆分组件为UI组件（渲染页面）和容器组件（处理逻辑）
  render() {
    return <ComponentUI 
      disabled={this.state.disabled}
      list={this.state.list}
      iptVal={this.state.iptVal}
      itemColor={this.state.itemColor}
      iptValC={this.iptValC}
      addItem={this.addItem}
      delItem={this.delItem}
    />;
  }

  componentDidMount(){
    const action=getInitAsynicAction()
    // 使用saga中间件  dispatch action时不仅仅store能接收到 sagas也能接收到
    store.dispatch(action)
  }
  iptValC(e){
    //1. 创建指令（action）
    // action 是对象的形式
    // const action={
    //   // type 描述对象要做的事情     相当于告诉store 你要帮我change_iptVal
    //   type:CHANGE_IPTVAL,
    //   // 传递获取的input输入框的值
    //   value:e.target.value
    // }
    const action=getIptValCAction(e.target.value)
    console.log(e.target.value);
    
    // 2.把指令传递给store   dispatch(action)
    store.dispatch(action)
    // 3.store把当前state中的数据 和action  转发给reducer（自动的过程）    
    // 4.让reducer指导怎样处理数据
  }
 
  addItem(){
    const r = Math.round(Math.random()*255);
    const g = Math.round(Math.random()*255);
    const b = Math.round(Math.random()*255);
    const a = ( (Math.random()*5 + 5) / 10 ).toFixed(2)
    const color = `rgba(${r},${g},${b},${a})`
    console.log(color);
    
    // 点击按钮时想添加一个代办   发出这个指令 
    // const action={
    //   type:ADDITEM,
    //   // 因为输入框输入的值已经自动保存在store中了   没必要再取一次
    //   // value:this.state.iptVal
    //   color
    // }
    const action=getAddItemAction(color)
    store.dispatch(action)

  }
  delItem(index,item){
    // const action={
    //   type:DELITEM,
    //   value:index
    // }
    const action=getDelItemAction(index)

    if(window.confirm('是否删除代办事项：'+item)){
      store.dispatch(action)
    }
    
  }


  storeChange(){
    //监听到数据变化后   执行该函数   用监听到的新的数据，setState（替换）掉当前组件中的数据
    this.setState(store.getState())
  }


}

export default TodoList;
