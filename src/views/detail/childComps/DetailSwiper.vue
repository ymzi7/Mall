<template>
  <div >
      <swiper>
          <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/swiperIndex.js'

export default {
  props: {
      topImages:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data () {
    return {
      
    };
  },
  components: {Swiper,SwiperItem},
  mounted () {},
  methods: {}
}
</script>

<style  scoped>
.swiper-item{
    height: 250px;
}
</style>