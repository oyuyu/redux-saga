import React, { Component,Fragment} from 'react';

              // 解构            
import './todolist.css';   // 引入CSS文件

// class App extends React.Component {

//react组件的定义    TodoList这个类继承了React.Component    
class TodoList extends Component {
  // 构造函数
  constructor(props){
    // 调用父类的构造函数    自己定义的构造函数必须要调用super()对父类进行初始化。
    // 因为子类没有自己的this对象，而是继承父类的this对象。如果不调用super方法，子类就得不到this对象。
    super(props);
    this.state={
      iptVal:'',
      list:["自律","自由"]
    }
  }
  render() {
    // JSX语法     只要使用JSX语法就要引入React  通过React对JSX语法编译识别
    // 1.外层只有一个根标签
    // 2.想在最外层包裹元素   同时又不被显示出来   用Fragment占位符包裹
    return (
      <Fragment>
         {/* Fragment实际上是一个组件   以大写字母开头 */}
         {/*lable的作用：扩大点击的区域     比如  点击添加代办时 光标自动聚焦到输入框  
            方法：htmlFor="xxx"  等于  要关联标签的id="xxx"
         */}
        <label htmlFor="insertArea">添加代办：</label>
         {/* onChange={this.iptChange}   要改变this指向 */}
        <input 
          id="insertArea"
          value={this.state.iptVal} 
          // onChange={this.iptChange.bind(this)}  
          onChange={(e)=>this.iptChange(e)}  
        />
        <button onClick={this.btnClick.bind(this)}>提交</button>
        <ul>
        {
            this.state.list.map((elem,index)=>{
                {/* 循环渲染是要给每一项写一个key值  作为每一项的标识符
                但是一般情况下不要使用index作为key值 */}
                return <li 
                        key={index} 
                    // onClick={this.delItem.bind(this,index)}>{elem}</li>
                        onClick={(e,index)=>this.delItem(e,index)}
                        //把输入的内容当做  HTML语言来识别   危险的设置li标签内的HTML属性
                        // 会导致XSS被攻击的可能
                        dangerouslySetInnerHTML={{__html:elem}}
                    >
                        {/* {elem} */}
                    </li>
            })
        }
        </ul>
      </Fragment>
    );
  }
  iptChange(e){
    //e.target  对应的是事件所在的DOM节点  input
    this.setState({
      iptVal:e.target.value
    })
    console.log(this.state.iptVal);
  }
  btnClick(){
    let currenVal=this.state.iptVal
    if(currenVal!==""){
      this.setState(
        {
          // 把this.state.list中的内容展开，生成全新的数组
          list:[...this.state.list,this.state.iptVal]
        }
      )
       this.setState({iptVal:''})
    }
  }
  delItem(index){
    // immutable(不变的)的概念
    // 不允许this.state直接修改state的值    this.state.list.splice(index,1)
    // 将this.state拷贝出来再做修改
    let items=this.state.list
    items.splice(index,1)
    this.setState(
      {list:items}
    )
    
    
  }
  
  



}

export default TodoList;
