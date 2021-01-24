<template>
    <div id="manager_home">
      <main class="main">
        <manager_nav></manager_nav>
      </main>
      <router-view />
    </div>
  </template>
  
  <style scoped>
  /* @import "../assets/css/trail.css"; */
  </style>
  
  <script>
  import manager_nav from "../../components/manager_nav";
  
  export default {
    name: "manager_home",
    components: {
      manager_nav,
      // Booknav,
    },
    data() {
      return {};
    },
    methods: {},
  };
  </script>