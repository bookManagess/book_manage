<template>
  <div>
    <br />
    <a-input-search
      class="search_text"
      placeholder="请输入想要查看的内容"
      style="width: 200px"
    />
    <br />

    <div>
      <a-table
        class="record_table"
        :columns="columns"
        :data-source="data"
        :rowKey="record=>record._id"
        :pagination="ipagination"
        @change="pageChange"
        bordered
        :scroll="{ y: 240 }"
      >
        <template slot="action" slot-scope="text,record">
          <span v-if="statechange==0">
          <a-button type="primary" @click="agree(text,record)"> 同意 </a-button>
          <a-divider type="vertical" />
          <a-button type="danger" @click="dismiss(text,record)"> 驳回 </a-button>
          </span>

          <span v-else-if="statechange==1">
            <a-tag color="geekblue">已同意</a-tag>
          </span>

          <span v-else>
            <a-tag color="red">已驳回</a-tag>
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { request } from "../../api/index";

const columns = [
  {
    title: "用户名",
    dataIndex: "bor_user",
    key: "name",
  },
  {
    title: "借书书目",
    dataIndex: "book_name",
    key: "book",
  },
  {
    title: "借书日期",
    dataIndex: "bor_date",
    key: "date",
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [];
export default {
  computed: {
    ...mapState({
      statechange: (state) => state.mbookrecordshow,
    }),
  },
  data() {
    return {
      data: [],
      columns,
      ipagination: {
        current: 1,
        pageSize: 5,
        total: data.length,
        showSizeChanger: true,
        showQuickJumper: true,
        //hideOnSinglePage:true, // 少于一页时隐藏分页
        pageSizeOptions: ["5", "10", "15"], //这里注意只能是字符串，不能是数字
        showTotal: (total, range) =>
          `显示${range[0]}-${range[1]}条，共有 ${total}条`,
      },
    };
  },
  async created() {
    this.getRecord();
  },
  watch: {
    statechange(val) {
      request({
        url: "/bookrecord/getbookrecord",
        method: "get",
      })
        .then((res) => {
          this.data = res.data.bookrecord.filter((n) => n._v == val);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  methods: {
    async getRecord() {
      const { data } = await request({
        url: "/bookrecord/getbookrecord",
        method: "get",
      });
      this.data = data.bookrecord.filter((n) => n._v === "0");
    },
    pageChange(page, pageSize) {
      this.ipagination.current = page.current;
      this.ipagination.pageSize = page.pageSize;
    },
    agree(text,record){
      request({
        url: "/bookrecord/updateRecord/"+text._id,
        method: "patch",
        data:{
          _v:"1"
        }
      })
        .then((res) => {
          console.log("同意成功")
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dismiss(text,record){
      request({
        url: "/bookrecord/updateRecord/"+text._id,
        method: "patch",
        data:{
          _v:"2"
        }
      })
        .then((res) => {
          console.log("驳回成功")
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>

<style scoped>
/*
  .book_search {
    display: flex;
    justify-content: center;
  }-->
  */
.search_text {
  margin: 0px 43% 20px;
}
/* .record_table {
    margin-right: 8%;
    margin-left: 8%;
  } */
</style>

