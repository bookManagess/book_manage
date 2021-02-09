<template>
  <div
    class="demo-infinite-container"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="20"
  >
    <a-list :data-source="data" class="person_list">
      <a-list-item slot="renderItem" slot-scope="item" class="list_item">
        <a-list-item-meta @click="book_return(item._id, item.book_name)">
          <span slot="title"> <a-icon type="snippets" />{{ item.book_name }}</span>
        </a-list-item-meta>
        <div v-if="bookrecordshow == 'return'">借书日期:{{ item.bor_date }}</div>
        <div v-else>还书日期:{{ item.re_date }}</div>
      </a-list-item>
      <div v-if="loading && !busy" class="demo-loading-container">
        <a-spin />
      </div>
    </a-list>
    <!-- 还书对话框 -->
    <a-modal
      title="还书"
      :visible="return_visible"
      :confirm-loading="return_confirmLoading"
      @ok="return_handleOk"
      @cancel="return_handleCancel"
    >
      <p>{{ return_ModalText }}</p>
    </a-modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { request } from "../../api/index";
import infiniteScroll from "vue-infinite-scroll";

export default {
  computed: {
    // 记录即时显示
    ...mapState({
      user_name: (state) => state.login_name,
      bookrecordshow: (state) => state.bookrecordshow,
    }),
  },
  directives: { infiniteScroll },
  data() {
    return {
      data: [],
      // 滚动框提示
      loading: false,
      busy: false,
      // 对话框
      re_id: "",
      re_bookname: "",
      return_confirmLoading: false,
      return_visible: false,
      return_ModalText: "",
    };
  },
  updated() {
    request({
      url: "/bookrecord/showbookrecord",
      method: "get",
      params: {
        bor_user: this.user_name,
      },
    })
      .then((res) => {
        if (this.bookrecordshow == "search") {
          this.data = res.data.bookrecord.filter((x) => x.re_date != "0");
        } else {
          this.data = res.data.bookrecord.filter((x) => x.re_date == "0");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    bookrecordshow(val) {
      request({
        url: "/bookrecord/showbookrecord",
        method: "get",
        params: {
          bor_user: this.user_name,
        },
      })
        .then((res) => {
          if (this.bookrecordshow == "search") {
            this.data = res.data.bookrecord.filter((x) => x.re_date != "0");
          } else {
            this.data = res.data.bookrecord.filter((x) => x.re_date == "0");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  methods: {
    book_return(id, name) {
      // 记录id
      this.re_id = id;
      // 记录名称
      this.re_bookname = name;
      this.return_ModalText = "你确定要还" + "《" + name + "》" + "吗？";
      if (this.bookrecordshow == "return") {
        this.return_visible = true;
        this.bookrecordshow = "search";
      }
    },
    return_handleOk() {
      request({
        url: "/bookrecord/return",
        method: "post",
        data: {
          name: this.re_id,
        },
      })
        .then((res) => {
          if (res.data.message == "success") {
            this.return_visible = false;
            this.$message.info("归还成功");
          } else {
            this.return_visible = false;
            this.$message.info("归还失败");
          }
        })
        .catch((err) => {
          console.log(err);
          this.return_visible = false;
        });
    },
    return_handleCancel() {
      this.return_visible = false;
    },

    handleInfiniteOnLoad() {
      const data = this.data;
      // this.loading = true;
      if (data.length > 14) {
        this.$message.warning("Infinite List loaded all");
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData((res) => {
        this.data = data.concat(res.results);
        this.loading = false;
      });
    },
  },
};
</script>
<style>
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 600px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
.person_list {
  font-weight: 600;
  font-size: 28px;
  font-family: "黑体";
  color: #8c888b;
  color: transparent;
}
</style>
