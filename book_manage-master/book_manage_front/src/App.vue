<template>
  <div id="App">
    <router-view></router-view>
  </div>
</template>

<style></style>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  created() {
    // 存储账号信息的代码,防止刷新后登录信息消失，具体意思，之后研究
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store")))
      );
    }
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {},
};
</script>
