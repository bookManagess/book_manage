<template>
  <div>
    <display></display>
  </div>
</template>

<style scoped>
@import "../assets/css/list.css";
</style>

<script>
import display from "../components/home/display";

export default {
  name: "home",
  components: {
    display,
  },
};
</script>
