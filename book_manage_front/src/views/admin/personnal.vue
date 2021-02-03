<template>
  <a-row class="container">
    <a-col :span="5">
      <personnav></personnav>
    </a-col>
    <a-col :span="16" style="background: #ffffff">
      <personlist></personlist>
    </a-col>
  </a-row>
</template>

<script>
import personnav from "../../components/person_message/person_nav";
import personlist from "../../components/person_message/person_list";

export default {
  name: "personal",
  components: { personnav, personlist },
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>

<style scoped>
.container {
  background-image: url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3761361754,1745487593&fm=26&gp=0.jpg);
  /* background-repeat: no-repeat; */
}
</style>
