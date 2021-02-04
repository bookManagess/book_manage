<template>
  <div>
    <a-menu mode="inline" :open-keys="openKeys" style="width: 256px" @openChange="onOpenChange">
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="book" /><span>书库</span></span>
        <a-menu-item key="1" @click="all_book" defaultSelectedKeys defaultOpenKeys>
          所有书籍
        </a-menu-item>
        <a-menu-item key="2" @click="science_book">
         科幻
        </a-menu-item>
        <a-menu-item key="3">
          文学
        </a-menu-item>
        <a-menu-item key="4">
          推理
        </a-menu-item>
        <a-menu-item key="5">
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
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    science_book() {
      this.$store.commit("change_bookshow", "科幻");
    },
    all_book() {
      this.$store.commit("change_bookshow", "all");
    },
  },
};
</script>
