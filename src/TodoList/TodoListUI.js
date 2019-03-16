// UI 组件只放要被渲染的内容


// import React, { Component,Fragment} from 'react';  
import React, {Fragment} from 'react';  
import {Input,Button,List} from 'antd'
import 'antd/dist/antd.css';

// class TodoListUI extends Component{
//     // constructor(props){
//     //     super(props)
//     //   }
//     render(){
//         const {disabled,iptVal,iptValC,addItem,list,itemColor,delItem}=this.props
//         return(
//         <Fragment>
//             <label htmlFor="insertArea" style={{fontSize:'16px',marginLeft:'15px'}}>添加代办：</label> 
        
//             <Input id="insertArea"
//                 style={{width:'50%',marginLeft:'5px',marginRight:'5px'}}
//                 value={iptVal}
//                 onChange={iptValC}
//             /> 
//             <Button type="primary" disabled={disabled}
//                     onClick={addItem}
//             >提交</Button>
//             <List
//                 style={{width:'50%',marginLeft:'100px'}}
//                 // header={<div>Header</div>}
//                 // footer={<div>from 哦_是鱼鱼呀</div>}
//                 // 列表边框
//                 bordered
//                 // 列表要渲染什么内容
//                 dataSource={list}
//                 // 怎么渲染内容---data中的每条数据都会调用renderItem()进行渲染
//                 //每条数据渲染成 <List.Item>这样的小组件    数据内容为 item
//                 renderItem={(item,index) => (
//                     <List.Item style={{color:itemColor}}
//                     onClick={()=>delItem(index,item)}
//                     >{item}</List.Item>)}
//             />
//         </Fragment>
//    )   
//   }
// }



// 无状态组件    当一个普通UI组件只有render函数时可用无状态组件替换普通组件
// 优势：性能高  因为他就是一个函数
// 什么时候用：定义了一个UI组件  只进行页面渲染，没有任何逻辑操作的时候
const TodoListUI=(props)=>{
        return(
        <Fragment>
            <label htmlFor="insertArea" style={{fontSize:'16px',marginLeft:'15px'}}>添加代办：</label> 
        
            <Input id="insertArea"
                style={{width:'50%',marginLeft:'5px',marginRight:'5px'}}
                value={props.iptVal}
                onChange={props.iptValC}
            /> 
            <Button type="primary" disabled={props.disabled}
                    onClick={props.addItem}
            >提交</Button>
            <List
                style={{width:'50%',marginLeft:'100px'}}
                // header={<div>Header</div>}
                // footer={<div>from 哦_是鱼鱼呀</div>}
                // 列表边框
                bordered
                // 列表要渲染什么内容
                dataSource={props.list}
                // 怎么渲染内容---data中的每条数据都会调用renderItem()进行渲染
                //每条数据渲染成 <List.Item>这样的小组件    数据内容为 item
                renderItem={(item,index) => (
                    <List.Item style={{color:props.itemColor}}
                    onClick={()=>props.delItem(index,item)}
                    >{item}</List.Item>)}
            />
        </Fragment>
   )   
  }
export default TodoListUI;