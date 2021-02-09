<template>
  <div>
    <a-menu
      class="bookrecord_nav"
      mode="inline"
      :default-selected-keys="['1']"
      style="width: 256px" 
    >
      <a-menu-item key="1" @click="unapproved">
        <a-icon type="exclamation" />
        <span>未批准的借书记录</span>
      </a-menu-item>
      <a-menu-item key="2" @click="agreed">
        <a-icon type="check" />
        <span>已同意的借书记录</span>
      </a-menu-item>
      <a-menu-item key="3" @click="dismissed">
        <a-icon type="close" />
        <span>已驳回的借书记录</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  methods:{
    unapproved(){
      this.$store.commit("change_mbookrecordshow", 0);
    },
     agreed(){
      this.$store.commit("change_mbookrecordshow", 1);
    },
    dismissed(){
      this.$store.commit("change_mbookrecordshow", 2);
    }
  }
}
</script>

<style scoped>

</style>


