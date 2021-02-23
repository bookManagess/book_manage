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
          <a-list-item-meta @click="borrow(item)">
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
      
      <!--图书详情-->
      <a-drawer
        :title="title"
        placement="right"
        :closable="false"
        :visible="visible"
        :get-container="false"
        @close="onClose"
      >
      <div style="margin-left: 20px;">
        <ul style="list-style-type:circle ">
          <li style="padding-top: 10px;">编号：{{this.borrow_book._id}}</li>
          <li style="padding-top: 10px;">书名：{{this.borrow_book.name}}</li>
          <li style="padding-top: 10px;">作者：{{this.borrow_book.author}}</li>
          <li style="padding-top: 10px;">类型：{{this.borrow_book.type}}</li>
          <li style="padding-top: 10px;">剩余数量：{{this.borrow_book.number}}</li>
          <li style="padding-top: 10px;" v-if="this.borrow_book.status=='up'">状态：已上架</li>
          <li style="padding-top: 10px;" v-else>状态：未上架</li>
        </ul>
      </div>
      <div style="margin-top: 30px;">
        <a-popconfirm
          title="你确定要借这本书吗？"
          ok-text="Yes"
          cancel-text="No"
          @confirm="borrow_handleOk"
          @cancel="cancel"
        >
          <a-button type="primary">借书</a-button>
        </a-popconfirm>
      </div>
      </a-drawer>

    </div>
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
      borrow_book: "", //记录点击书的信息
      title: "",
      ModalText: "你是否要借",
      borrow_visible: false,
      borrow_confirmLoading: false,
      // 书籍数据
      data: [],
      value: "",
      // 滚动框提示
      loading: false,
      busy: false,
      visible: false,
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
        console.log(this.data);
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
    borrow(book) {
      if (this.$store.state.login_name == "") {
        this.$message.info("请先登录");
      } else {
        this.visible = true;
        this.title = "详情 -- " + book.name;
        this.borrow_book = book;
        this.bookname= book.name;
        this.ModalText = "你确定要借" + "《" + book.name + "》" + "吗？";
        this.borrow_visible = true;
      }
    },
    onClose() {
      this.visible = false;
    },
    borrow_handleOk() {
      request({
        url: "/book/showbook",
        method: "post",
        data: {
          name: this.borrow_book.name,
        },
      })
        .then((bor_res) => {
          //生成借书记录
          request({
            url: "/bookrecord/showbookrecord",
            method: "post",
            data: {
              book_name: this.borrow_book.name,
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
