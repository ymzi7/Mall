<template>
  <div>
      <swiper>
          <swiper-item v-for="(item,index) in banners" :key="index">
            <a href="#">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
// 引入轮播图模块
import {Swiper,SwiperItem} from 'components/common/swiper/swiperIndex.js'
export default {
  props: {
      banners:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components: {Swiper,SwiperItem},
  methods: {
    imageLoad(){
      this.$emit('swiperImageLoad')
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>