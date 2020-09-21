<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
// 引入better-scroll
  import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  data () {   
    return {    
        scroll:null,
    };
  },
  mounted () {
    // 创建BScrpll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:3,
        pullUpLoad:this.pullUpLoad
    }),
    // 监听滚动的位置
     this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position)
      }),
    this.scroll.refresh()
    // 监听上拉加载事件
    this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
    })
  },
  methods: {
    // 回到顶部
      scrollTo(x,y,time){
        this.scroll.scrollTo(x,y,time)
      },
    // 上拉加载更多
      finishPullUp() {
       this.scroll.finishPullUp()
      },
    // 重新加载
    refresh(){
        this.scroll.refresh()
    }
  },
 
}
</script>

<style scoped>
</style>