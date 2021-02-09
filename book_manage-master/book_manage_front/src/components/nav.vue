<template>
  <div>
    <div id="home">
      <main class="nav">
        <a href="#" @click="go_home">首页</a>
        <a href="#" @click="go_person">个人信息</a>
        <a href="#" @click="go_book">书库</a>
        <a href="#" @click="go_login">返回</a>
        <div class="animation" start-home></div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {};
  },
  methods: {
    go_home() {
      this.$router.push("/home");
    },
    go_person() {
      this.$router.push("/home/person");
    },
    go_book() {
      this.$router.push("/home/book");
    },
    go_login() {
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.nav {
  position: relative;
  margin: 0;
  width: 100vw;
  height: 100px;
  background: #34495e;
  border-radius: 8px;
  font-size: 0;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.5);
}
.nav a {
  font-size: 15px;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  line-height: 100px;
  position: relative; /*or it will just be hidden*/
  display: inline-block;
  text-align: center;
  z-index: 1;
}
.nav .animation {
  position: absolute;
  height: 100%;
  bottom: 0;
  z-index: 0;
  background: #1abc9c;
  border-radius: 8px;
  transition: all 0.5s ease 0s;
}
a:nth-child(1) {
  width: 25vw;
}
.nav .start-home,
a:nth-child(1):hover ~ .animation {
  width: 25vw;
  left: 0;
}
a:nth-child(2) {
  width: 25vw;
}
.nav .start-home,
a:nth-child(2):hover ~ .animation {
  width: 25vw;
  left: 25vw;
}
a:nth-child(3) {
  width: 25vw;
}
.nav .start-home,
a:nth-child(3):hover ~ .animation {
  width: 25vw;
  left: 50vw;
}
a:nth-child(4) {
  width: 25vw;
}
.nav .start-home,
a:nth-child(4):hover ~ .animation {
  width: 25vw;
  left: 75vw;
}
</style>
