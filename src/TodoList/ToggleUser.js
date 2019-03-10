import React, { Component } from 'react';

//辅助动画组件
import { CSSTransition } from 'react-transition-group'
import './ToggleUser_transition_group.css'

// import './ToggleUser.css';

class ToggleUser extends Component{
    constructor(props){
        super(props)
        this.toggle=this.toggle.bind(this)
        this.state={
            show:true
        }
    }  
    render (){
        return(
            <div className='toggleName'>
                <CSSTransition
                    // 什么时候该增加样式
                    in={this.state.show}
                    // 第一次展示时也有动画效果
                    appear={true}
                    // 动画要执行多久
                    timeout={1000}
                    classNames='fade'
                    //in=false时  该DOM节点被移除
                    // unmountOnExit
                    // 钩子函数
                    onEntered={(e)=>{
                        e.style.color="red"
                    }}

                >
                    <span className="uName">哦_是鱼鱼呀</span> 
                </CSSTransition>
                {/* <span className={this.state.show?'show':'hide'} >哦_是鱼鱼呀</span>   */}
                <button onClick={this.toggle}>{this.state.show?'hideName':'showName'}</button>
            </div>
        )
    }
    toggle(){
        const beforState=this.state.show
        this.setState(()=>({show:!beforState}))

    }
}

export default ToggleUser