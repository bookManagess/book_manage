<template>
  <a-row class="container">
    <a-col :span="5">
      <bookrecordNav></bookrecordNav>
    </a-col>
    <a-col :span="18" style="background: #ffffff">
      <record></record>
    </a-col>
  </a-row>
</template>

<script>
import record from "../../components/borrow_record/record.vue";
import bookrecordNav from "../../components/borrow_record/bookrecord_nav.vue";

export default {
  name:"bookRecord",
  components: {
    record,
    bookrecordNav
  },
  data(){
    return{

    }
  }
};
</script>

<style scoped>
.containter{
  height: 100%;
  width: 100%;
}

</style>