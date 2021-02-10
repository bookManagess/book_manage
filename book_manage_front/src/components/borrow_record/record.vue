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
        rowKey="_id"
        :pagination="ipagination"
        @change="pageChange"
        bordered
        :scroll="{ y: 240 }"
      >
        <span slot="action">
          <a-button type="primary"> 同意 </a-button>
          <a-divider type="vertical" />
          <a-button type="danger"> 驳回 </a-button>
        </span>
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
    // emmm留，以后这种形式写，降低耦合，提高内聚，谁也不知道，你下次又要在哪调这个函数
    // 当然，这个写在action里才是最好的，那样全局都可以用。但那样要改很多，我懒emmm
    this.getRecord();
  },
  watch: {
    statechange(val) {
      request({
        url: "/bookrecord/getbookrecord",
        method: "get",
      })
        .then((res) => {
          console.log(val);
          this.data = res.data.bookrecord.filter((n) => n.__v === val);
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
  },
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

