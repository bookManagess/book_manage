<template>
<div>
    <br>
  <a-row class="container">
    <a-col :span="2">
    </a-col>
    <a-col :span="20" style="background: #ffffff">
      <admintable></admintable>
    </a-col>
     <a-col :span="2">
    </a-col>
  </a-row>
</div>
  
 
</template>

<script>
import admintable from "../../components/admin_manage/admin_table";


export default {
  name: "admins",
  components: {
      admintable
  },
};
</script>

<style scoped>


</style>
