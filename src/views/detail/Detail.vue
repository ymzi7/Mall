<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"  @titleClick="titleClick" ref="nav" /> 
    <scroll class="content" ref="scroll" @scroll="contenttScroll"  >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramsInfo" ref="params" />
      <deatil-comment-info :commentInfo="commentInfo" ref="common" />
      <goods-list :goods="goodsList" ref="recommend" @itemImageLoad="imageLoad" />
     </scroll>
    <detail-bottom-bar  />
    <back-top   @click.native="backClick" v-show="isShowBackTop" />
     
  </div>
</template>

<script>

import DetailNavBar from './childComps/DetaiNavBar'
// 网络请求
import {getDetail,getRecommend,Goods,Shop, GoodsParam} from 'network/detail'
// 轮播图
import DetailSwiper from './childComps/DetailSwiper' 
// 商品信息
import DetailBaseInfo from './childComps/DetailBaseInfo'
// 店铺信息
import DetailShopInfo from './childComps/DetailShopInfo'
// 滚动插件
import Scroll from 'components/common/scroll/Scroll'
// 商品详情
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
// 参数信息
import DetailParamInfo from './childComps/DetailParamInfo.vue'
// 评论信息
import DeatilCommentInfo from './childComps/DetailCommentInfo'
// 推荐商品
import GoodsList from 'components/content/goods/GoodsList'
// 底部导航
import DetailBottomBar from './childComps/DetailBottomBar'
// 回到顶部
import BackTop from 'components/content/backTop/BackTop'

export default {
  name:"Detail",
  data () {
    return {
      iid:'',
      // 轮播图数据
      topImages:[],
      // 商品数据
      goods:{},
      // 店铺信息
      shop:{},
      // 商品详情
      detailInfo:{},
      // 参数信息
      paramsInfo:{},
      // 评论信息
      commentInfo:{},
      // 推荐信息
      goodsList:[],
      // 高度信息
      themeTopYs:[],
      currentIndex:0,
       // 回到顶部插件的显示与隐藏
      isShowBackTop:false,
    };
  },
  created () {
    // 保存iid
      this.iid = this.$route.query.iid
    // 根据iid请求数据
    this.getDetail()
    // 获取商品信息
    this.getRecommend()
      
      
  },
  components: {
   DetailNavBar,
   DetailSwiper,
   DetailBaseInfo,
   DetailShopInfo,
   Scroll,
   DetailGoodsInfo,
   DetailParamInfo,
   DeatilCommentInfo,
   GoodsList,
   DetailBottomBar,
   BackTop
  },
  methods: {
    // 图片加载
    imageLoad(){
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.common.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    },
    // 获取商品信息
    getDetail(){
         getDetail(this.iid).then(res=>{
        const data = res.result
        // 获取轮播数据
        this.topImages =data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 获取商品详情数据
        this.detailInfo = data.detailInfo
        // 获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 获取评论信息
        if(data.rate.list){
            this.commentInfo = data.rate.list[0];
        }
      })
    },
    // 获取推荐信息    
    getRecommend(){
       getRecommend().then(res=>{
          this.goodsList = res.data.list 
        })
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
    },
    contenttScroll(position){
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i = 0;i<length;i++){
        if(this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.$refs.nav.currentIndex = i
        }
      }
        // 判断BackTop是否显示
     this.isShowBackTop = (-position.y) > 1000
    },
     // 回到顶部
    backClick(){
     this.$refs.scroll.scrollTo(0,0,300)
    },
  
  }
}
</script>

<style  scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 44px - 49px);
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>