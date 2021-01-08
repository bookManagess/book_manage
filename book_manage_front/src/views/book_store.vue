<template>
  <a-row class="container">
    <a-col :span="5">
      <booknav></booknav>
    </a-col>
    <a-col :span="16" style="background: #ffffff">
      <booklist></booklist>
    </a-col>
  </a-row>
</template>

<script>
import booknav from "../components/book_store/book_nav";
import booklist from "../components/book_store/book_list";

export default {
  name: "books",
  components: {
    booknav,
    booklist,
  },
};
</script>

<style scoped>
.container {
  background-image: url(https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2455805291,534868076&fm=26&gp=0.jpg);
  /* background-repeat: no-repeat; */
}
.book_store {
}
</style>
