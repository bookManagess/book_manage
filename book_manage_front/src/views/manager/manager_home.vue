<template>
    <div id="manager_home">
      <main class="main">
        <manager_nav></manager_nav>
        <div class="user">
          <img src="../../assets/image/usertip/user.png" alt="user" style="width:55px;height:46px;"/>
          <span class="usertip">
            <h3>- 个人信息 -</h3>
            <h4>用户名：{{ this.$store.state.login_name }}</h4>
            <h4>密  码：
              <input type="password" v-model="this.$store.state.login_password" disabled/>
              <label><img id="eye" @click="eye" src="../../assets/image/usertip/close.jpg" style="width: 15px;"></label>
            </h4>
            <h4>电 话：{{ this.$store.state.login_phone }}</h4>
          </span>
        </div>
      </main>
      <router-view />
    </div>
  </template>
  
  <style scoped>
  /* @import "../../assets/css/trail.css" */
  .box{
    margin-top:60px;
  }
  .logo{
    margin-left: 90%;
    margin-top:200px;
    margin-bottom: 0px;
    padding:150px 0 0 0;
  }
  .user .usertip{
    margin-top: 5px;
    visibility: hidden;
    background-color: rgb(240, 238, 238);
    padding: 5px 13px 5px 13px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
  }
  .user{
    display: inline-block;
  }
  .user .usertip::after {
    content: "";
    position: absolute;
    top: 20%;
    right: 100%;
    margin-top: -5px;
    border-width: 6px;
    border-style: solid;
    border-color: transparent rgb(240, 238, 238) transparent transparent;
  }
  .user:hover .usertip{
    visibility: visible;
  }
  .user .usertip input{
    width: 40px;
		height: 15px;
		border: 0;
		outline: none;
    background-color: rgb(240, 238, 238);	
  }
  
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
    methods: {
      eye() {
        let eye = document.getElementById("eye");
			  let pwd = document.querySelector("input");
        if (pwd.type == "password") {
					pwd.type = "text";
					eye.src = "http://localhost:8080/img/open.2178dad3.jpg";
				} else {
					pwd.type = "password";
					eye.src = "http://localhost:8080/img/close.a4abe2d5.jpg";
				}
      }
    },
  };
  </script>