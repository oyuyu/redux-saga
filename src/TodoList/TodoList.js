import React, { Component,Fragment} from 'react';
              // 解构    
import ToggleUser from "./ToggleUser";
import TodoItem from "./TodoItem";
// import axios from 'axios';
import './todolist.css';   // 引入CSS文件


// class App extends React.Component {

//react组件的定义    TodoList这个类继承了React.Component    
class TodoList extends Component {
  // 构造函数    初始化时执行一次
  constructor(props){
    // 调用父类的构造函数    自己定义的构造函数必须要调用super()对父类进行初始化。
    // 因为子类没有自己的this对象，而是继承父类的this对象。如果不调用super方法，子类就得不到this对象。
    super(props);
    this.state={
      iptVal:'',
      list:['自律','自由'],
    }
    //性能优化1   属性初始化器语法    一般组件初始化的时候就改变this的指向   
    // 保证整个组件函数作用域的绑定只声明一次
    this.iptChange=this.iptChange.bind(this)
    this.btnClick=this.btnClick.bind(this)
  }
  // componentWillMount(){console.log('组件被挂载之前执行');}
  // componentDidMount(){console.log('组件被挂载之后执行')}
  // shouldComponentUpdate(){
  //   console.log('组件更新前执行，通过返回布尔值设置组件是否进行更新')
  //   return true
  // }
  // //shouldComponentUpdate() 返回值为true时才会被执行
  // componentWillUpdate(){console.log('组件更新前执行')}
  // componentDidUpdate(){console.log('组件更新后执行')}
  render() {
      console.log('组件渲染');  
    // JSX语法     只要使用JSX语法就要引入React  通过React对JSX语法编译识别
    // 1.外层只有一个根标签
    // 2.想在最外层包裹元素   同时又不被显示出来   用Fragment占位符包裹

    // JSX模板-->createElement-->JS对象（虚拟DOM）-->真实DOM

    // 下面两种写法效果等价
    // return <div>item</div>
    // return React.createElement('div',{},'item') 
    return (
      <Fragment>
        <ToggleUser/>
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
          onChange={this.iptChange}  
          // ref={(input)=>{this.input=input}}   refs    this.input指向当前input节点
        />
        <button onClick={this.btnClick}
                ref={(num)=>{this.num=num}}
        >提交</button>
        <ul>
           {this.TodoItem()}
        </ul>

      </Fragment>
    );
  }
  // 异步请求一般放在componentDidMount()中     ----只会执行一次
  // componentDidMount(){
  //   axios.get('/api/todolist')
  //   .then((res)=>{
  //     alert('success')
  //     console.log(res);
  //     // let list=JSON.parse(res.data)  //为什么这样不对
  //     let list=eval(res.data)     //eval('....')   执行' '内的内容
  //     this.setState(()=>
  //     ({
  //         list:[...list]})
  //     )
  //   }).catch(()=>{alert('error')})

  // }

   // 通常情况下render里面是HTML代码   不做逻辑操作     若有逻辑操作通常将它单拉出来
  TodoItem(){
    const list=this.state.list
    //循环渲染是要给每一项写一个key值  作为每一项的标识符
    //key值要放在循环的最外层元素上
    //但是一般情况下不要使用index作为key值  state改变时 index也改变   新旧虚拟DOM的关联关系就不好用了*/}
    //性能提升3  使用key值是为了提升虚拟DOM比对的速度
    console.log(list)
    return (
      list.map((elem,index)=>{
        return (
       
                <TodoItem  key={elem}  item={elem} delItem={this.delItem.bind(this)}/>
           

         
        )
        
      })
    )

  }
  iptChange(e){
    //e.target  对应事件所在的DOM节点  input
    // 1.this.setState({iptVal:e.target.value})
    // 2.this.setState(()=>{
    //   return{
    //     iptVal:e.target.value
    //   }
      
    // })
    // setState里传函数   是异步的(为了提升性能--降低了虚拟DOM的比对频率) 需要先对value值做保存
    const value=e.target.value
    // const value=this.iptVal.value    利用ref直接获取DOM元素
    this.setState(()=>({iptVal:value}),()=>{
    })
    console.log(this.state.iptVal);
  }
  btnClick(){
    let currenVal=this.state.iptVal
    if(currenVal!==""){
      // this.setState(
      //   {
      //     // 把this.state.list中的内容展开，生成全新的数组
      //     list:[...this.state.list,this.state.iptVal],
      //     iptVal:''
      //   }
      // )
      this.setState((pravState)=>(
        {
          // 把this.state.list中的内容展开，生成全新的数组
          // list:[...this.state.list,this.state.iptVal],
          list:[...pravState.list,pravState.iptVal],
          iptVal:''
        }),()=>{console.log("异步操作完成后执行");})
    }
  }
  delItem(e){
    let index=e.target.value
    let list=this.state.list
    console.log(list);
    if(window.confirm("是否删除代办事项:  "+list.slice(index,index+1))){
      this.setState(()=>{
        list.splice(index,1)
        return{list:[...list]}
      },()=>{console.log('didDELete');
      })
  }

  }
  

}

export default TodoList;
