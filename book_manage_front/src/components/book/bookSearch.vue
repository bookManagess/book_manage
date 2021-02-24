<template>
  <div >
        <bookNew></bookNew>
    <div  id="Search">
    <a-input-search placeholder="请输入书籍信息" style="width: 200px"  v-model="booksearch"/>
    </div>
  </div>
</template>

<script>
import bookNew from "./bookNew"
export default {
  computed: {
   booksearch: {
    get () {
      return this.$store.state.booksearch
    },
    set (val) {
      this.$store.commit('booksearch', val)
    }
  }
  },
  components:{bookNew},
  data(){
    return{
    visible : false,
    value:"",
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
