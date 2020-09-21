<template>
  <div>
        <!-- 导航 -->
     <nav-bar>
         <div slot="left" class="back" @click="backClick">
             <img src="~assets/img/common/back.svg" alt="">
         </div>
        <div class="title" slot="center">
            <div v-for="(item,index) in titles" :key="index" class="title-item"
                :class="{active:index === currentIndex}" @click="active(index)"
            >{{item}}</div>
        </div>
     </nav-bar>
  </div>
</template>

<script>
// 导入导航栏
import NavBar from 'components/common/navbar/NavBar'

export default {
  data () {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    };
  },
  components: {
      NavBar,
  },
  mounted () {},
  methods: {
      active(index){
          this.currentIndex = index
          this.$emit('titleClick',index)
      },
      backClick(){
          this.$router.back()
      }
  }
}
</script>

<style scoped>
.title{
    display: flex;
    font-size: 13px;
}
.title-item{
    flex:1
}
.active{
    color: var(--color-high-text);
}
.back img{
    margin-top: 13px;
    height: 18px;
    width: 18px;
}
</style>