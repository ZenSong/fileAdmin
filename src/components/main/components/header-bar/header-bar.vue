<template>
  <div class="header-bar">
    <SiderTrigger
      :collapsed="collapsed"
      @on-change="handleCollpasedChange"
      icon="icon iconfont icondaohangzhedie"
    />

     

    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import SiderTrigger from './sider-trigger';
import CustomBreadCrumb from './custom-bread-crumb';
import './header-bar.less';
export default {
  name: 'HeaderBar',
  components: {
    SiderTrigger,
    CustomBreadCrumb
  },
  props: {
    // 折叠状态
    collapsed: {
      type: Boolean,
      require: false
    },
    //顶级菜单
    topMenuArray:{
      type:Array,
      required:true
    },
    //当前顶级菜单名字
    currentTopMenuTitle:{
      type:String,
      required:true
    }
  },
  computed: {
    // 面包屑集合
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList;
    }
  },
  methods: {
    handleCollpasedChange(state) {
      this.$emit('on-coll-change', state);
    },
    changeTopMenu(name){
      this.$emit('on-change-top-menu', name);
    }
  }
};
</script>
