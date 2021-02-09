<template>
  <div id="home">
    <main class="main">
      <Nav></Nav>
    </main>
    <router-view />
  </div>
</template>

<style scoped>
/* @import "../assets/css/trail.css"; */
</style>

<script>
import Nav from "../../components/nav";

export default {
  name: "Home",
  components: {
    Nav,
    // Booknav,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
