<template>
  <div id="bookSearch">
    <span>
      <a-button id="new" @click="handleAdd">上架图书</a-button>
      <a-modal v-model="visible" title="上架图书" ok-text="确认" cancel-text="取消" @ok="hideModal">
        <bookNew></bookNew>
        </a-modal>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </span>
    <div  id="Search">
      <span>图书搜索</span>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a-input-search placeholder="请输入书籍信息" style="width: 200px"  />
    </div>
  </div>
</template>

<script>
import bookNew from "./bookNew"
export default {
  components:{bookNew},
  data(){
    return{
    visible : false,
    };
  },
  methods: {
    handleAdd() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
    confirm() {
      this.$confirm({
        title: 'Confirm',
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消',
      });
    },
  },
};
</script>
<style >
#new{
  float: left;
}
#Search{
  text-align: center;
  margin: 0px auto;
}
</style>
