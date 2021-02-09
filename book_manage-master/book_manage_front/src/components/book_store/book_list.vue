<template>
  <div class="book_store">
    <div class="book_search">
      <a-auto-complete
        class="search_text"
        v-model="value"
        style="width: 200px"
        placeholder="请输入想要查看的书名/作者"
        auto-focus
      />
    </div>
    <br />
    <div
      class="demo-infinite-container"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="20"
    >
      <a-list :data-source="data" class="book_list">
        <a-list-item slot="renderItem" slot-scope="item" class="list_item">
          <a-list-item-meta @click="borrow(item.name)">
            <div slot="title" class="list_font">
              <img :src="item.url" height="100px" width="150px" />
              {{ item.name }}
            </div>
          </a-list-item-meta>
          <div>作者:{{ item.author }}</div>
        </a-list-item>
        <div v-if="loading && !busy" class="demo-loading-container">
          <a-spin />
        </div>
      </a-list>
    </div>

    <!-- 借书对话框 -->
    <a-modal
      title="借书"
      :visible="borrow_visible"
      :confirm-loading="borrow_confirmLoading"
      @ok="borrow_handleOk"
      @cancel="borrow_handleCancel"
    >
      <p>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { request } from "../../api/index";
import infiniteScroll from "vue-infinite-scroll";
import booksearch from "../book_store/book_search";

export default {
  computed: {
    // 记录即时显示
    ...mapState({
      bookshow: (state) => state.bookshow,
    }),
  },
  directives: { infiniteScroll },
  components: { booksearch },
  data() {
    return {
      // 借书对话框提示
      bookname: "", //记录点击书的名字
      ModalText: "你是否要借",
      borrow_visible: false,
      borrow_confirmLoading: false,
      // 书籍数据
      data: [],
      value: "",
      // 滚动框提示
      loading: false,
      busy: false,
    };
  },
  created() {
    request({
      url: "/book/showbook",
      method: "get",
      params: {
        type: this.bookshow,
      },
    })
      .then((res) => {
        this.data = res.data.book;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
    bookshow(val) {
      console.log(this.bookshow);
      // this作用域问题
      request({
        url: "/book/showbook",
        method: "get",
        params: {
          type: this.bookshow,
        },
      })
        .then((res) => {
          this.data = res.data.book;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 此处为搜索框函数
    value(val) {
      request({
        url: "/book/findbook",
        method: "post",
        data: {
          rough_word: val,
        },
      })
        .then((res) => {
          this.data = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  methods: {
    borrow(name) {
      if (this.$store.state.login_name == "") {
        this.$message.info("请先登录");
      } else {
        this.bookname = name;
        this.ModalText = "你确定要借" + "《" + name + "》" + "吗？";
        this.borrow_visible = true;
      }
    },
    borrow_handleOk() {
      request({
        url: "/book/showbook",
        method: "post",
        data: {
          name: this.bookname,
        },
      })
        .then((bor_res) => {
          //生成借书记录
          request({
            url: "/bookrecord/showbookrecord",
            method: "post",
            data: {
              book_name: this.bookname,
              bor_user: this.$store.state.login_name,
            },
          })
            .then((record_res) => {
              if (bor_res.data.message == "success") {
                this.borrow_visible = false;
                this.$message.info("借书成功");
              } else {
                this.borrow_visible = false;
                this.$message.info("借书失败");
              }
              console.log(record_res); //
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          this.borrow_visible = false;
        });
    },
    borrow_handleCancel() {
      this.borrow_visible = false;
    },
  },
};
</script>

<style>
.list_font {
  font-size: 20px;
}
.book_search {
  display: flex;
  justify-content: center;
}
.book_list {
  font-weight: 600;
  font-size: 28px;
  font-family: "黑体";
  color: #8c888bb6;
  color: transparent;
}
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
</style>
