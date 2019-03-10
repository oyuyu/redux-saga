import React from 'react';
import ReactDOM from 'react-dom';  //项目运行的核心
// 加载TodoList文件
import TodoList from './TodoList/TodoList';


// 把组件挂载到某个DOM节点上     直接通过标签形式使用自定义组件    组件名以大写字母开头
// 只去渲染id=root的节点
ReactDOM.render(<TodoList />, document.getElementById('root'));


// serviceWorker.unregister();
