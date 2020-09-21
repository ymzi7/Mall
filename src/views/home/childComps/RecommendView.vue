<template>
  <div class="recommend">
      <div v-for="(item,index) in recommends" :key="index" class="recommmeds-item">
          <a href="#">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
  props: {
      recommends:{
          type:Array,
          default(){
              return []
          }
      }
  }
  
}
</script>

<style  scoped>
.recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 5px 0;
    border-bottom: 10px solid #eee;
}
.recommmeds-item{
    flex: 1;
}
.recommmeds-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
</style>