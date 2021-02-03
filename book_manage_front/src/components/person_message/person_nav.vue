<template>
  <div style="width: 256px">
    <div class="logos">
      <span class="logo" v-if="this.$store.state.login_name == ''">请先登录</span>
      <span class="logo" v-else>
        {{ this.$store.state.login_name }}
      </span>
    </div>
    <a-menu
      class="personnal_nav"
      theme="dark"
      mode="inline"
      :default-selected-keys="['1']"
    >
      <a-menu-item key="1" @click="all_record">
        <a-icon type="exclamation" />
        <span>已还书籍</span>
      </a-menu-item>
      <a-menu-item key="2" @click="return_record">
        <a-icon type="close" />
        <span>未还书籍</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="user" />
        <span @click="change_password">修改密码</span>
      </a-menu-item>
    </a-menu>
    <!-- 修改密码对话框 -->
    <a-modal
      title="修改密码"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <h3 style="color: red">{{ tip }}</h3>
      账号：<a-input
        type="text"
        placeholder="Username"
        v-model="user_name"
        auto-focus
        disabled="true"
      /><br /><br />
      旧密码：<a-input-password
        type="password"
        placeholder="old_password"
        v-model="old_password"
      /><br /><br />
      新密码：<a-input-password
        type="password"
        placeholder="new_password"
        v-model="new_password"
      /><br /><br />
      重复密码:<a-input-password
        type="password"
        placeholder="repeat_password"
        v-model="repeat_password"
      />
    </a-modal>
  </div>
</template>
<script>
import { request } from "../../api/index";

export default {
  name: "person_nav",
  data() {
    return {
      // 修改密码
      tip: "",
      user_name: "",
      old_password: "",
      new_password: "",
      repeat_password: "",
      visible: false,
      confirmLoading: false,
    };
  },
  methods: {
    // 导航栏状态
    all_record() {
      this.$store.commit("change_bookrecordshow", "search");
    },
    return_record() {
      this.$store.commit("change_bookrecordshow", "return");
    },
    // 对话框函数
    change_password() {
      this.user_name = this.$store.state.login_name;
      this.visible = true;
    },
    handleOk(e) {
      if (this.repeat_password != this.new_password) {
        this.tip = "重复密码不一致";
        this.new_password = "";
        this.repeat_password = "";
      } else if (
        this.old_password != this.$store.state.login_password ||
        this.user_name != this.$store.state.login_name
      ) {
        this.tip = "旧密码输入错误";
        this.old_password = "";
      } else {
        request({
          url: "/admin/change_password",
          method: "post",
          data: {
            user_name: this.user_name,
            new_password: this.new_password,
          },
        })
          .then((res) => {
            if (res.data.message == "success") {
              this.visible = false;
              this.$message.info("修改成功");
            } else {
              this.visible = false;
              this.$message.info("修改失败");
            }
          })
          .catch((err) => {
            console.log(err);
            this.visible = false;
          });
      }
    },
    handleCancel(e) {
      this.visible = false;
    },
  },
};
</script>
<style>
.logos {
  background: #001529;
  height: 40px;
}
.logo {
  /* text-decoration: blink;闪烁 */
  text-align: center;
  font-size: 25px;
  font-family: "Courier New", Courier, monospace;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  /* ??? */
  margin: 76px;
}
.personnal_nav {
  height: 100vh;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>
