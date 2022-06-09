const router = {
  routes: [
    {
      name: '',
      path: '/home',
      component: {
        default: Home,
        one: Foo,
        two: Bar
      }
    }
  ]
}


data(){
  return {
    list: []
  }
}
beforeRouteEnter(to, from, next){
  axios.get().then(res=>{
    // 当前组件实例化之后，会执行我们传给next的回调函数
    next((vm)=>{
      vm.list = res.data.list;
    })
  })
}

const router = new VueRouter({
  mode: 'history',
  base: 'xxx',
  routes:[
    { path: '/', component: Home},
  ],
  scrollBehavior( to, from, savedPosition ){
    // 位置记忆
    if( savedPosition ){
      return savedPosition;
    }
    
    // 设置顶部间距
    return {
      x: 0,
      y: 100
    }
    
    // 切换路由时，滚动到某个 DOM 的位置
    // 比如我们在切换路由时，把需要定位的DOM Id通过hash传过来
    if( to.hash ){
      return {
        selector: to.hash,// '#hanBtn',
        // 调整滚动位置,以 DOM 位置为基准
        offset: {
          y: 100
        },
        // 设置滚动效果
        behavior: "smooth"
      }
    }
  }
})


