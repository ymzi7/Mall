<template>
  <div id="home" class="wrapper">
    <!-- 顶部导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 标题栏 -->
    <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' ref="tabControl1"  class="tab-control" v-show="isFixed"/>
    <!-- 中间滚动 -->
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up="true" @scroll="contentScroll" @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad' />
      <!-- 推荐模块 -->
      <recommend-view :recommends='recommends' />
      <!-- 流行模块 -->
      <feature-view />
      <!-- 标题栏 -->
      <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' ref="tabControl2"  />
       <!-- 商品 -->
       <goods-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部 -->
    <back-top   @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 顶部导航模块
import NavBar from 'components/common/navbar/NavBar'
// 网络请求模块
import {getHomeMultidata,getHomeGoods} from 'network/home'
// 轮播图模块
import HomeSwiper from './childComps/HomeSwiper'
// 推荐模块
import RecommendView from './childComps/RecommendView'
// 流行模块
import FeatureView from './childComps/FeatureView'
// 标题模块
import TabControl from 'components/content/tabControl/TabControl'
// 商品模块
import GoodsList from 'components/content/goods/GoodsList'
// 滚动模块
import Scroll from 'components/common/scroll/Scroll'
// 回到顶部
import BackTop from 'components/content/backTop/BackTop'
export default {
   components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop  
  },
  data () {
    return {
      // 轮播图数据
      banners:[],
      // 推荐数据
      recommends:[],
      // 商品数据
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      // 加载类型
      currentType:'pop',
      // 回到顶部插件的显示与隐藏
      isShowBackTop:false,
      // 标题栏高度
      tabOffsetTop:0,
      // 判断是否显示
      isFixed:false,
      // 保存离开位置
      saveY:0
    };
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created () {
    // 请求轮播图数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
   // 监听图片加载
     const refresh = this.debounce(this.$refs.scroll.refresh,500)
     this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })
    

  },
  activated () {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
  },
  deactivated () {
      this.saveY = this.$refs.scroll.scroll.y
  },
  methods: {
    // 事间监听方法
   tabClick(index){
      switch(index){
        case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    // 回到顶部
    backClick(){
     this.$refs.scroll.scrollTo(0,0,300)
    },
    // 根据滚动位置判断显示与隐藏
    contentScroll(position){
    // 判断BackTop是否显示
     this.isShowBackTop = (-position.y) > 1000
    // 判断tabControl是否吸顶 
    this.isFixed = (-position.y) > this.tabOffsetTop
    },
    // 加载更多
    loadMore(){
       this.getHomeGoods(this.currentType)
    },
    // 判断轮播图片加载获取tabControl的OffsetTop
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 网络请求方法
    // 获取轮播图与推荐数据 
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    // 获取商品数据
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
    // 防抖函数
    debounce(fun,delay){
      let timer = null
      return function(...args){
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
          fun.apply(this,args)
        },delay)
      }
    }
  },

}
</script>

<style  scoped>
#home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>