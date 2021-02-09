<template>
  <div style="width: 256px">
    <a-menu
      class="book_nav"
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      mode="inline"
      theme="dark"
    >
      <a-menu-item key="1" @click="all_book">
        <a-icon type="appstore" />
        <span>所有书籍</span>
      </a-menu-item>
      <a-menu-item key="2" @click="science_book">
        <a-icon type="desktop" />
        <span>科幻</span>
      </a-menu-item>
      <a-menu-item key="3" @click="literature_book">
        <a-icon type="read" />
        <span>文学</span> </a-menu-item
      ><a-menu-item key="4" @click="inference_book">
        <a-icon type="unlock" />
        <span>推理</span> </a-menu-item
      ><a-menu-item key="5" @click="sword_book">
        <a-icon type="chrome" theme="filled" />
        <span>武侠</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: "booknav",
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    all_book() {
      this.$store.commit("change_bookshow", "all");
    },
    science_book() {
      this.$store.commit("change_bookshow", "科幻");
    },
    literature_book() {
      this.$store.commit("change_bookshow", "文学");
    },
    inference_book() {
      this.$store.commit("change_bookshow", "推理");
    },
    sword_book() {
      this.$store.commit("change_bookshow", "武侠");
    },
  },
};
</script>

<style scoped>
.book_nav {
  height: 100vh;
}
</style>
