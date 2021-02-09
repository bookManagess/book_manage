<template>
  <div>
    <a-menu mode="inline" 
      :default-selected-keys="['1']"
      :default-open-keys="['sub1']"
      :open-keys="openKeys" 
      style="width: 256px" 
      @openChange="onOpenChange"
    >
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="book" /><span>书库</span></span>
        <a-menu-item key="1" @click="all_book" defaultSelectedKeys defaultOpenKeys>
          所有书籍
        </a-menu-item>
        <a-menu-item key="2" @click="science_book">
         科幻
        </a-menu-item>
        <a-menu-item key="3" @click="literature_book">
          文学
        </a-menu-item>
        <a-menu-item key="4" @click="inference_book">
          推理
        </a-menu-item>
        <a-menu-item key="5" @click="sword_book">
          武侠        
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rootSubmenuKeys: ['sub1'],
      openKeys: ['sub1'],
      defaultOpenKeys:1,
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
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
};
</script>
