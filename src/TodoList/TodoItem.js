import React ,{Component} from 'react';
//子组件要接收的  从父组件传递过来的属性值是什么类型是固定的     比如items应该是一个数组  delItem应该是个函数
//可以使用propTypes做属性接收的强校验   限制父组件给子组件传值的类型是什么样的
import PropTypes from 'prop-types';

import './TodoItem.css'

import { CSSTransition } from 'react-transition-group'
import './ToggleUser_transition_group.css'



class TodoItem extends Component{
    constructor(props){
        super(props)
    }
    // componentWillReceiveProps(){console.log('props发生变化时执行'); }
    // componentWillUnmount(){console.log('子组件即将被移除前执行'); }

    // 性能优化4：输入框并不是每输入一个字符子组件都要重新渲染一次   只有当点击提交（state、items发生变化时）
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.item!==this.props.item){
            return true
        }else{ 
            return false
        }
       
    }
    render(){
        const {item,text,delItem}=this.props
        const r = Math.round(Math.random()*255);
 
        const g = Math.round(Math.random()*255);
        const b = Math.round(Math.random()*255);
        const a = ( (Math.random()*5 + 5) / 10 ).toFixed(2)
        const color = `rgba(${r},${g},${b},${a})`
        console.log(color);
        


        return (
            <CSSTransition
                in={true}
                // 第一次展示时也有动画效果
                appear={true}
                // 动画要执行多久
                timeout={300}
                classNames='fade'
                //in=false时  该DOM节点被移除
                // unmountOnExit
                // 钩子函数
                onEntered={(e)=>{
                    e.style.color=color 
                }}
            >
                <li className='item' 
                    onClick={(e)=>delItem(e)}
                    //把输入的内容当做  HTML语言来识别   输入<h2>hello</h2>   显示二级标题形式的hello
                    //危险的设置li标签内的HTML属性 会导致XSS被攻击的可能
                    // dangerouslySetInnerHTML={{__html:elem}}
                >
                    {text}-{item}
                </li>
            </CSSTransition>

        )
        
    }
   
    
  
    // delItem(index){
    //     // state只存在于定义它的组件中     为什么能用setState进行修改呢？   
    //     // 这种方式是错误的 要保证数据的单向流动性   不能直接修改父组件中的数据
        
    //     const {items}=this.props    //解构赋值
    //     //items=[]    this.pops传来的值只能被使用  不能被修改
    //     if(window.confirm("是否删除代办事项:  "+items.slice(index,index+1))){
    //         items.splice(index,1)
    //         this.setState(()=>({list:items}))
    //     }

       
    // }

    
}
// 对传来的属性值做类型的强校验  且text必传
TodoItem.propTypes={
    text:PropTypes.string.isRequired,
    // content的类型不仅可以是number  也可以是string
    // content:PropTypes.arrayOf(PropTypes.number,PropTypes.string)

    //限制为列举类型之      items可以是number或string    
    // items:PropTypes.oneOfType([PropTypes.number,PropTypes.string]),

    // 指定为限制类型的数组
    items:PropTypes.arrayOf(PropTypes.string),
    delItem:PropTypes.func
}
// 假设父组件没传的时候设置默认属性值
TodoItem.defaultProps={
    text:"待办"
}
export default TodoItem;
