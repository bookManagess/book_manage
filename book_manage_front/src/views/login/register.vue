<template>
  <section class="section">
    <spin :visible="spinVisible">
      <div class="container">
        <div class="user signinBx">
          <div class="imgBx">
            <img src="../../assets/image/login_register/library.jpg" />
          </div>
          <div class="formBx">
            <form>
              <h2>Sign In</h2>
              <a-input
                type="text"
                name=""
                placeholder="Username"
                v-model="login_name"
                auto-focus
              />
              <a-input-password
                type="password"
                placeholder="password"
                v-model="login_password"
              />
              <a href="#" @click="login">login</a>
              <h5 :tip_login="tip_login">{{ tip_login }}</h5>
              <p class="register">
                Don't have an account?<a href="#" @click="toggleForm"
                  >Sign Up</a
                >
              </p>
            </form>
          </div>
        </div>
        <div class="user signupBx">
          <div class="formBx">
            <form>
              <h2>create your account</h2>
              <a-input
                type="text"
                name=""
                placeholder="create your username"
                v-model="register_name"
              />
              <a-input-password
                name=""
                placeholder="set your password"
                v-model="register_password"
              />
              <a-input
                type="text"
                name=""
                placeholder="phone"
                v-model="register_phone"
              />
              <a href="#" @click="register">sign up</a>
              <h5 :tip_register="tip_register" style="color: red">
                {{ tip_register }}
              </h5>
              <p class="signup">
                Already have an account?<a href="#" @click="toggleForm"
                  >LogIn</a
                >
              </p>
            </form>
          </div>
          <div class="imgBx">
            <img src="../../assets/image/login_register/library.jpg" />
          </div>
        </div>
      </div>
    </spin>
  </section>
</template>

<style scoped>
@import "../../assets/css/register-style.css";
</style>

<script>
import { request } from "../../api/index";
import spin from "@/components/spin/spin.vue";

export default {
  name: "login",
  components: {
    spin,
  },
  data() {
    return {
      spinVisible: false,
      login_name: "",
      login_password: "",
      register_name: "",
      register_password: "",
      register_phone: "",
      tip_login: "",
      tip_register: "",
    };
  },
  methods: {
    toggleForm() {
      var container = document.querySelector(".container");
      container.classList.toggle("active");
    },
    login() {
      this.spinVisible = true;
      //发送请求
      request({
        url: "/admin/login",
        method: "post",
        data: {
          _id: this.login_name,
          password: this.login_password,
        },
      })
        .then((res) => {
          if (res.data.status) {
            // 为什么还能返回
            if (res.data.tip === "1") {
              this.spinVisible = false;
              this.$router.replace("/manager_home");
            } else {
              this.$router.replace("/Home");
              this.spinVisible = false;
            }
            //存储登录信息
            this.$store.commit("store_login_message", [
              this.login_name,
              this.login_password,
              res.data.phone,
            ]);
          } else {
            this.spinVisible = false;
            this.tip_login = res.data.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    register() {
      this.spinVisible = true;
      if (this.register_name && this.register_name && this.register_phone) {
        request({
          url: "admin/register",
          method: "post",
          data: {
            _id: this.register_name,
            password: this.register_password,
            phone: this.register_phone,
          },
        })
          .then((res) => {
            this.spinVisible = false;
            if (res.data.message == "success") {
              this.toggleForm();
              this.$message.info("success");
            } else {
              this.$message.info(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.spinVisible = false;
        this.$message.info("输入信息不完整");
      }
    },
  },
};
</script>

<style>
.container {
  position: relative;
  z-index: 0;
}
</style>
